import React from 'react';
import { Button } from 'react-bootstrap';
import { VolumeUpFill } from 'react-bootstrap-icons';
import { sound } from '../../../utils/sound';
import { volume } from '../../../constants/games';

interface Props {
  iconSize: number;
  soundPath: string;
}

export default function SoundButton(props: Props): JSX.Element {
  const { iconSize, soundPath } = props;
  return (
    <Button
      variant="light"
      onClick={() => {
        const soundUrl = `${process.env.REACT_APP_BASE_URL}/${soundPath}`;
        sound.playSound(soundUrl, volume);
      }}
    >
      <VolumeUpFill size={iconSize} />
    </Button>
  );
}
