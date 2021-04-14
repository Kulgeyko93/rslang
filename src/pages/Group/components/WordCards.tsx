import React, { useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Difficulty, UserAggregatedWord, UserWord, Word } from '../../../types';
import { AuthState } from '../../../features/auth/authSlice';
import WordCard from './WordCard';
import { games } from '../../../const/games';
import {
  setCurrentWord,
  setIsGameOpenFromTextBook,
  setIsPlaying,
  setOriginWordsArray,
  setPlayWordsArray,
} from '../../../features/game/gameSlice';

interface Props {
  wordsData: Word[];
  userAggregatedWordsData: UserAggregatedWord[] | null;
  authData: AuthState['data'];
}

enum WordActionType {
  SET_AGGREGATED_WORDS = 'set_aggregated_words',
  DELETE_WORD_FROM_LIST = 'delete_word_from_list',
  ADD_HARD_WORD_LABEL = 'add_hard_word_label',
}

type Action =
  | { type: WordActionType.SET_AGGREGATED_WORDS; words: UserAggregatedWord[] }
  | { type: WordActionType.DELETE_WORD_FROM_LIST; wordId: string }
  | { type: WordActionType.ADD_HARD_WORD_LABEL; wordId: string };

interface ActiveWord {
  wordId: string;
  wordData: Word;
  userWord: UserWord | undefined;
  userId: string | undefined;
}

function aggregatedWordsReducer(state: UserAggregatedWord[] | null, action: Action) {
  switch (action.type) {
    case WordActionType.SET_AGGREGATED_WORDS: {
      return action.words;
    }

    case WordActionType.DELETE_WORD_FROM_LIST: {
      if (state == null) {
        return state;
      }
      const indexToDelete = state.findIndex(
        (userAggregatedWord: UserAggregatedWord) => userAggregatedWord._id === action.wordId,
      );
      if (indexToDelete < 0) {
        return state;
      }
      const foundWord = state[indexToDelete];
      const deletedWord = {
        ...foundWord,
        userWord: {
          ...(foundWord.userWord || {}),
          optional: { ...(foundWord.userWord?.optional || {}), isDeleted: true },
        },
      };
      return [...state.slice(0, indexToDelete), deletedWord, ...state.slice(indexToDelete + 1)];
    }

    case WordActionType.ADD_HARD_WORD_LABEL: {
      if (state == null) {
        return state;
      }
      const indexToUpdate = state.findIndex(
        (userAggregatedWord: UserAggregatedWord) => userAggregatedWord._id === action.wordId,
      );
      if (indexToUpdate < 0) {
        return state;
      }
      const foundWord = state[indexToUpdate];
      const updatedWord = { ...foundWord, userWord: { ...foundWord.userWord, difficulty: Difficulty.Hard } };
      return [...state.slice(0, indexToUpdate), updatedWord, ...state.slice(indexToUpdate)];
    }

    default: {
      throw new Error(`Unsupported action: ${action}`);
    }
  }
}

export default function WordCards(props: Props): JSX.Element {
  const { wordsData, userAggregatedWordsData, authData } = props;
  const dispatch = useDispatch();
  const [aggregatedWords, dispatchWordAction] = useReducer(aggregatedWordsReducer, userAggregatedWordsData || []);
  useEffect(() => {
    if (userAggregatedWordsData) {
      dispatchWordAction({ type: WordActionType.SET_AGGREGATED_WORDS, words: userAggregatedWordsData });
    }
  }, [userAggregatedWordsData]);
  const activeWords = wordsData.reduce((wordsAcc: ActiveWord[], wordData) => {
    const wordId = wordData.id;
    const userWord = aggregatedWords?.find(
      (userAggregatedWord: UserAggregatedWord) => userAggregatedWord._id === wordId,
    )?.userWord;
    if (userWord?.optional?.isDeleted) {
      return wordsAcc;
    }
    const currentWord = {
      wordId,
      wordData,
      userWord,
      userId: authData?.userId,
    };
    return [...wordsAcc, currentWord];
  }, []);

  const cardElements = activeWords.map((word: ActiveWord) => {
    const { wordId, wordData, userWord, userId } = word;
    function deleteWordFromList() {
      dispatchWordAction({ type: WordActionType.DELETE_WORD_FROM_LIST, wordId });
    }
    function addHardWordLabel() {
      dispatchWordAction({ type: WordActionType.ADD_HARD_WORD_LABEL, wordId });
    }
    return (
      <WordCard
        key={`${wordId}`}
        wordData={wordData}
        userWord={userWord}
        userId={userId}
        addHardWordLabel={addHardWordLabel}
        deleteWordFromList={deleteWordFromList}
      />
    );
  });

  const onGameClick = () => {
    dispatch(setIsGameOpenFromTextBook(true));
    dispatch(setOriginWordsArray(activeWords.map((activeWord) => activeWord.wordData)));
    dispatch(setPlayWordsArray());
    dispatch(setCurrentWord());
    dispatch(setIsPlaying(true));
  };
  return (
    <>
      <div className="cards">{cardElements}</div>
      <Container>
        {cardElements.length > 10 && (
          <Row>
            {games.map((game) => (
              <Col
                key={game.name}
                sm={3}
                xs={6}
                className="game"
                onClick={onGameClick}
              >
                {game.nameRU}
              </Col>
            ))}
          </Row>
        )}
        {cardElements.length < 10 && (
          <Row>
            <p>Для игр недостаточно слов.</p>
          </Row>
        )}
      </Container>
    </>
  );
}
