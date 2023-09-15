const input = require('sync-input');

const options = ['python', 'java', 'swift', 'javascript'];
const word = options[Math.floor(Math.random() * options.length)];

let attempts = 8, guessed = '', char = '', reg = '', masked = '', msg = '';
const mask = '-', unique = new Set(word);

console.log('hangman'.toUpperCase().split('').join(' '));

while (attempts > 0 & unique.size != guessed.length) {
  regex = RegExp(['[^', guessed, ']'].join(''), 'g');
  masked = word.replace(regex, mask);
  char = input(`\n${masked}\nInput a letter: `);
  msg = guessed.includes(char) ? 'No improvements.' : 
    word.includes(char) ? '' : 'That letter doesn\'t appear in the word.';
  if (msg) { console.log(msg); }
  msg ? attempts-- : guessed += char;
}

console.log(attempts ? `${word}\nYou guessed the word!\nYou survived!` : 'You lost!')
