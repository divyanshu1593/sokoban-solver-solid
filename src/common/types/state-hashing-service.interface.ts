import { BlockType } from '../../board/types/block-type.enum';

export interface StateHashingService {
  hash: (state: BlockType[][]) => string;
}
