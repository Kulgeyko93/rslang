export const getDayAndMonth = (): string => new Date().toLocaleString('ru-RU', { day: 'numeric', month: 'long' });
