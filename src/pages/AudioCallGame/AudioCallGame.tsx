import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import GameHeader from '../../components/GameHeader/GameHeader';
import volumeImg from '../../assets/icons/volume.svg';
import yesImg from '../../assets/icons/yes.svg';
import noImg from '../../assets/icons/no.svg';
import photoImg from '../../assets/photo/photo.jpg';
import styles from './AudioCallGame.module.css';
// import FigureItem from '../../components/FigureItem/FigureItem';

const words = [
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

const AudioCallGame = (): JSX.Element => (
  <div>
    <GameHeader color="yellow" />
    <Container fluid className={styles.container}>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Image width="60" height="auto" src={volumeImg} />
        </Col>
        <Col className={styles.left} lg={6} md={6} sm={6} xs={12}>
          <Image width="50" height="auto" src={volumeImg} />
        </Col>
        <Col className={styles.right} lg={6} md={6} sm={6} xs={12}>
          <Figure>
            <Figure.Image width="50%" height="auto" alt="рисунок для слова" src={photoImg} />
            <Figure.Caption className={styles.text}>adventure</Figure.Caption>
          </Figure>
        </Col>
        <Col className={styles.words} lg={12}>
          {words &&
            words.map((word, index) => (
              <div key={word.id} className={styles.word}>
                <span>
                  <Image width="10" height="auto" src={noImg} />
                  <Image width="20" height="auto" src={yesImg} />
                  <span className={styles.color}>{index + 1}</span> {word.wordTranslate}
                </span>
              </div>
            ))}
        </Col>
        <Col lg={12}>
          <Button variant="outline-dark">Не знаю</Button>
          <Button variant="outline-dark">Далее</Button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default AudioCallGame;
