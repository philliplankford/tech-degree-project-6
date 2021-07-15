const qwerty = 0; //#qwerty
const phrase = 0; //#phrase
const startButton = document.querySelector('.btn_reset');
let missed = 0;

const phrases = [
    'your momma so fat',
    'your momma so ugly',
    'your momma so lame',
    'your momma so nerdy',
    'your momma so manly'
]

function random_num(low, high) {
    const num = Math.floor(Math.random() * (high - low + 1)) + low;
    return num;
}

function choosePhrase(array) {
    const highNum = array.length;
    const phrase = array[random_num(0, highNum)];
    return phrase;
}

function splitPhrase(phrase) {
    const phraseArr = phrase.split('');
    return phraseArr;
}

const phraseArr = splitPhrase(choosePhrase(phrases)); 

startButton.addEventListener('click', () => {
    document.querySelector('#overlay').style.display = 'none';
});

// event listener
// #overlay.display = none;

// loop that iterates through the .tries class for hearts 