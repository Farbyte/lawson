from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv
import os
from concurrent.futures import ThreadPoolExecutor
import math
from concurrent.futures import as_completed
from time import time
from vectore_store import addVector
from langchain_together.embeddings import TogetherEmbeddings
load_dotenv()

def createEmbeddigs(model : any, docs : list[any],batch : int):
    vectors = model.embed_documents([doc.page_content for doc in docs])
    vectors_map = []
    for i,vec in enumerate(vectors):
        vectors_map.append({"values" : vec,
                            "id" : f'batch{batch}vector{i+1}',
                            "metadata" : {
                                "text" : docs[i].page_content
                            }
                        })
        
    return vectors_map


async def getDoc(URL : str) -> str:
    loader = PyMuPDFLoader(URL)
    data = loader.load()
    doc = ''
    for datum in data:
        doc += datum.page_content
    return doc

def getModels() -> list[any]:
    modelCount = int(os.getenv('TOGETHER_KEY_COUNT'))
    keys = []
    print(f'key count : {modelCount}')
    for i in range(1,modelCount+1):
        keys.append(os.getenv(f'TOGETHER_KEY_{i}'))
        
    models = [TogetherEmbeddings(model="togethercomputer/m2-bert-80M-8k-retrieval",api_key=key) for key in keys]
    return models

def slice_list(input_list, n):
    length = len(input_list)
    part_size = math.ceil(length / n)
    return [input_list[i * part_size: (i + 1) * part_size] for i in range(n)]
    
async def Embedder(URL : str, chunkSize : int, overlap : int, namespace : str):
    start = time()
    try:
        print('embedder called')
        doc = await getDoc(URL=URL)
        if not doc:
            print("Document is empty")
            return 0
        
        spliiter = RecursiveCharacterTextSplitter(
            chunk_size = chunkSize,
            chunk_overlap = overlap
        )
    
        docs = spliiter.create_documents([doc])
        print(f'length docs: {len(docs)}, docs sample: {docs[0].page_content[:100]}')
        models = getModels()
        vector_pool = []
        modelCount = int(os.getenv('TOGETHER_KEY_COUNT'))
        with ThreadPoolExecutor(max_workers=modelCount) as executor:
            doc_distributions = slice_list(docs,modelCount)
            future_map = {executor.submit(createEmbeddigs,models[i-1],doc_distributions[i-1],i+1) : i for i in range(1,modelCount+1)}
            for future in as_completed(future_map):
                result = future.result()
                if result:
                    vector_pool.append(result)  
                else:
                     print(f"Future {future_map[future]} resulted in None")
        
#        to_key = os.getenv('TOGETHER_KEY_1')
#        await addVectors(namespace="example-namespace",
#                         vectors=docs,
#                         embeddings=TogetherEmbeddings(model="togethercomputer/m2-bert-80M-8k-retrieval",api_key=to_key))
        pineconeRes = await addVector(vector=vector_pool,namespace=namespace)
        end = time()
        # print(f'vectors : {len(vector_pool)} \n shape : {(len(vector_pool),len(vector_pool[0]))} \n sample : {vector_pool[0][0]}\ntotal time taken : {end - start}')

        return {
            "vector_count" : pineconeRes['upserted_count'],
            "time" : end - start,
            "namespace" : namespace
        }
    
    except Exception as e:
        print(f"Error in Embedder: {e}")
        return 0

