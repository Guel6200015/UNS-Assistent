const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const feedbackDiv = document.getElementById('feedback');
const outputDiv = document.getElementById('output');
let recognition;

try {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
} catch (e) {
    console.error('Seu navegador não suporta a UNS Assistent.');
}

if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        feedbackDiv.innerText = 'Ouvindo...';
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        feedbackDiv.innerText = 'Ouvindo...';
        outputDiv.innerText = finalTranscript;
    };

    recognition.onerror = (event) => {
        console.error('Erro de reconhecimento: ', event.error);
    };

    recognition.onend = () => {
        feedbackDiv.innerText = 'Clique em "Iniciar" para falar.';
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
        feedbackDiv.innerText = 'Ouvindo...';
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        feedbackDiv.innerText = 'Clique em "Iniciar" para falar.';
    });
}
