
let sendButton = document.getElementById('send-button');
let chatWindow = document.getElementById('chat-window');
let userInput = document.getElementById('user-input');

sendButton.addEventListener('click', function() {
    let message = userInput.value.trim();
    if (message !== '') {
        appendMessage('You', message);
        sendMessage(message);
        userInput.value = '';
    }
});

function appendMessage(sender, text) {
    if(sender === 'You') {
        let messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    else if(sender === 'Referee Bot') {
        let messageElement = document.createElement('div');
        messageElement.classList.add('bot-message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
}

function sendMessage(message) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/question', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log(response);
            appendMessage('Referee Bot', response['answer']);
           }
        };
    xhr.send('message=' + encodeURIComponent(message));
}
