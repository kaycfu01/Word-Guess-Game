//VARIABLES
var words = ["pikachu", "meowth", "mewtwo", "charmander", "squirtle", "bulbasaur", "eevee"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;



// ALL FUNCTIONS
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var pikachu = document.getElementById("pikachu");
var r = document.getElementById("meowth");
var mewtwo = document.getElementById("mewtwo");
var charmander = document.getElementById("charmander");
var squirtle = document.getElementById("squirtle");
var b = document.getElementById("bulbasaur");
var eev = document.getElementById("eevee");


function aud() {
    //Pikachu Audio & Image
    //---------------------------
    if (randomWord === words[0]) {
        charmander.pause();
        squirtle.pause();
        b.pause();
        eev.pause();
        mewtwo.pause();
        r.pause();
        pikachu.play();
        document.getElementById("image").src = "./assets/images/pikachu.gif";
    }
    //Meowth Audio & Image
    //---------------------------
    else if (randomWord === words[1]) {
        charmader.pause();
        squirtle.pause();
        b.pause();
        eev.pause();
        mewtwo.pause();
        pikachu.pause();
        r.play();
        document.getElementById("image").src = "./assets/images/meowth.gif";
    }
    //Mewtwo Audio & Image
    //---------------------------
    else if (randomWord === words[2]) {
        charmander.pause();
        squirtle.pause();
        b.pause();
        eev.pause();
        r.pause();
        pikachu.pause();
        mewtwo.play();
        document.getElementById("image").src = "./assets/images/mewtwo.gif";
    }
    //Charmander Audio & Image
    //---------------------------
    else if (randomWord === words[3]) {
        squirtle.pause();
        b.pause();
        eev.pause();
        mewtwo.pause();
        r.pause();
        pikachu.pause();
        charmader.play();
        document.getElementById("image").src = "./assets/images/charmander.gif";
    }
    //Squirtle Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        b.pause();
        eev.pause();
        mewtwo.pause();
        r.pause();
        pikachu.pause();
        charmander.pause();
        squirtle.play();
        document.getElementById("image").src = "./assets/images/squirtle.gif";
    }
    //Bulbasaur Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        squirtle.pause();
        eev.pause();
        mewtwo.pause();
        r.pause();
        pikachu.pause();
        charmander.pause();
        b.play();
        document.getElementById("image").src = "./assets/images/bulb.gif";
    }
    //Eevee Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        squirtle.pause();
        b.pause();
        mewtwo.pause();
        r.pause();
        pikachu.pause();
        charmander.pause();
        eev.play();
        document.getElementById("image").src = "./assets/images/eevee.gif";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        aud()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/try-again.png"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}