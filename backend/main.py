from fastapi import FastAPI,HTTPException
import json
import numpy as np
import requests
from langchain.schema import Document
from vectore_store import get_Vectors
from embedder import Embedder
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from summarizer import determine_optimal_clusters, cluster_documents, summarize_documents, combine_summaries, formatted_summary

load_dotenv()
process_key = os.getenv('API_KEY')
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

def auth(api_key: str) -> bool:
    try:
        pk = str(os.getenv('PRIVATE_KEY'))
        if pk is None:
            raise ValueError("Private key not found in environment variables")
        env_key = pk.replace('\n'," ")
        private_key = RSA.import_key(env_key)
        bytes_key = bytes.fromhex(api_key)
        cipher_rsa_d = PKCS1_OAEP.new(private_key)
        d_data = cipher_rsa_d.decrypt(bytes_key)
        input_key = d_data.decode('utf-8')
        return process_key == input_key
    except ValueError as ve:
        print("Value error occurred:", ve)
    except Exception as e:
        print("An error occurred during decryption:", e)
    return False

@app.get("/")
async def ping():
    return{
        "message" : "server active"
    }
    
@app.get("/vectors/{docId}")
async def root(docId : str,api_key : str):
    if process_key == api_key:
        vectors = await get_Vectors(namespace=docId)
        print(vectors)
        return {"message": vectors}
    else:
        raise HTTPException(status_code=401,detail="Unortharized access - invalid api key")


@app.post("/emmbed")
async def embedd(url : str,docId : str,api_key : str):
    print('ROUTE CALLED')
    if process_key == api_key:
        res = await Embedder(URL=url,
                             chunkSize=10000,
                             overlap=500,
                             namespace=docId)
        if res:
            return {
                "vector_count" : res['vector_count'],
                "time" : res['time'],
                "namespace" : res['namespace']
             }
        
        raise HTTPException(status_code=500,detail="OOPS : SOMETHING WENT WRONG")
        
    else :
        raise HTTPException(status_code=401,detail="Unortharized access - invalid api key")
        
@app.get("/summarize/{namespaces}")
async def get_vectors_route(namespaces: str, api_key: str):
    if process_key == api_key:
        res = await get_Vectors(namespaces) 
        vectors=res['vectors']
        if vectors:
            try:
                # Convert vectors to numpy array
                vectors_array = np.array([vec['vector'] for vec in vectors])
                optimal_clusters_silhouette, _ = determine_optimal_clusters(vectors_array)
                num_clusters = optimal_clusters_silhouette
                sorted_indices = cluster_documents(vectors_array, num_clusters)

                # Extracting document contents from JSON structure
                docs = [Document(page_content=vec['text']) for vec in vectors]

                summaries = summarize_documents(docs, sorted_indices)
                combined_summary = combine_summaries(summaries)
                final_summary = formatted_summary(combined_summary)
                return {"message": final_summary}
            except Exception as e:
                print(f"Error during summarization: {e}")
                raise HTTPException(status_code=500, detail="Failed to summarize documents")
        else:
            raise HTTPException(status_code=400, detail="Vectors list is empty")
    else:
        raise HTTPException(status_code=401, detail="Unauthorized access - invalid API key")