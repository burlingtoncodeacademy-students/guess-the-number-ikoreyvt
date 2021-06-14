const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//initialize my variables
let rangeMax = 100;
let rangeMin = 1;
let randomNumber = Math.floor(
  Math.random() * (rangeMax - rangeMin + 1) + rangeMin
);

async function start() {
  //prompt user for their first guess
  userGuess = await ask(
    `Please attempt a guess at my number between ${rangeMin} and ${rangeMax}: `
  );
  //pass the user input through parseInt for either turning their number to an int or converting to NaN if it's not a number
  userGuess = parseInt(userGuess);
  //while loop that continuously runs while the user hasn't properly guessed the number
  while (userGuess !== randomNumber) {
    //checking to make sure the user is entering a number and not a string and that it is within the range
    while (isNaN(userGuess) || userGuess > rangeMax || userGuess < rangeMin) {
      if (isNaN(userGuess)) {
        userGuess = await ask("Do you know what a NUMBER is?  ");
        userGuess = parseInt(userGuess);
      } else if (userGuess > rangeMax || userGuess < rangeMin) {
        userGuess = await ask(
          `Please choose a number between ${rangeMin} and ${rangeMax}: `
        );
        userGuess = parseInt(userGuess);
      }
    }
    //after receiving valid input from user, check against computer's number and tell user whether they were too high or too low
    if (userGuess > randomNumber) {
      console.log("Your guess was too high.");
    } else if (userGuess < randomNumber) {
      console.log("Too low my dude.");
    }
    //if user didn't guess properly ask for another number
    userGuess = await ask("Please try again! ");
    userGuess = parseInt(userGuess);
  }
  //nice
  if (randomNumber === 69) {
    console.log(`You got it, my number was ${randomNumber}. Nice!`);
    process.exit();
  } else {
    console.log(`You got it, my number was ${randomNumber}!`);
    process.exit();
  }
}

start();
