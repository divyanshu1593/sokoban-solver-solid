import { BlockType } from 'src/board/types/block-type.enum';
import { MoveDir } from 'src/board/types/move-direction.enum';

export type StateHistory = {
  currentState: BlockType[][];
  movesHistory: MoveDir[];
};
