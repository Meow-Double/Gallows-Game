document.addEventListener('mousemove', (e) => {
  Object.assign(document.documentElement, {
    style: `
	--move-x:${(e.clientX - window.innerWidth / 2) * -0.005}deg;
	--move-y:${(e.clientY - window.innerHeight / 2) * -0.01}deg;
		`,
  });
});

const audio = document.querySelector('.media__audio');

const sticks = document.querySelectorAll('.stick');
// window.onload = function () {

// };

// -----------------------------------

let scene = 1;
let sound = true;

// ---------------------Btn---------

const playBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu');
const layers = document.querySelector('.layers__container');
const mainSection = document.querySelector('.main');
const errorAudio = document.querySelector('.error-audio');

const mistakes = [];

playBtn.addEventListener('click', () => {
  if (sound) {
    audio.play();
  }

  menu.classList.add('hidden');
  layers.classList.remove('hidden');
  mainSection.classList.remove('hidden');
  scene = 2;
});

// ----------------------------------Game logic------------
const titles = ['животные', 'цвета', 'фрукты', 'цветы'];
const wordsArray = [
  ['бык', 'обезьяна', 'лиса', 'рысь', 'хамелеон', 'утка', 'норка'],
  ['оранжевый', 'бирюзовый', 'бордовый', 'бежевый', 'бурый'],
  ['ананас', "авокадо","гранат", "грейпфрут", "киви", "лимон" ],
  ['василёк', 'гвоздика', 'лаванда', 'папоротник', 'лилия'],
];
const wordType = getRandomInt(titles.length);
const wordNew = wordsArray[wordType]

let randomNumber = getRandomInt(wordNew.length);
let currentWord = wordNew[randomNumber].toLocaleLowerCase();
let outWord = currentWord.split('').map(() => '_');
let errors = 0;

const writeWord = document.querySelector('.write-word');
const displayWord = document.querySelector('.word');

const errorClass = document.querySelector('.error');
const errorsList = document.querySelector('.errorsList');

const title = document.querySelector('.title');
title.innerHTML = `Тема: ${titles[wordType]}`;
// -----------------------------

document.addEventListener('keydown', (e) => {
  const key = e.key.toLocaleLowerCase();
  const valid = validKey(key);

  if (!valid) return null;
  if (scene === 2) {
    checkLetter(key);
  }
});

renderDisplayWord();

// ----Functions----

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkLetter(key) {
  renderCurretnLetter(key);
  if (currentWord.includes(key)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === key) {
        outWord[i] = key;
      }
    }

    renderDisplayWord();
  } else {
    errorDisplay(key);
  }

  checkWord();
}

function checkWord() {
  if (!outWord.includes('_')) {
    setTimeout(() => {
      alert('Вы выйграли');
      location.reload();
      resetState();
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
  if (!mistakes.includes(key)) {
    errors++;
    errorClass.classList.add('error--active');
    setTimeout(() => {
      errorClass.classList.remove('error--active');
    }, 200);

    const li = document.createElement('li');
    li.innerHTML += key;
    errorsList.append(li);
    mistakes.push(key);

    if (sound) {
      errorAudio.play();
    }
  }

  // const person = document.querySelector('.person');

  sticks.forEach((item) => item.classList.add('bg--hidden'));
  sticks.forEach((item, index) => {
    if (errors === index) return item.classList.remove('bg--hidden');
  });
  if (errors === 6) {
    setTimeout(() => {
      alert('Вы проиграли');
      location.reload();
      resetState();
    }, 400);
  }
}

window.onload = () => {
  const btnMenuAudio = document.querySelector('.knopka');

  const menuButtons = document.querySelectorAll('.menuBtn');

  menuButtons.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      setTimeout(() => {
        if (sound) {
          btnMenuAudio.play();
        }
      }, 10);
    });
  });
};

const far = document.querySelectorAll('.far');
const audioCar = document.querySelector('.audio-car');

if (scene === 2) {
  setTimeout(() => {
    far.forEach((item) => item.classList.add('far--active'));
    if (sound) {
      audioCar.play();
    }
  }, 2900);
  setTimeout(() => {
    far.forEach((item) => item.classList.remove('far--active'));
    audioCar.pause();
  }, 10000);
}

// ----------------Menu

const backJs = document.querySelector('.back-js');
const soundJs = document.querySelector('.sound-js');
const soundStart = document.querySelector('.sound-ico-start');
const soundPause = document.querySelector('.sound-ico-pause');

backJs.addEventListener('click', () => {
  scene = 1;
  audio.pause();
  menu.classList.remove('hidden');
  layers.classList.add('hidden');
  mainSection.classList.add('hidden');
});

soundJs.addEventListener('click', () => {
  if (sound) {
    audio.pause();
    audioCar.pause();
    // btnMenuAudio.pause();
    soundStart.classList.add('sound-hidden');
    soundPause.classList.remove('sound-hidden');
  } else {
    audio.play();
    // audioCar.play();
    // btnMenuAudio.play();

    soundStart.classList.remove('sound-hidden');
    soundPause.classList.add('sound-hidden');
  }

  sound = !sound;
});

function validKey(key) {
  const isValid = /[А-Яа-яЁё]/.test(key);

  return isValid;
}

// ------------Modal------

const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.body');
const openModal = document.querySelector('.open-modal');

openModal.addEventListener('click', () => {
  modal.classList.add('modal--active');
});

modal.addEventListener('click', () => {
  modal.classList.remove('modal--active');
});

modalBody.addEventListener('click', (e) => {
  e.stopPropagation();
});

// function errorBg() {
//   alert("s")
//   sticks.forEach((item) => item.classList.add('bg--hidden'));
//   sticks.forEach((item, index) => {
//     if (errors === index) return item.classList.remove('bg--hidden');
//   });
// }

function resetState() {
  randomNumber = getRandomInt(wordsArray.length);
  currentWord = wordsArray[randomNumber].toLocaleLowerCase();
  outWord = currentWord.split('').map(() => '_');
}
