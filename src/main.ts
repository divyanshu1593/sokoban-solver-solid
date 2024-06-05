import { Board } from './board/board';
import { levels } from './levels';
import { displayInstance } from './singletons';

const board = new Board(levels.level1, displayInstance);
board.show();
