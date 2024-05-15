from flask import Flask, request, render_template, jsonify
from embedding import load_pdf, create_documents, get_vectorstore, answer_question
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain_community.chat_models import ChatOpenAI

app = Flask(__name__)

def embedding():
    pages = load_pdf('FIBAOfficialBasketballRules2022_v1.2_.pdf')
    documents = create_documents(pages)
    vectorstore = get_vectorstore(documents)
    retriever = vectorstore.as_retriever()
    
    return retriever

#Before first request, create retriever
with app.app_context():
    retriever = embedding()

    llm = ChatOpenAI(api_key = 'sk-proj-fxGmzmOmareNXRvJiNA7T3BlbkFJq6gClEbPBksCeidl4F14')
    memory = ConversationBufferMemory(
            memory_key='chat_history',
            return_messages=True
        )

    qa_chain = ConversationalRetrievalChain.from_llm(llm, retriever=retriever, memory=memory, verbose=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/question', methods=['POST'])
def question():
    question = request.form['message']
    answer = answer_question(question, qa_chain)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run()