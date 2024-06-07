import { BlockType } from '../../board/types/block-type.enum';
import { MoveDir } from '../../board/types/move-direction.enum';

export type StateHistory = {
  currentState: BlockType[][];
  movesHistory: MoveDir[];
};
