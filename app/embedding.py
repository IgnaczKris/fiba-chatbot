from PyPDF2 import PdfReader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

def load_pdf(pdf_doc):
    loader = PyPDFLoader(pdf_doc)
    pages = loader.load()

    return pages

def create_documents(pages):
    splitter = CharacterTextSplitter(
        chunk_size=750,
        chunk_overlap=150,
        length_function=len,
        separator = '\n',
    )

    documents = splitter.split_documents(pages)
    return documents

def get_vectorstore(documents):
    embeddings_model = HuggingFaceEmbeddings()
    vectorstore = FAISS.from_documents(documents, embeddings_model)
    return vectorstore

def answer_question(question, qa_chain):
    answer = qa_chain.run({'question': question})

    return answer