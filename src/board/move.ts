import { StateEvaluation } from './state-evaluation';
import { BlockType } from './types/block-type.enum';
import { MoveDir } from './types/move-direction.enum';
import { MoveService } from './types/move-service.interface';

export class Move implements MoveService {
  constructor(private readonly stateEvaluation: StateEvaluation) {}

  move(state: BlockType[][], moveDir: MoveDir) {
    let a, b;
    if (moveDir == MoveDir.UP) {
      a = -1;
      b = 0;
    } else if (moveDir == MoveDir.LEFT) {
      a = 0;
      b = -1;
    } else if (moveDir == MoveDir.DOWN) {
      a = 1;
      b = 0;
    } else if (moveDir == MoveDir.RIGHT) {
      a = 0;
      b = 1;
    } else {
      throw new Error('Invalid moveDir');
    }

    const playerPos = this.stateEvaluation.findPlayerPosition(state);
    const cur = state[playerPos.i][playerPos.j];
    const nextInDir = state[playerPos.i + a][playerPos.j + b];

    if (
      nextInDir == BlockType.EMPTY_SPACE ||
      nextInDir == BlockType.VALID_SPACE
    ) {
      if (cur == BlockType.PLAYER_AT_EMPTY_SPACE) {
        state[playerPos.i][playerPos.j] = BlockType.EMPTY_SPACE;
      } else {
        state[playerPos.i][playerPos.j] = BlockType.VALID_SPACE;
      }
      if (nextInDir == BlockType.EMPTY_SPACE) {
        state[playerPos.i + a][playerPos.j + b] =
          BlockType.PLAYER_AT_EMPTY_SPACE;
      } else {
        state[playerPos.i + a][playerPos.j + b] =
          BlockType.PLAYER_AT_VALID_SPACE;
      }

      return true;
    }

    if (nextInDir == BlockType.WALL) {
      return false;
    }

    if (
      nextInDir == BlockType.BOX_AT_EMPTY_SPACE ||
      nextInDir == BlockType.BOX_AT_VALID_SPACE
    ) {
      const n2nInDir = state[playerPos.i + 2 * a][playerPos.j + 2 * b];
      if (
        n2nInDir == BlockType.EMPTY_SPACE ||
        n2nInDir == BlockType.VALID_SPACE
      ) {
        if (n2nInDir == BlockType.EMPTY_SPACE) {
          state[playerPos.i + 2 * a][playerPos.j + 2 * b] =
            BlockType.BOX_AT_EMPTY_SPACE;
        } else {
          state[playerPos.i + 2 * a][playerPos.j + 2 * b] =
            BlockType.BOX_AT_VALID_SPACE;
        }

        if (nextInDir == BlockType.BOX_AT_EMPTY_SPACE) {
          state[playerPos.i + a][playerPos.j + b] =
            BlockType.PLAYER_AT_EMPTY_SPACE;
        } else {
          state[playerPos.i + a][playerPos.j + b] =
            BlockType.PLAYER_AT_VALID_SPACE;
        }

        if (cur == BlockType.PLAYER_AT_EMPTY_SPACE) {
          state[playerPos.i][playerPos.j] = BlockType.EMPTY_SPACE;
        } else {
          state[playerPos.i][playerPos.j] = BlockType.VALID_SPACE;
        }

        return true;
      }

      return false;
    }
    throw new Error('unexpected behavior');
  }
}
