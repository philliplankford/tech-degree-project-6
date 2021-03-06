const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const startButton = document.querySelector('.btn_reset');
const overlay = document.querySelector('#overlay');
const hearts = document.querySelectorAll('.tries img');
let missed = 0;

const phrases = [
    'playboi carti',
    'tyler the creator',
    'biggie smalls',
    'tupac',
    'drake',
    'smokepurpp',
    'childish gambino',
    'ski mask the slump god',
    'migos'
];

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
    for (let i = 0; i < letterArr.length; i++) {
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

// add the phrase to the display
displayPhrase(splitPhrase(choosePhrase(phrases))); 

function checkWin() {
    const letter = document.querySelectorAll('.letter');
    const show = document.querySelectorAll('.show');
    const heading = document.querySelector('h2');
    if ( letter.length === show.length) {
        overlay.className = 'win';
        heading.innerText = "You've Won!";
        startButton.textContent = 'Go Again';
        overlay.style.display = 'flex';
    } else if ( missed > 4) {
        overlay.className = 'lose';
        heading.innerText = "You Lost!";
        startButton.textContent = 'Go Again';
        overlay.style.display = 'flex';
    }
}

function checkLetter(button) {
    const allLetters = phrase.querySelectorAll('li');
    let match = null;
    for (let i = 0; i < allLetters.length; i++) {
        if (button.textContent === allLetters[i].innerText) {
            allLetters[i].classList.add('show');
            match = button.textContent;
        }
    }
    return match;
}

function resetGame() {
    const allLetters = phrase.querySelectorAll('li');
    const allKeys = document.querySelectorAll('#qwerty button');
    function resetClassNames(array) {
        for (let i = 0; i < array.length; i++)
            array[i].className = '';
    }
    function removeChildren(array) {
        for (let i = 0; i < array.length; i++){
            phrase.removeChild(array[i]);
        }
    }
    function resetLetters(array) {
        resetClassNames(array);
        removeChildren(array);
    }
    resetLetters(allLetters);
    resetClassNames(allKeys);
    // reset hearts
    for (let i = 0; i < hearts.length; i++){
        hearts[i].src='images/liveHeart.png';
    }
    displayPhrase(splitPhrase(choosePhrase(phrases))); 
    missed = 0;
    overlay.style.display = 'none';
}

startButton.addEventListener('click', (e) => {
    switch (e.target.textContent) {
        case 'Start Game':
            overlay.style.display = 'none';
            break;
        case 'Go Again':
            resetGame();
            break;
        default: 
            break;
    }
});

qwerty.addEventListener('click', (e) => {
    if (e.target.className !== 'chosen' && e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        const letter = checkLetter(e.target);
        if ( !letter ) { 
            missed++;
            hearts[hearts.length - missed].src='images/lostHeart.png';
         }
        checkWin();
    }
});