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

//initiate a couple variables that dictate the range of the game
let rangeMax;
let rangeMin = 1;
//generate a random number within the range
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
  if (userNumber >= rangeMax) {
    console.log("We don't play with cheaters. Try again! >_>");
    process.exit();
  } else if (userNumber <= rangeMin) {
    console.log("We don't play with cheaters. Try again! <_<");
    process.exit();
  }
  return randomNumber;
}

async function start() {
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
  while (yesNo !== "y") {
    //changing the actual random number to be equal to the new, smarter number
    randomNumber = await rangeChange(number);
    //have user answer yes or no to the guessed number
    yesNo = await ask(`Did you choose ${randomNumber}? [y]es or [n]o: `);
  }
  //nice
  if (number === 69) {
    console.log(`Your number was ${number}. Nice! xD`);
  } else {
    console.log(`Your number was ${number}`);
  }
  process.exit();
}

start();
