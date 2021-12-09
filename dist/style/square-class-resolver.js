import { FREE } from '../utils/bingo-phrases';
export default function squareClassResolver(phrase) {
    switch (phrase) {
        case FREE:
            return 'free-square';
        case 'FOO':
            return 'goo';
        default:
            return '';
    }
}
;
//# sourceMappingURL=square-class-resolver.js.map