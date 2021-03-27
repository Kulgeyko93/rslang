type Sound = {
  audio: HTMLAudioElement | null;
  playSound(path: string, volume: number): void;
};

export const sound: Sound = {
  audio: null,
  playSound(path, volume) {
    const audio = new Audio(path);
    audio.volume = volume;
    audio.play();
    if (this.audio && audio.onended) {
      this.audio.pause();
    }
    this.audio = audio;
  },
};
