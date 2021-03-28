type Sound = {
  audio: HTMLAudioElement | null;
  playSound(path: string, volume: number): void;
};

export const sound: Sound = {
  audio: null,
  playSound(path, volume) {
    const audio = new Audio(path);
    audio.volume = volume;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (this.audio && audio.onended) {
            this.audio.pause();
          }
          this.audio = audio;
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert('Сервер недоступен! Попробуйте позже');
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  },
};
