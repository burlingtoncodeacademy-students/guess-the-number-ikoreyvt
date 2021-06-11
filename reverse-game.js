const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let rangeMax = 100;
let rangeMin = 1;
let randomNumber = Math.floor(
  Math.random() * (rangeMax - rangeMin + 1) + rangeMin
);

async function start() {
  userGuess = await ask(
    `Please attempt a guess at my number between ${rangeMin} and ${rangeMax}`
  );
  userGuess = parseInt(userGuess);

  while (userGuess !== randomNumber) {
    if (isNaN(userGuess)) {
      while (isNaN(userGuess)) {
        userGuess = await ask("Do you know what a NUMBER is?  ");
        userGuess = parseInt(userGuess);
      }
    } else if (!(userGuess > rangeMax) || !(userGuess < rangeMin)) {
      while (!(userGuess > rangeMax) || !(userGuess < rangeMin)) {
        userGuess = await ask(
          `Please choose a number between ${rangeMin} and ${rangeMax} `
        );
        userGuess = parseInt(userGuess);
      }
    }

    if (userGuess > randomNumber) {
      console.log("Just like me, your guess was too high haha. Try again! ");
    } else {
      console.log("Too low my dude. Try again! ");
    }
    userGuess = await ask("Please try again! ");
    userGuess = parseInt(userGuess);
  }

  if (randomNumber === 69) {
    console.log(`You got it, my number was ${randomNumber}. Nice!`);
    process.exit();
  } else {
    console.log(`You got it, my number was ${randomNumber}!`);
  }
}

start();
