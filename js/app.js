document.addEventListener('mousemove', (e) => {
  Object.assign(document.documentElement, {
    style: `
	--move-x:${(e.clientX - window.innerWidth / 2) * -0.007}deg;
	--move-y:${(e.clientY - window.innerHeight / 2) * -0.006}deg;
		`,
  });
});

const audio = document.querySelector('.media__audio');

// window.onload = function () {

// };

// ---------------------Btn---------

const playBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu');
const layers = document.querySelector('.layers__container');
const errorAudio = document.querySelector('.error-audio');

playBtn.addEventListener('click', () => {
  audio.play();
  menu.classList.add('hidden');
  layers.classList.remove('hidden');
});

// ----------------------------------Game logic------------

const wordsArray = ['рыба', 'дерево', 'яблоко'];
const randomNumber = getRandomInt(wordsArray.length);
const currentWord = wordsArray[randomNumber].toLocaleLowerCase();
const outWord = currentWord.split('').map(() => '_');
let errors = 0;

const writeWord = document.querySelector('.write-word');
const displayWord = document.querySelector('.word');

const errorClass = document.querySelector('.error');
const errorsList = document.querySelector('.errorsList');
// -----------------------------

document.addEventListener('keydown', (e) => {
  const key = e.key.toLocaleLowerCase();
  checkLetter(key);
});

renderDisplayWord();

// ----Functions----

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkLetter(key) {
  console.log(key);
  if (key.length > 1) return null;
  if (Number(key) === NaN) return null;

  renderCurretnLetter(key);
  if (currentWord.includes(key)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === key) {
        outWord[i] = key;
      }
    }

    renderDisplayWord();
  } else {
    errorAudio.play();
    errorDisplay(key);
  }

  checkWord();
}

function checkWord() {
  if (!outWord.includes('_')) {
    setTimeout(() => {
      alert('Вы выйграли');
      location.reload();
    }, 400);
  }
}

function renderDisplayWord() {
  displayWord.innerHTML = outWord.join(' ');
}

function renderCurretnLetter(key) {
  writeWord.innerHTML = key;
}

function errorDisplay(key) {
  errors++;
  errorClass.classList.add('error--active');
  setTimeout(() => {
    errorClass.classList.remove('error--active');
  }, 200);

  const li = document.createElement('li');
  li.innerHTML += key;
  errorsList.append(li);

  const person = document.querySelector('.person');

  if (errors === 1) {
    person.style.left = '15%';
  }
  if (errors === 2) {
    person.style.left = '30%';
  }
  if (errors === 3) {
    person.style.left = '45%';
  }
}

window.onload = () => {
  const far = document.querySelectorAll('.far');
  const audioCar = document.querySelector('.audio-car');

  setTimeout(() => {
    far.forEach((item) => item.classList.add('far--active'));
    audioCar.play();
  }, 2900);
  setTimeout(() => {
    far.forEach((item) => item.classList.remove('far--active'));
    audioCar.pause();
  }, 10000);

  const btnMenuAudio = document.querySelector('.knopka');

  const menuButtons = document.querySelectorAll('.menuBtn');

  menuButtons.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      setTimeout(() => {
        btnMenuAudio.play();
      }, 10);
    });
  });
};

// ----------------Menu
