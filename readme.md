# Basketball Referee Chatbot

This chatbot is generating the answer to your questions about basketball rules based on the official FIBA Rulebook using RAG technology.

# Screenshots

![Home Page](screenshots/main_page.png?raw=true)
![Conversation](screenshots/conversation.png?raw=true)
![Setting the API Key](screenshots/set_api_key.png?raw=true)

# How does it work?

```mermaid
graph LR
PDF[Fiba Rulebook.pdf] --> Chunk1(Chunk of text)
PDF[Fiba Rulebook.pdf] --> Chunk2(Chunk of text)
PDF[Fiba Rulebook.pdf] --> Chunk3(Chunk of text)
PDF[Fiba Rulebook.pdf] --> Chunk4(Chunk of text)
Chunk1 --> embedding1(embeddings)
Chunk2 --> embedding2(embeddings)
Chunk3 --> embedding3(embeddings)
Chunk4 --> embedding4(embeddings)
embedding1 --> vstore[Vectorstore]
embedding2 --> vstore[Vectorstore]
embedding3 --> vstore[Vectorstore]
embedding4 --> vstore[Vectorstore]
user[User] --> question(question embedding)
question --> semantic(semantic search)
semantic --> vstore
vstore --> results(Ranked Results)
results --> llm[ChatOpenAI LLM]
llm --> answer[Answer]
answer --> user
```

# How to use?

In order to use this program, you need to run it on your local computer. For this you'll need Python (3.X) on your computer.

- Download or Clone this repository on your computer
- Install the models in the requirements.txt using PIP
`pip install requirements.txt`
- Run the app.py file
- Visit localhost:5000 to access the web GUI





