import { BlockType } from 'src/board/types/block-type.enum';
import { MoveDir } from 'src/board/types/move-direction.enum';

export interface AnimationService {
  animate: (startingState: BlockType[][], moves: MoveDir[]) => void;
}
