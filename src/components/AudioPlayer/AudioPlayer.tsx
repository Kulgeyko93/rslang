import * as React from 'react';
import ReactHowler from 'react-howler';

type AudioPlayerProps = {
  link: string;
  playing: boolean;
  format: Array<string>;
  loop: boolean;
  mute: boolean | null;
};

export const AudioPlayer = ({ link, playing, format, loop, mute }: AudioPlayerProps): JSX.Element => (
  <ReactHowler
    src={link}
    playing={playing}
    format={format}
    loop={loop}
    mute={mute || false}
    volume={0.5}
    preload
    html5
  />
);
