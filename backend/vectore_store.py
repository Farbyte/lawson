from pinecone import Pinecone
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
import os
from time import time

load_dotenv()
pinecone_api_key = os.getenv('PINECONE_API_KEY')
pinecone_index = os.getenv('PINECONE_INDEX_NAME')
jina_key = os.getenv('JINA_KEY_5')



def printPineconeStats(namespace : str):
    pc = Pinecone(api_key=pinecone_api_key)
    index = pc.Index(pinecone_index)
    index_stats = index.describe_index_stats()
    namespace_stats = index_stats['namespaces'].get(namespace,-1)
    if namespace_stats != -1:
        print(namespace_stats)

async def get_Vectors(namespace : str) -> dict[list[list[int]], tuple]:
    pc = Pinecone(api_key=pinecone_api_key)
    index = pc.Index(pinecone_index)
    index_stats = index.describe_index_stats()
    namespace_stats = index_stats['namespaces'].get(namespace,-1)
    if namespace_stats == -1:
        return -1
    vector_count = namespace_stats.get('vector_count',0)
    dimension = index_stats.get('dimension',-1)
    print(f'dimension : {dimension} namespace : {namespace} vector_count : {vector_count}')
    query_res = index.query(
        top_k=vector_count,
        namespace=namespace,
        vector=[0 for _ in range(dimension)],
        include_values=True,
        include_metadata=True
    )

    vectors = [{"vector" : vec['values'], "text" : vec['metadata'].get('text'," ")}for vec in query_res['matches']]
    print(f'vector array length : {len(vectors)} shape = {len(vectors)}')
    shape = (len(vectors), len(vectors[0]))
    return {
        "vectors" : vectors,
        "shape" : shape
    }


## SLOW FUNCTION - ONLY TO BE USED WHEN addVector() breaks
async def addVectorsPinecone(namespace : str,vectors : list[any],embeddings):
    pc = Pinecone(api_key=pinecone_api_key)
    index = pc.Index(pinecone_index)
    index_stats = index.describe_index_stats()
    print(index_stats)
    namespace_stats = index_stats['namespaces'].get(namespace,-1)
    if namespace_stats == -1:
        vector_store = PineconeVectorStore.from_existing_index(
            index_name=pinecone_index,
            embedding=embeddings,
            namespace=namespace,
            text_key="text",
        )
        vector_store.add_documents(vectors)
        print('vectors added')
    else:
        print('namespace already exists')
        return -1
    return 1

async def addVector(namespace : str, vector):
    print(f'shape = {(len(vector),len(vector[0]))}')
    pc = Pinecone(api_key=pinecone_api_key)
    index = pc.Index(pinecone_index)
    index_stats = index.describe_index_stats()
    print(index_stats)
    namespace_stats = index_stats['namespaces'].get(namespace,-1)
    if namespace_stats == -1:
        start = time()
        flattened_vectors = sum(vector,[])
        print(f'flattened shape = {len(flattened_vectors)}')
        responses = []
        res = index.upsert(namespace=namespace,vectors=flattened_vectors)
        responses.append(res)
        end = time()
        print(f'time taken to add : {end - start}, added --- , response = {responses}') 
    else:
        print('namespace already exists')
        return -1
    return res
        
    