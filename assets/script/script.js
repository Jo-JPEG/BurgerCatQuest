document.addEventListener('DOMContentLoaded', function() {

    //Declared Variables
    const resetButton = document.getElementById('reset-button');
    let selectedLevel = 'easy'; // Default to 'easy'
    let wordList = {
        easy: ['cat', 'dog', 'bat', 'fish', 'ball'],
        intermediate: ['elephant', 'giraffe', 'mountain', 'computer', 'piano'],
        genius: ['quizzaciously', 'antidisestablishmentarianism', 'floccinaucinihilipilification', 'hippopotomonstrosesquipedaliophobia']
    };
    let attempts;
    let word;
    let guessedLetters = [];
    let wrongGuesses = [];
  


    //Event Listeners
    resetButton.addEventListener('click', startGame);

    /**
     * Selects the level
     */
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedLevel = button.dataset.level;
            setDifficulty(selectedLevel);
        });
    });

    /**
     * Begins the game
     */
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.addEventListener('click', startGame);
    });

    /**
     *  Sets the difficulty for each level changing the amount of lives
     * that the player starts with
     */
    function setDifficulty(level) {
        if (level === 'easy') {
            attempts = 10;
        } else if (level === 'intermediate') {
            attempts = 10;
        } else {
            attempts = 10;
        }
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    }

    /**
     * Starts the game
     */
    function startGame() {
        guessedLetters = [];
        wrongGuesses = [];
        word = getRandomWord(selectedLevel);
        displayWord();
        displayKeyboard();
        document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
        resetButton.classList.remove('hidden');
    }

    /**
     * Generates a random word depending on the level selected. 
     */
    function getRandomWord(level) {
        const words = wordList[level];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toLowerCase();
    }

    /**
     * Displays the selected word from the random generator. 
     */
    function displayWord() {
        const wordDisplay = document.getElementById('word-display');
        wordDisplay.innerHTML = ''; // Clear the word display
        word.split('').forEach(letter => {
            const span = document.createElement('span');
            span.textContent = guessedLetters.includes(letter) ? letter : '_';
            wordDisplay.appendChild(span);
        });
        checkGameStatus();
    }

    /**
     * Creates an interactive keyboard on the screen to allow
     * players to press the approiate letter for the game
     */
    function displayKeyboard() {
        const keyboard = document.getElementById('keyboard');
        keyboard.innerHTML = ''; // Clear the keyboard
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        alphabet.forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter.toLocaleUpperCase();
            button.classList.add('letter-button');
            button.addEventListener('click', () => handleGuess(letter));
            keyboard.appendChild(button);
        });
    }

    /**
     * Checks the letter pressed from the keyboard against what the 
     * word generated is and 
     */
    function handleGuess(letter) {
        if (guessedLetters.includes(letter) || wrongGuesses.includes(letter)) return;
        guessedLetters.push(letter);
        if (word.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses.push(letter);
            attempts--;
            document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
            document.getElementById('wrong-guesses').textContent = `Wrong guesses: ${wrongGuesses.join(', ')}`;
            displayWord();
        }
    }

    /**
     * Checks to see whether the play has won or lost.
     */
    function checkGameStatus() {
        if (word.split('').every(letter => guessedLetters.includes(letter))) {
            alert('Congratulations! You won!');
        } else if (attempts <= 0) {
            alert('Game Over! You ran out of attempts!');
        }
    }


    let balloons = 10;

    // adds cat and balloons picture 

    const cat = document.getElementById('cat');
    cat.src = `assets/images/balloonsGraphic${balloons}.png`;
    cat.alt = `you have ${balloons} balloons`;


    
});