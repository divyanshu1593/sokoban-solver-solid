import { BlockType } from './types/block-type.enum';
import { DisplayService } from './types/display-service.interface';

export class Display implements DisplayService {
  show(state: BlockType[][]) {
    for (const row of state) {
      const temp = [];
      for (const block of row) {
        if (block == BlockType.VALID_SPACE) {
          temp.push(991);
        } else if (block == BlockType.EMPTY_SPACE) {
          temp.push(32);
        } else if (block == BlockType.WALL) {
          temp.push(9608);
        } else if (block == BlockType.BOX_AT_EMPTY_SPACE) {
          temp.push(9633);
        } else if (block == BlockType.BOX_AT_VALID_SPACE) {
          temp.push(9632);
        } else if (
          block == BlockType.PLAYER_AT_EMPTY_SPACE ||
          block == BlockType.PLAYER_AT_VALID_SPACE
        ) {
          temp.push(64);
        }
        temp.push(32);
      }
      console.log(String.fromCharCode(...temp));
    }
  }
}
