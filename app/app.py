from flask import Flask, request, render_template, jsonify
from embedding import load_pdf, create_documents, get_vectorstore, answer_question
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models import ChatOpenAI
import time

app = Flask(__name__)

global api_key

def embedding():
    pages = load_pdf('FIBARuleBook_short.pdf')
    documents = create_documents(pages)
    vectorstore = get_vectorstore(documents)
    retriever = vectorstore.as_retriever()
    
    return retriever

#Before first request, create retriever
with app.app_context():
    retriever = embedding()
    global api_key
    api_key = ''


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/settings' , methods=['POST'])
def settings():
    global api_key
    key = request.form['key']
    if (api_key == key):
        time.sleep(2)
        return "Error", 403

    api_key = key

    time.sleep(2)
    return "success", 200

@app.route('/question', methods=['POST'])
def question():
    question = request.form['message']
    #answer = answer_question(question, qa_chain)
    answer = "This is the answer to your question!"
    time.sleep(2)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run()