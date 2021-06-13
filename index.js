const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

/*after getting the input, provide a random number between the range to check against the player's guess

if the number is correct, end the game and tell the player they got got

if number is incorrect, ask whether or not to guess higher or lower than the previous guess

if guess is lower, set max range to be lower than and NOT equal to the previous guess

if guess is higher set the lowest possible range to be higher than and NOT equal to the previous guess */

//function that asks the user which game they want to play
async function whichGame() {
  let thisGame = await ask(
    "Type '1' if you want me to guess your number or type '2' if you want to guess my number. You can also enter anything else to exit the program. "
  );

  if (thisGame === "1") {
    gameOne();
  } else if (thisGame === "2") {
    gameTwo();
  } else {
    console.log("Goodbye!");
    process.exit();
  }
}

//function that asks user if they want to play the game again
async function playAgain() {
  let answer = await ask(
    "Do you want to play again? Anything besides 'no' will restart the program: "
  );
  answer = answer.toLowerCase();
  if (answer === "no") {
    console.log("Goodbye!");
    process.exit();
  } else {
    //reset rangeMin to 1 and start the game again upon user saying anything but no
    rangeMin = 1;
    whichGame();
  }
}

//initiate a couple variables that dictate the range of the game globally so they can be used in every function required

let rangeMax;
let rangeMin = 1;
let randomNumber;

//create a function that will adjust the range and choose "random" number based on the range
async function rangeChange(userNumber) {
  //asking the user if the number guessed is higher or lower than their number
  let highLow = await ask("Was your number [h]igher or [l]ower than mine? ");
  //if the user number is higher than guess, change the range minimum to be 1 higher than the guess so it doesn't include the guess

  if (highLow.toLowerCase() === "h") {
    rangeMin = randomNumber + 1;
    //instead of getting a truly random number this time, we want to guess the half way point to eliminate as much data as possible in one fell swoop
    randomNumber = Math.round((rangeMax + rangeMin) / 2);
    //get that new "random" guess out of the  function and pass back out

    //if the user number is lower than guess, change range maximum to be 1 lower than guess so it doesn't include the guess again
  } else if (highLow.toLowerCase() === "l") {
    rangeMax = randomNumber - 1;
    //same as above, we want the mid point to erase as much data as possible
    randomNumber = Math.round((rangeMax + rangeMin) / 2);
  }
  //if statement making sure the user isn't trying to cheat the system
  if (userNumber > rangeMax) {
    console.log("We don't play with cheaters. Try again! >_>");
    process.exit();
  } else if (userNumber < rangeMin) {
    console.log("We don't play with cheaters. Try again! <_<");
    process.exit();
  }
  return randomNumber;
}

async function gameOne() {
  //asking the user for a range max greater than 1
  rangeMax = await ask(
    "I'm going to attempt to guess a number between 1 and your requested max range. What would you like your max range to be? Any number greater than 1 please. :) "
  );
  rangeMax = parseInt(rangeMax);
  //if user tries to be cheeky and make the max 1 it runs a loop until not 1
  while (isNaN(rangeMax) || rangeMax <= 1) {
    rangeMax = await ask("I said any NUMBER greater than 1 >:| ");
    rangeMax = parseInt(rangeMax);
  }
  //generate random number within the range for first guess
  randomNumber = Math.floor(
    Math.random() * (rangeMax - rangeMin + 1) + rangeMin
  );

  //store users number input
  let number = await ask(
    `Choose a number between ${rangeMin} and ${rangeMax} (inclusive): `
  );
  number = parseInt(number);
  //grab a random number and ask the user if guessed correctly
  let yesNo = await ask(`Did you choose ${randomNumber}? [y]es or [n]o: `);
  //write a loop that utilizes range function to continue running until the number has been guessed
  //add a counter to the game to see how many guesses it took the computer
  let guessCounter = 0;
  while (yesNo !== "y") {
    guessCounter += 1;
    //changing the actual random number to be equal to the new, smarter number
    randomNumber = await rangeChange(number);
    //have user answer yes or no to the guessed number
    yesNo = await ask(`Did you choose ${randomNumber}? [y]es or [n]o: `);
  }
  //nice
  if (number === 69) {
    console.log(`Your number was ${number}. Nice! xD`);
    console.log(`It took me ${guessCounter} tries to guess your number.`);
  } else {
    console.log(`Your number was ${number}`);
    console.log(`It took me ${guessCounter} tries to guess your number.`);
  }

  return playAgain();
}
//another function 'gameTwo' where the user tries to guess the computer's randomly generated number
async function gameTwo() {
  //due to this game not extending the range beyond 100 range needs to be set to 100
  rangeMax = 100;
  //generate the computer's random number between 1 and 100
  randomNumber = Math.floor(
    Math.random() * (rangeMax - rangeMin + 1) + rangeMin
  );
  //ask the user for their first guess
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
  } else {
    console.log(`You got it, my number was ${randomNumber}!`);
  }
  return playAgain();
}

whichGame();
