import React from 'react';
// import ReactPlayer from 'react-player';
// import posterImg from '../../assets/poster.jpg';
// import videoSrc from '../../assets/video/video.mp4';
import styles from './Video.module.css';

const Video = (): JSX.Element => (
  <div className={styles.video}>
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/2G2KYvJdfCI"
      frameBorder="0"
      data-allow="autoplay; encrypted-media"
      allowFullScreen
      title="видео о работе приложения RS LANG"
    />
  </div>
);

// const Video = (): JSX.Element => (
//   <div className={styles.video}>
//     <ReactPlayer
//       width="100%"
//       height="100%"
//       url={videoSrc}
//       config={{
//         file: {
//           attributes: {
//             poster: { posterImg },
//           },
//         },
//       }}
//     />
//   </div>
// );

export default Video;
