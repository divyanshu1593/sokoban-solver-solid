import { BlockType } from '../../board/types/block-type.enum';
import { MoveDir } from '../../board/types/move-direction.enum';

export interface AnimationService {
  animate: (startingState: BlockType[][], moves: MoveDir[]) => void;
}
