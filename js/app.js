const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const startButton = document.querySelector('.btn_reset');
const overlay = document.querySelector('#overlay');
const hearts = document.querySelector('#scoreboard ol');
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
    const phrase = array[random_num(0, highNum - 1)];
    return phrase;
}

function splitPhrase(phrase) {
    const phraseArr = phrase.split('');
    return phraseArr;
}

function displayPhrase(letterArr) {
    for (i = 0; i < letterArr.length; i++) {
        let letter = document.createElement('li');
        letter.textContent = `${letterArr[i]}`;
        if ( letterArr[i] === ' ' ) {
            letter.className = 'space';
        } else {
            letter.className = 'letter';
        }
        phrase.appendChild(letter);   
    }
}


function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const heading = document.querySelector('h2');
    if ( letter.length === show.length) {
        overlay.className = 'win';
        heading.innerText = "You've Won!";
        startButton.textContent = 'Restart';
        overlay.style.display = 'flex';
    } else if ( missed > 4) {
        overlay.className = 'lose';
        heading.innerText = "You Lost!";
        startButton.textContent = 'Restart';
        overlay.style.display = 'flex';
    }

}

function checkLetter(button) {
    const allLetters = phrase.querySelectorAll('li');
    let match = null;
    for (i = 0; i < allLetters.length; i++) {
        if (button.textContent === allLetters[i].innerText) {
            allLetters[i].className += ' show';
            match = button.textContent;
        }
    }
    return match;
}

function resetGame() {
    missed = 0;
}

startButton.addEventListener('click', (e) => {
    switch (e.target.textContent) {
        case 'Start Game':
            document.querySelector('#overlay').style.display = 'none';
            break;
        case 'Restart':
            break;
        default: 
            break;
    }
});

qwerty.addEventListener('click', (e) => {
    if (e.target.className !== 'chosen') {
        e.target.className = 'chosen';
        const letter = checkLetter(e.target);
        if ( !letter ) { 
            heart = hearts.firstElementChild;
            hearts.removeChild(heart);
            missed++; }
        checkWin();
    }
});


displayPhrase(splitPhrase(choosePhrase(phrases))); 