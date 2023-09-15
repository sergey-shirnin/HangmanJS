const input = require('sync-input');

const options = ['python', 'java', 'swift', 'javascript'];
const word = options[Math.floor(Math.random() * options.length)];

let guessed = '', char = '', reg = '', masked = '';
const attempts = 8, mask = '-';

console.log('hangman'.toUpperCase().split('').join(' '));

for (i = 0; i < attempts; i++) {
  reg = RegExp(['[^', guessed, ']'].join(''), 'g');
  masked = word.replace(reg, mask);
  char = input(`\n${masked}\nInput a letter: `)
  word.includes(char) ? guessed += char : console.log('That letter doesn\'t appear in the word.');

}
console.log('\nThanks for playing!');
