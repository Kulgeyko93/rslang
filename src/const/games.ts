export const games = [
  { name: 'Аудиовызов', description: 'Игра улучшает восприятие речи на слух', color: 'yellow' },
  { name: 'Спринт', description: 'Игра улучшает восприятие речи на слух', color: 'green' },
  { name: 'Саванна', description: 'Игра улучшает восприятие речи на слух', color: 'blue' },
  { name: 'Своя игра', description: 'Игра улучшает восприятие речи на слух', color: 'red' },
];

export const volume = 0.5;

export const groups = ['0', '1', '2', '3', '4', '5'];

export const countPagesInGroup = 30; // from 0 to 29

export const wordsPerPage = 5;

export const endGame = {
  messageIfNoErrors: 'Поздравляем, отличный результат!',
  messageIfErrors: 'В этот раз не получилось, но продолжай тренироваться!',
};

export const playWordsFromConsts = [
  {
    id: '5e9f5ee35eb9e72bc21af4b4',
    group: 0,
    page: 1,
    word: 'adventure',
    image: 'files/02_0021.jpg',
    audio: 'files/02_0021.mp3',
    audioMeaning: 'files/02_0021_meaning.mp3',
    audioExample: 'files/02_0021_example.mp3',
    textMeaning: 'An <i>adventure</i> is a fun or exciting thing that you do.',
    textExample: 'Riding in the rough water was an <b>adventure</b>.',
    transcription: '[ədvéntʃər]',
    textExampleTranslate: 'Езда в бурной воде была приключением',
    textMeaningTranslate: 'Приключение - это забавная или захватывающая вещь, которую ты делаешь',
    wordTranslate: 'приключение',
  },
  {
    id: '5e9f5ee35eb9e72bc21af4b5',
    group: 0,
    page: 1,
    word: 'approach',
    image: 'files/02_0022.jpg',
    audio: 'files/02_0022.mp3',
    audioMeaning: 'files/02_0022_meaning.mp3',
    audioExample: 'files/02_0022_example.mp3',
    textMeaning: 'To <i>approach</i> something means to move close to it.',
    textExample: 'The boy <b>approached</b> his school.',
    transcription: '[əpróutʃ]',
    textExampleTranslate: 'Мальчик приблизился к своей школе',
    textMeaningTranslate: 'Подойти к чему-то - значит приблизиться к нему',
    wordTranslate: 'подходить',
  },
  {
    id: '5e9f5ee35eb9e72bc21af4b6',
    group: 0,
    page: 1,
    word: 'chemical',
    image: 'files/02_0024.jpg',
    audio: 'files/02_0024.mp3',
    audioMeaning: 'files/02_0024_meaning.mp3',
    audioExample: 'files/02_0024_example.mp3',
    textMeaning: 'A <i>chemical</i> is something that scientists use in chemistry.',
    textExample: 'The scientist mixed the <b>chemicals</b>.',
    transcription: '[kémikəl]',
    textExampleTranslate: 'Ученый смешал химикаты',
    textMeaningTranslate: 'Химическое вещество - это то, что ученые используют в химии',
    wordTranslate: 'химический',
  },
  {
    id: '5e9f5ee35eb9e72bc21af4b7',
    group: 0,
    page: 1,
    word: 'carefully',
    image: 'files/02_0023.jpg',
    audio: 'files/02_0023.mp3',
    audioMeaning: 'files/02_0023_meaning.mp3',
    audioExample: 'files/02_0023_example.mp3',
    textMeaning: '<i>Carefully</i> means with great attention, especially to detail or safety.',
    textExample: 'The baby <b>carefully</b> climbed down the stairs.',
    transcription: '[kɛ́ərfəli]',
    textExampleTranslate: 'Малыш осторожно спускался по лестнице',
    textMeaningTranslate: 'Осторожно означает с большим вниманием, особенно к деталям или безопасности',
    wordTranslate: 'внимательно',
  },
  {
    id: '5e9f5ee35eb9e72bc21af4b8',
    group: 0,
    page: 1,
    word: 'create',
    image: 'files/02_0025.jpg',
    audio: 'files/02_0025.mp3',
    audioMeaning: 'files/02_0025_meaning.mp3',
    audioExample: 'files/02_0025_example.mp3',
    textMeaning: 'To <i>create</i> means to make something new.',
    textExample: 'She <b>created</b> an igloo from blocks of snow.',
    transcription: '[kriéit]',
    textExampleTranslate: 'Она создала иглу из снежных глыб',
    textMeaningTranslate: 'Создать значит создать что-то новое',
    wordTranslate: 'создайте',
  },
];

export const wordsFromServer = [
  {
    id: '5e9f5ee35eb9e72bc21af6e4',
    group: 0,
    page: 29,
    word: 'above',
    image: 'files/30_0581.jpg',
    audio: 'files/30_0581.mp3',
    audioMeaning: 'files/30_0581_meaning.mp3',
    audioExample: 'files/30_0581_example.mp3',
    textMeaning: 'If something is <i>above</i>, it is at a higher level than something else.',
    textExample: 'He straightened the sign that was <b>above</b> the crowd.',
    transcription: '[əbʌ́v]',
    textExampleTranslate: 'Он поправил знак, который был над толпой',
    textMeaningTranslate: 'Если что-то выше, это на более высоком уровне, чем что-то другое',
    wordTranslate: 'над',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6e5',
    group: 0,
    page: 29,
    word: 'ahead',
    image: 'files/30_0582.jpg',
    audio: 'files/30_0582.mp3',
    audioMeaning: 'files/30_0582_meaning.mp3',
    audioExample: 'files/30_0582_example.mp3',
    textMeaning: 'If something is <i>ahead</i> of something else, it is in front of it.',
    textExample: 'The blue car drove on <b>ahead</b> of us.',
    transcription: '[əhéd]',
    textExampleTranslate: 'Синяя машина ехала впереди нас',
    textMeaningTranslate: 'Если что-то впереди чего-то другого, то оно впереди',
    wordTranslate: 'вперед',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6e6',
    group: 0,
    page: 29,
    word: 'amount',
    image: 'files/30_0583.jpg',
    audio: 'files/30_0583.mp3',
    audioMeaning: 'files/30_0583_meaning.mp3',
    audioExample: 'files/30_0583_example.mp3',
    textMeaning: 'An <i>amount</i> is how much there is of something.',
    textExample: 'Can I use my card to pay for the entire <b>amount</b>?',
    transcription: '[əmáunt]',
    textExampleTranslate: 'Могу ли я использовать свою карту для оплаты всей суммы?',
    textMeaningTranslate: 'Количество - это то, сколько есть чего-то',
    wordTranslate: 'количество',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6e7',
    group: 0,
    page: 29,
    word: 'belief',
    image: 'files/30_0584.jpg',
    audio: 'files/30_0584.mp3',
    audioMeaning: 'files/30_0584_meaning.mp3',
    audioExample: 'files/30_0584_example.mp3',
    textMeaning: 'A <i>belief</i> is a strong feeling that something is correct or true.',
    textExample: 'A preacher or priest should have a strong <b>belief</b> in God.',
    transcription: '[bilíːf]',
    textExampleTranslate: 'Проповедник или священник должны иметь твердую веру в Бога',
    textMeaningTranslate: 'Вера - это сильное чувство, что что-то правильно или верно',
    wordTranslate: 'вера',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6e8',
    group: 0,
    page: 29,
    word: 'cost',
    image: 'files/30_0587.jpg',
    audio: 'files/30_0587.mp3',
    audioMeaning: 'files/30_0587_meaning.mp3',
    audioExample: 'files/30_0587_example.mp3',
    textMeaning: 'To <i>cost</i> is to require payment.',
    textExample: 'These designer shoes <b>cost</b> more than the regular ones.',
    transcription: '[kɔːst]',
    textExampleTranslate: 'Эти дизайнерские туфли стоят дороже обычных',
    textMeaningTranslate: 'К стоимости - значит требовать оплату',
    wordTranslate: 'стоимость',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6e9',
    group: 0,
    page: 29,
    word: 'demonstrate',
    image: 'files/30_0588.jpg',
    audio: 'files/30_0588.mp3',
    audioMeaning: 'files/30_0588_meaning.mp3',
    audioExample: 'files/30_0588_example.mp3',
    textMeaning: 'To <i>demonstrate</i> something is to show how it is done.',
    textExample: 'She <b>demonstrated</b> her plan to her co-workers.',
    transcription: '[démənstrèit]',
    textExampleTranslate: 'Она продемонстрировала план сотрудникам',
    textMeaningTranslate: 'Продемонстрировать что-то значит показать, как это делается',
    wordTranslate: 'продемонстрировать',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ea',
    group: 0,
    page: 29,
    word: 'different',
    image: 'files/30_0589.jpg',
    audio: 'files/30_0589.mp3',
    audioMeaning: 'files/30_0589_meaning.mp3',
    audioExample: 'files/30_0589_example.mp3',
    textMeaning: '<i>Different</i> describes someone or something that is not the same as others.',
    textExample: 'Each of my sisters has a <b>different</b> hair style.',
    transcription: '[dífərənt]',
    textExampleTranslate: 'У каждой из моих сестер разные прически',
    textMeaningTranslate: 'Разное описывает кого-то или что-то, что не совпадает с другими',
    wordTranslate: 'другой',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6eb',
    group: 0,
    page: 29,
    word: 'center',
    image: 'files/30_0585.jpg',
    audio: 'files/30_0585.mp3',
    audioMeaning: 'files/30_0585_meaning.mp3',
    audioExample: 'files/30_0585_example.mp3',
    textMeaning: 'The <i>center</i> of something is the middle of it.',
    textExample: 'The <b>center</b> of a dart board is the most important spot.',
    transcription: '[séntər]',
    textExampleTranslate: 'Центр доски для дартса - самое важное место',
    textMeaningTranslate: 'Центр чего-то - это середина',
    wordTranslate: 'центр',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ec',
    group: 0,
    page: 29,
    word: 'common',
    image: 'files/30_0586.jpg',
    audio: 'files/30_0586.mp3',
    audioMeaning: 'files/30_0586_meaning.mp3',
    audioExample: 'files/30_0586_example.mp3',
    textMeaning: 'If something is <i>common</i>, it happens often or there is much of it.',
    textExample: 'It is <b>common</b> for snow to fall in the winter.',
    transcription: '[kɑ́mən]',
    textExampleTranslate: 'Это нормально, что зимой идет снег',
    textMeaningTranslate: 'Если что-то общее, это случается часто или его много',
    wordTranslate: 'общий',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ed',
    group: 0,
    page: 29,
    word: 'evidence',
    image: 'files/30_0590.jpg',
    audio: 'files/30_0590.mp3',
    audioMeaning: 'files/30_0590_meaning.mp3',
    audioExample: 'files/30_0590_example.mp3',
    textMeaning: '<i>Evidence</i> is a fact or thing that you use to prove something.',
    textExample: 'He used the pictures as <b>evidence</b> that UFOs are real.',
    transcription: '[évidəns]',
    textExampleTranslate: 'Он использовал фотографии в качестве доказательства того, что НЛО реальны',
    textMeaningTranslate: 'Доказательства - это факт или вещь, которую вы используете, чтобы доказать что-то',
    wordTranslate: 'доказательство',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ee',
    group: 0,
    page: 29,
    word: 'independent',
    image: 'files/30_0593.jpg',
    audio: 'files/30_0593.mp3',
    audioMeaning: 'files/30_0593_meaning.mp3',
    audioExample: 'files/30_0593_example.mp3',
    textMeaning: 'If something is <i>independent</i>, it is not controlled by something else.',
    textExample: 'She chose to live an <b>independent</b> life in the country.',
    transcription: '[ìndipéndənt]',
    textExampleTranslate: 'Она решила жить независимой жизнью в стране',
    textMeaningTranslate: 'Если что-то является независимым, оно не контролируется чем-то другим',
    wordTranslate: 'независимый',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6ef',
    group: 0,
    page: 29,
    word: 'honesty',
    image: 'files/30_0591.jpg',
    audio: 'files/30_0591.mp3',
    audioMeaning: 'files/30_0591_meaning.mp3',
    audioExample: 'files/30_0591_example.mp3',
    textMeaning: '<i>Honesty</i> means the quality of being truthful or honest.',
    textExample: 'A courtroom should be a place of <b>honesty</b>.',
    transcription: '[ɑ́nisti]',
    textExampleTranslate: 'Зал суда должен быть местом честности',
    textMeaningTranslate: 'Честность означает качество быть правдивым или честным',
    wordTranslate: 'честность',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f0',
    group: 0,
    page: 29,
    word: 'inside',
    image: 'files/30_0594.jpg',
    audio: 'files/30_0594.mp3',
    audioMeaning: 'files/30_0594_meaning.mp3',
    audioExample: 'files/30_0594_example.mp3',
    textMeaning: '<i>Inside</i> means the inner part, space or side of something.',
    textExample: 'The <b>inside</b> of the box was empty.',
    transcription: '[ínsáid]',
    textExampleTranslate: 'Коробка внутри была пуста',
    textMeaningTranslate: 'Внутри означает внутреннюю часть, пространство или сторону чего-либо',
    wordTranslate: 'внутри',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f1',
    group: 0,
    page: 29,
    word: 'idiom',
    image: 'files/30_0592.jpg',
    audio: 'files/30_0592.mp3',
    audioMeaning: 'files/30_0592_meaning.mp3',
    audioExample: 'files/30_0592_example.mp3',
    textMeaning: 'An <i>idiom</i> is a phrase with a meaning different from its words.',
    textExample: 'The <b>idiom</b> “when pigs fly” means that something will never happen.',
    transcription: '[ídiəm]',
    textExampleTranslate: 'Идиома «когда свиньи летают» означает, что что-то никогда не случится',
    textMeaningTranslate: 'Идиома - это фраза, значение которой отличается от ее слов',
    wordTranslate: 'идиома',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f2',
    group: 0,
    page: 29,
    word: 'jail',
    image: 'files/30_0595.jpg',
    audio: 'files/30_0595.mp3',
    audioMeaning: 'files/30_0595_meaning.mp3',
    audioExample: 'files/30_0595_example.mp3',
    textMeaning: 'A <i>jail</i> is a place to keep bad people.',
    textExample: 'He was sent to <b>jail</b> for taking other people’s cars.',
    transcription: '[dʒeil]',
    textExampleTranslate: 'Его посадили в тюрьму за воровство машин',
    textMeaningTranslate: 'Тюрьма - это место, где содержатся плохие люди',
    wordTranslate: 'тюрьма',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f3',
    group: 0,
    page: 29,
    word: 'master',
    image: 'files/30_0596.jpg',
    audio: 'files/30_0596.mp3',
    audioMeaning: 'files/30_0596_meaning.mp3',
    audioExample: 'files/30_0596_example.mp3',
    textMeaning: 'A <i>master</i> is a person who is very good at something.',
    textExample: 'My brother is a <b>master</b> of taekwondo.',
    transcription: '[mǽstəːr]',
    textExampleTranslate: 'Мой брат мастер тхэквондо',
    textMeaningTranslate: 'Мастер - это человек, который очень хорош в чем-то',
    wordTranslate: 'мастер',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f5',
    group: 0,
    page: 29,
    word: 'pocket',
    image: 'files/30_0598.jpg',
    audio: 'files/30_0598.mp3',
    audioMeaning: 'files/30_0598_meaning.mp3',
    audioExample: 'files/30_0598_example.mp3',
    textMeaning: 'A <i>pocket</i> is a part of your clothing where you can keep things.',
    textExample: 'She always had her hands in her <b>pockets</b>.',
    transcription: '[pάkit]',
    textExampleTranslate: 'Она всегда держала руки в карманах',
    textMeaningTranslate: 'Карман - это часть вашей одежды, где вы можете хранить вещи',
    wordTranslate: 'карман',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f4',
    group: 0,
    page: 29,
    word: 'memory',
    image: 'files/30_0597.jpg',
    audio: 'files/30_0597.mp3',
    audioMeaning: 'files/30_0597_meaning.mp3',
    audioExample: 'files/30_0597_example.mp3',
    textMeaning: 'A <i>memory</i> is something you remember.',
    textExample: 'The <b>memory</b> of my first time in the city will always be the best.',
    transcription: '[méməri]',
    textExampleTranslate: 'Память о моем первом пребывании в городе всегда будет лучшей',
    textMeaningTranslate: 'Память - это то, что ты помнишь',
    wordTranslate: 'память',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f7',
    group: 0,
    page: 29,
    word: 'sale',
    image: 'files/30_0600.jpg',
    audio: 'files/30_0600.mp3',
    audioMeaning: 'files/30_0600_meaning.mp3',
    audioExample: 'files/30_0600_example.mp3',
    textMeaning: 'If something is for <i>sale</i>, you can buy it.',
    textExample: 'Everything for <b>sale</b> here is the same price.',
    transcription: '[seil]',
    textExampleTranslate: 'Здесь все для продажи по одной и той же цене',
    textMeaningTranslate: 'Если что-то продается, вы можете купить это',
    wordTranslate: 'продажа',
  },
  {
    id: '5e9f5ee35eb9e72bc21af6f6',
    group: 0,
    page: 29,
    word: 'proper',
    image: 'files/30_0599.jpg',
    audio: 'files/30_0599.mp3',
    audioMeaning: 'files/30_0599_meaning.mp3',
    audioExample: 'files/30_0599_example.mp3',
    textMeaning: 'If something is <i>proper</i>, it is right.',
    textExample: 'It is not <b>proper</b> to throw your garbage on the road.',
    transcription: '[prɑ́pər]',
    textExampleTranslate: 'Не стоит выбрасывать мусор на дорогу',
    textMeaningTranslate: 'Если что-то правильно, это правильно',
    wordTranslate: 'правильный',
  },
];
