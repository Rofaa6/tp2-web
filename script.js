

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  return symbols[Math.floor(Math.random() * symbols.length)];
}


const resultEl       = document.getElementById('result');
const generateBtn    = document.getElementById('generate-btn');
const copyBtn        = document.getElementById('copy-btn');
const lengthSlider   = document.getElementById('length');
const lengthDisplay  = document.getElementById('length-display');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck   = document.getElementById('numbers');
const symbolsCheck   = document.getElementById('symbols');
const strengthBar    = document.getElementById('strength-bar');
const strengthLabel  = document.getElementById('strength-label');

lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});

function generatePassword() {
  const length = parseInt(lengthSlider.value);

  const hasUpper   = uppercaseCheck.checked;
  const hasLower   = lowercaseCheck.checked;
  const hasNumbers = numbersCheck.checked;
  const hasSymbols = symbolsCheck.checked;

  if (!hasUpper && !hasLower && !hasNumbers && !hasSymbols) {
    alert('Veuillez sélectionner au moins un critère.');
    return;
  }
  const generators = [];
  if (hasUpper)   generators.push(getRandomUpper);
  if (hasLower)   generators.push(getRandomLower);
  if (hasNumbers) generators.push(getRandomNumber);
  if (hasSymbols) generators.push(getRandomSymbol);

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomGen = generators[Math.floor(Math.random() * generators.length)];
    password += randomGen();
  }

  resultEl.textContent = password;

  updateStrength(length);
}

function updateStrength(length) {
  if (length < 8) {
    strengthBar.style.width      = '33%';
    strengthBar.style.background = '#f44336'; 
    strengthLabel.textContent    = 'Faible';
    strengthLabel.style.color    = '#f44336';
  } else if (length < 12) {
    strengthBar.style.width      = '66%';
    strengthBar.style.background = '#ff9800'; 
    strengthLabel.textContent    = 'Moyen';
    strengthLabel.style.color    = '#ff9800';
  } else {
    strengthBar.style.width      = '100%';
    strengthBar.style.background = '#4caf50'; 
    strengthLabel.textContent    = 'Fort';
    strengthLabel.style.color    = '#4caf50';
  }
}

copyBtn.addEventListener('click', () => {
  const password = resultEl.textContent;

  if (password === 'Cliquez sur Générer') return;

  navigator.clipboard.writeText(password).then(() => {
    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copié !';
    copyBtn.style.background    = '#4caf50';
    copyBtn.style.color         = 'white';
    copyBtn.style.borderColor   = '#4caf50';

    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copier';
      copyBtn.style.background  = '';
      copyBtn.style.color       = '';
      copyBtn.style.borderColor = '';
    }, 2000);
  });
});

generateBtn.addEventListener('click', generatePassword);
