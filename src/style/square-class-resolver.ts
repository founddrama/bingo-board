import { FREE } from '../utils/bingo-phrases';

export default function squareClassResolver(phrase: string): string {
  switch (phrase) {
    case FREE:
      return 'free-square';
    case 'FOO':
      return 'goo';
    default:
      return '';
  }
};
