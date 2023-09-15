const input = require('sync-input');

const options = ['python', 'java', 'swift', 'javascript'];
const word = options[Math.floor(Math.random() * options.length)];

let guessed = '', char = '', reg = '', masked = '', msg = '', attempts = 8, mask = '-';

console.log('hangman'.toUpperCase().split('').join(' '));

while (attempts > 0 & new Set(word).size != guessed.length) {
  regex = RegExp(['[^', guessed, ']'].join(''), 'g');
  masked = word.replace(regex, mask);

  char = input(`\n${masked}\nInput a letter: `);
  
  msg = char.length != 1 ? 'Please, input a single letter.' : 
    guessed.includes(char) ? 'You\'ve already guessed this letter.' :
    (/[^a-z]/).test(char) ? 'Please, enter a lowercase letter from the English alphabet.' :
    word.includes(char) ? '' : 'That letter doesn\'t appear in the word.';
  
  if (msg) {
    console.log(msg);
  }
  
  msg === 'That letter doesn\'t appear in the word.' ? attempts-- : 
    msg ? guessed += '' : guessed += char;
}

console.log(new Set(word).size == guessed.length ? 
            `\nYou guessed the word ${word}!\nYou survived!` : 'You lost!')
