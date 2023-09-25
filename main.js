const input = require("sync-input");

const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];
String.prototype.format = function(...params) { 
  return this.replace(/{(\d+)}/g, (match, i) => !params[i] ? match : params[i]);
}

const languages = new Array("python", "java", "javascript", "swift");
const res = new Array("You lost!", "You guessed the word {0}! You survived!"), mask = "-";
const wrongMsg = 'That letter doesn\'t appear in the word.';

let run = true, wins = 0, fails = 0; 
let msg;

while (run) {
  console.log([..."hangman".toUpperCase()].join(" "));
  console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit");  
  switch (input(">> ")) {
    case "play":
      const word = choice(languages), wordUniqueLetters = new Set(word);
      const wrongTry = (char) => { triedLetters += char; attempts--; }
      let guessedLetters = "", triedLetters = "", attempts = 8;
      
      while (!!attempts && wordUniqueLetters.size != guessedLetters.length) {
        console.log(`\n${word.replace(RegExp(`[^${guessedLetters}]`, "g"), mask)}`);
        
        const char = input("Input a letter >> ");
    
        msg = /^\w{2,}/.test(char) || !char.trim() ? "Please, input a single letter."  
          : "".concat(guessedLetters, triedLetters).includes(char) ? "You've already guessed this letter."
          : /[^a-z]/.test(char) ? "Please, enter a lowercase letter from the English alphabet"
          : !word.includes(char) ? wrongMsg : null
      
        msg ? console.log(msg) : guessedLetters += char; msg === wrongMsg && wrongTry(char);
      }

      attempts ? wins++ : fails++; msg = `\n${res[+!!attempts].format(word)}`; break;
      
    case "results":
      msg = `\nYou won: ${wins} times.\nYou lost: ${fails} times.\n`; break;
    case "exit":
      run = false; break;
    default:
      msg = "unknown command try again...\n";
  }
  console.log(msg);
}
