import React from 'react';
import styles from './Video.module.css';

const Video = (): JSX.Element => (
  <div className={styles.video}>
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/2G2KYvJdfCI"
      frameBorder="0"
      allowFullScreen
      title="видео о работе приложения RS LANG"
    />
  </div>
);

export default Video;
