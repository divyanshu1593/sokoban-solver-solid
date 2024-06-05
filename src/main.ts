import { Board } from './board/board';
import { MoveDir } from './board/types/move-direction.enum';
import { levels } from './levels';
import { displayInstance, moveInstance } from './singletons';

const board = new Board(levels.level1, displayInstance, moveInstance);
board.show();
board.move(MoveDir.UP);
board.show();
