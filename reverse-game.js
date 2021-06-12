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
    `Please attempt a guess at my number between ${rangeMin} and ${rangeMax}: `
  );
  userGuess = parseInt(userGuess);

  while (userGuess !== randomNumber) {
    if (isNaN(userGuess)) {
      while (isNaN(userGuess)) {
        userGuess = await ask("Do you know what a NUMBER is?  ");
        userGuess = parseInt(userGuess);
      }
    } else if ((userGuess > rangeMax) || (userGuess < rangeMin)) {
      while ((userGuess > rangeMax) || (userGuess < rangeMin)) {
        userGuess = await ask(
          `Please choose a number between ${rangeMin} and ${rangeMax} `
        );
        userGuess = parseInt(userGuess);
      }
    }

    if (userGuess > randomNumber) {
      console.log("Your guess was too high.");
    } else if (userGuess < randomNumber){
      console.log("Too low my dude.");
    }
    userGuess = await ask("Please try again! ");
    userGuess = parseInt(userGuess);
  }

  if (randomNumber === 69) {
    console.log(`You got it, my number was ${randomNumber}. Nice!`);
    process.exit();
  } else {
    console.log(`You got it, my number was ${randomNumber}!`);
    process.exit();
  }
}

start();
