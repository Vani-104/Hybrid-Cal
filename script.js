// Mode Switching
const voiceBtn = document.getElementById('voiceMode');
const manualBtn = document.getElementById('manualMode');
const voiceCalc = document.getElementById('voiceCalculator');
const manualCalc = document.getElementById('manualCalculator');

voiceBtn.addEventListener('click', () => {
  voiceCalc.classList.remove('d-none');
  manualCalc.classList.add('d-none');
});

manualBtn.addEventListener('click', () => {
  manualCalc.classList.remove('d-none');
  voiceCalc.classList.add('d-none');
});

// Manual Calculator
let manualInput = document.getElementById('manualInput');

function press(val) {
  if (val === '=') {
    try {
      manualInput.value = eval(manualInput.value);
    } catch {
      manualInput.value = "Error";
    }
  } else {
    manualInput.value += val;
  }
}

function clearInput() {
  manualInput.value = '';
}

// Voice Calculator
const startBtn = document.getElementById("start-btn");
const voiceInput = document.getElementById("voice-input");
const result = document.getElementById("result");

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";

startBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  voiceInput.textContent = spokenText;
  calculate(spokenText);
};

function calculate(expression) {
  try {
    const mathExp = convertToMath(expression);
    const evalResult = eval(mathExp);
    result.textContent = evalResult;
    const speech = new SpeechSynthesisUtterance("The answer is " + evalResult);
    window.speechSynthesis.speak(speech);
  } catch (error) {
    result.textContent = "Invalid input";
  }
}

function convertToMath(text) {
  return text
    .toLowerCase()
    .replace(/plus/g, '+')
    .replace(/minus/g, '-')
    .replace(/times|multiply|multiplied by/g, '*')
    .replace(/divide|divided by/g, '/')
    .replace(/into/g, '*')
    .replace(/by/g, '/')
    .replace(/equals/g, '')
    .replace(/[^0-9+\-*/.]/g, '');
}