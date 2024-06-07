import { BlockType } from 'src/board/types/block-type.enum';
import { StateHashingService } from './types/state-hashing-service.interface';

export class StateHashing implements StateHashingService {
  // TODO: should replace with a better hashing logic
  hash(state: BlockType[][]) {
    return JSON.stringify(state);
  }
}
