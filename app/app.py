from flask import Flask, request, render_template, jsonify, session, g
from PyPDF2 import PdfReader
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from openai import AuthenticationError


app = Flask(__name__)

### GLOBAL VARIABLES ###
global api_key
global retriever
global qa_chain
global pdf_doc
pdf_doc = 'static/FIBARuleBook_short.pdf'

### CONVERSATION CHAIN ###
def create_chain(api_key):
    global qa_chain

    try:
        llm = ChatOpenAI(api_key = api_key)
        memory = ConversationBufferMemory(
                memory_key='chat_history',
                return_messages=True
            )

        qa_chain = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory=memory, verbose=True)

        return True
    
    except Exception as e:
        print(e.message)
        return False

def answer_question(question, qa_chain):
    answer = qa_chain.run({'question': question})
    return answer

### EMBEDDING ###

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

def embedding():
    print("Loading PDF...")
    pages = load_pdf(pdf_doc)
    print("Splitting your PDF into documents...")
    documents = create_documents(pages)
    print("Storing your documents in a vectorstore...")
    print("This might take a while... Do not exit the program!")
    vectorstore = get_vectorstore(documents)
    retriever = vectorstore.as_retriever()
    
    return retriever

### CONTEXT PROCESSORS ###

with app.app_context():
    global api_key
    global retriever
    global qa_chain

    retriever = embedding()
    api_key = None
    qa_chain = None

### ROUTES ###

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/settings' , methods=['POST'])
def settings():
    key = request.form['key']
    api_key = key

    if(create_chain(api_key)):
        return "success", 200
    else:
        return "fail", 400
    

@app.route('/question', methods=['POST'])
def question():
    question = request.form['message']

    if (qa_chain is not None):
        try:
            answer = answer_question(question, qa_chain)
        except AuthenticationError as e:
            answer = e.message.split('-')[1].split(':')[2][2:]
            print(e.message)
        except Exception as e:
            answer = "An unknown error occurred. Please try again."
            answer = e

    else:
        answer = "OpenAI API key isn't set!"

    return jsonify({'answer': answer})



### RUNNING THE APP ###

if __name__ == '__main__':
    app.run()