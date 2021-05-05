/* eslint-disable max-len */
export const games = [
  {
    name: 'audiocall',
    nameRU: 'Аудиовызов',
    description: 'Игра Аудиовызов улучшает восприятие английской речи на слух.',
    color: 'yellow',
    img: 'https://i2.wp.com/hipertextual.com/wp-content/uploads/2016/02/Firewatch-Encabezado.jpg?fit=2560%2C1440&ssl=1',
  },
  {
    name: 'sprint',
    nameRU: 'Спринт',
    description: 'Истинная гонка на проверку знаний. Укажи, верно ли приведен перевод слова?',
    color: 'green',
    img: 'https://oboi.ws/filters/lomo_17_12401_oboi_zelenyj_firewatch_1920x1080.jpg',
  },
  {
    name: 'savannah',
    nameRU: 'Саванна',
    description: 'Игра Саванна развивает словарный запас. Чем больше слов ты знаешь, тем лучше.',
    color: 'red',
    img: 'https://img3.akspic.ru/originals/4/2/6/1/71624-illustracia-utro-nebo-poslesvechenie-pustynya-2000x1200.jpg',
  },
  {
    name: 'riddle',
    nameRU: 'Загадка',
    description: 'Задействуй знания английского языка и кругозор для решения загадок со всего мира.',
    color: 'blue',
    img: 'https://s1.1zoom.ru/big3/596/Evening_Forests_Mountains_Firewatch_Campo_Santo_549147_2560x1440.jpg',
  },
];

export const volume = 0.5;

export const groups = ['0', '1', '2', '3', '4', '5'];

export const countPagesInGroup = 30; // from 0 to 29

export const wordsPerPage = 5;

export const endGame = {
  messageIfNoErrors: 'Поздравляю, отличный результат!',
  messageIfErrors: 'В этот раз без ошибок не получилось, но продолжай тренироваться!',
};

export const ENTER_CODE = 'Enter';
export const ARROW_CODE = 'ArrowRight';
export const PLUS_CODE = '+';
export const GAME_ANSWERS_CODES = ['1', '2', '3', '4', '5'];
