let sendButton = document.getElementById('send-button');
let chatWindow = document.getElementById('chat-window');
let userInput = document.getElementById('user-input');
let chatContainer = document.getElementsByClassName('chat-container');
let loader = document.querySelector('#loader');

sendButton.addEventListener('click', function() {
    let message = userInput.value.trim();
    if (message !== '') {
        appendMessage('You', message);
        sendMessage(message);
        userInput.value = '';
    }
});

userInput.onkeydown = function(event) {
    if (event.keyCode == 13){
        let message = userInput.value.trim();
        if (message !== '') {
            appendMessage('You', message);
            sendMessage(message);
            userInput.value = '';
        }
    }
}

function appendMessage(sender, text) {
    if(sender === 'You') {
        let messageElement = document.createElement('div');
        messageElement.classList.add('user-message');
        messageElement.innerHTML = 
                                    `
                                        <svg width="25px" height="25px" viewBox="0 0 123.00 123.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="7.38"></g><g id="SVGRepo_iconCarrier"> <title></title> <desc></desc> <defs></defs> <g fill="none" fill-rule="evenodd" id="Page-1" stroke-width="2.952"> <g fill-rule="nonzero" id="user"> <path d="M61.3,65.6 C79.3,65.6 93.9,51 93.9,33 C93.9,15 79.3,0.5 61.3,0.5 C43.3,0.5 28.7,15.1 28.7,33 C28.7,50.9 43.3,65.6 61.3,65.6 Z M61.3,9 C74.5,9 85.3,19.8 85.3,33 C85.3,46.2 74.5,57 61.3,57 C48.1,57 37.3,46.2 37.3,33 C37.3,19.8 48.1,9 61.3,9 Z" fill="#5f2525d5d5d5" id="Shape"></path> <path d="M4.9,116.5 L118.1,116.5 C120.5,116.5 122.4,114.6 122.4,112.2 C122.4,89.7 104.1,71.3 81.5,71.3 L41.5,71.3 C19,71.3 0.6,89.6 0.6,112.2 C0.6,114.6 2.5,116.5 4.9,116.5 Z M41.5,79.9 L81.5,79.9 C97.9,79.9 111.4,92.1 113.5,107.9 L9.5,107.9 C11.6,92.2 25.1,79.9 41.5,79.9 Z" fill="#5f2525d5d5d54A4A4A" id="Shape"></path> </g> </g> </g></svg>
                                        <strong></strong> ${text}
                                    `;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
    else if(sender === 'Referee Bot') {

        if (text == 'loading') {
            let loaderElement = document.createElement('div');
            loaderElement.classList.add('bot-message');
            loaderElement.innerHTML = 
                                    `
                                        <svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-46.3 -46.3 555.60 555.60" xml:space="preserve" stroke="#ffffff" stroke-width="4.630000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M183.5,136c-52.659,0-95.5,42.841-95.5,95.5s42.841,95.5,95.5,95.5s95.5-42.841,95.5-95.5S236.159,136,183.5,136z M183.5,312c-44.388,0-80.5-36.112-80.5-80.5s36.112-80.5,80.5-80.5s80.5,36.112,80.5,80.5S227.888,312,183.5,312z"></path> <path d="M183.5,168c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5c26.743,0,48.5,21.757,48.5,48.5c0,4.142,3.358,7.5,7.5,7.5 s7.5-3.358,7.5-7.5C247,196.486,218.514,168,183.5,168z"></path> <path d="M455.5,96h-168c-4.142,0-7.5,3.358-7.5,7.5v8c0,4.687-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5v-8c0-4.142-3.358-7.5-7.5-7.5 h-68.708c-67.508,0-124.22,47.67-136.379,110.327C45.142,202.357,38.591,200,31.5,200C14.131,200,0,214.131,0,231.5 S14.131,263,31.5,263c7.055,0,13.576-2.331,18.832-6.264c4.972,26.576,17.792,51.015,37.355,70.577 c25.622,25.622,59.599,39.689,95.801,39.687c0.391,0,0.788-0.002,1.18-0.005C258.739,366.37,319,304.111,319,228.209v-18.825 c0-15.953,11.421-29.435,27.157-32.058l90.521-15.087C451.93,159.698,463,146.631,463,131.169V103.5 C463,99.358,459.642,96,455.5,96z M31.5,248c-9.098,0-16.5-7.402-16.5-16.5S22.402,215,31.5,215S48,222.402,48,231.5 S40.598,248,31.5,248z M448,131.169c0,8.099-5.798,14.944-13.788,16.275l-90.521,15.087C320.692,166.364,304,186.069,304,209.385 v18.825c0,67.7-53.589,123.23-119.459,123.786c-0.35,0.003-0.699,0.004-1.049,0.004c-32.194,0-62.415-12.51-85.198-35.294 c-23.032-23.031-35.564-53.661-35.29-86.247C63.56,164.589,119.091,111,186.792,111H248v0.5c0,12.958,10.542,23.5,23.5,23.5 s23.5-10.542,23.5-23.5V111h153V131.169z"></path> </g> </g></svg>
                                        <strong></strong> <div class="loader"></div>
                                    `;
            chatWindow.appendChild(loaderElement);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
        else{
            let messageElement = document.createElement('div');
            messageElement.classList.add('bot-message');
            messageElement.innerHTML = 
                                    `
                                        <svg fill="#ffffff" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-46.3 -46.3 555.60 555.60" xml:space="preserve" stroke="#ffffff" stroke-width="4.630000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M183.5,136c-52.659,0-95.5,42.841-95.5,95.5s42.841,95.5,95.5,95.5s95.5-42.841,95.5-95.5S236.159,136,183.5,136z M183.5,312c-44.388,0-80.5-36.112-80.5-80.5s36.112-80.5,80.5-80.5s80.5,36.112,80.5,80.5S227.888,312,183.5,312z"></path> <path d="M183.5,168c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5c26.743,0,48.5,21.757,48.5,48.5c0,4.142,3.358,7.5,7.5,7.5 s7.5-3.358,7.5-7.5C247,196.486,218.514,168,183.5,168z"></path> <path d="M455.5,96h-168c-4.142,0-7.5,3.358-7.5,7.5v8c0,4.687-3.813,8.5-8.5,8.5s-8.5-3.813-8.5-8.5v-8c0-4.142-3.358-7.5-7.5-7.5 h-68.708c-67.508,0-124.22,47.67-136.379,110.327C45.142,202.357,38.591,200,31.5,200C14.131,200,0,214.131,0,231.5 S14.131,263,31.5,263c7.055,0,13.576-2.331,18.832-6.264c4.972,26.576,17.792,51.015,37.355,70.577 c25.622,25.622,59.599,39.689,95.801,39.687c0.391,0,0.788-0.002,1.18-0.005C258.739,366.37,319,304.111,319,228.209v-18.825 c0-15.953,11.421-29.435,27.157-32.058l90.521-15.087C451.93,159.698,463,146.631,463,131.169V103.5 C463,99.358,459.642,96,455.5,96z M31.5,248c-9.098,0-16.5-7.402-16.5-16.5S22.402,215,31.5,215S48,222.402,48,231.5 S40.598,248,31.5,248z M448,131.169c0,8.099-5.798,14.944-13.788,16.275l-90.521,15.087C320.692,166.364,304,186.069,304,209.385 v18.825c0,67.7-53.589,123.23-119.459,123.786c-0.35,0.003-0.699,0.004-1.049,0.004c-32.194,0-62.415-12.51-85.198-35.294 c-23.032-23.031-35.564-53.661-35.29-86.247C63.56,164.589,119.091,111,186.792,111H248v0.5c0,12.958,10.542,23.5,23.5,23.5 s23.5-10.542,23.5-23.5V111h153V131.169z"></path> </g> </g></svg>
                                        <strong></strong> ${text}
                                    `;
            chatWindow.replaceChild(messageElement, chatWindow.lastChild);
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
        
    }
}

function sendMessage(message) {
    appendMessage('Referee Bot', 'loading');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/question', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            appendMessage('Referee Bot', response['answer']);
           }
        };
    xhr.send('message=' + encodeURIComponent(message));
}

let openSettingsButton = document.getElementById('settings-button');
let submitButton = document.getElementById('submit-key');
let keyInput = document.getElementById('key-input');
let settings = document.getElementById('settings');

let submitter = document.createElement('div');

openSettingsButton.addEventListener('click', function() {
    if (settings.classList.contains('display')){
        settings.classList.remove('display');
    } else {
        settings.classList.add('display');
    }
});

document.addEventListener('click', function(event) {
    if (event.target.parentElement !== openSettingsButton && event.target !== openSettingsButton && event.target !== settings && event.target !== keyInput && event.target !== submitButton) {
        settings.classList.remove('display');
    }
});

submitButton.addEventListener('click', function() {
    submitting('submitting')

    key = keyInput.value.trim();
    setApiKey(key);
});

function setApiKey(key){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/settings', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            //let response = JSON.parse(xhr.responseText);
            console.log(xhr.responseText)
            submitting('success')
           }
        else if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 403){
            console.log(xhr.responseText);
            submitting('fail');
        }
        };
    xhr.send('key=' + encodeURIComponent(key));
}

function submitting(status){
    if (status === 'submitting'){
        submitter.classList.add('submitter');
        settings.replaceChild(submitter, submitButton);
    }

    if (status === 'success'){
        submitter.classList.add('success');
        setTimeout(() => {
            settings.replaceChild(submitButton, submitter);
            submitter.classList.remove('success');
        }, 2000);
    }

    if (status === 'fail'){
        submitter.classList.add('fail');
        console.log("fail");
        setTimeout(() => {
            settings.replaceChild(submitButton, submitter);
            submitter.classList.remove('fail');
        }, 2000);
    }
}