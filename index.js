const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//initiate a couple variables that dictate the range of the game
let rangeMax = 100;
let rangeMin = 1;

//create a function that will choose random number based on the range

function randomNum(rangeMax) {
  
}


/*after getting the input, provide a random number between the range to check against the player's guess

if the number is correct, end the game and tell the player they got got
would be funny to have another check for number 69 and say "nice"

if number is incorrect, ask whether or not to guess higher or lower than the previous guess

if guess is lower, set max range to be lower than and NOT equal to the previous guess

if guess is higher set the lowest possible range to be higher than and NOT equal to the previous guess */

async function game() {
  let number = await ask('Choose a number between 1 and 100 (inclusive): ')

  console.log('Did you choose')
  let answer = await ask
}

//write a loop that utilizes this function to continue running until the user says that you guessed their number