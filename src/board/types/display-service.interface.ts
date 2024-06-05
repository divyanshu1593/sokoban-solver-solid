import { BlockType } from './block-type.enum';

export interface DisplayService {
  show: (state: BlockType[][]) => void;
}
