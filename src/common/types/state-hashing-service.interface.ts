import { BlockType } from 'src/board/types/block-type.enum';

export interface StateHashingService {
  hash: (state: BlockType[][]) => string;
}
