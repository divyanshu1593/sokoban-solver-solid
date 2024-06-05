import { BlockType } from './block-type.enum';
import { MoveDir } from './move-direction.enum';

export interface MoveService {
  move: (state: BlockType[][], moveDir: MoveDir) => boolean;
}
