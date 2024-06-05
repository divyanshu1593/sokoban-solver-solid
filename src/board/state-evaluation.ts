import { BlockType } from './types/block-type.enum';
import { StateEvaluationService } from './types/state-evaluation-service.interface';

export class StateEvaluation implements StateEvaluationService {
  findPlayerPosition(state: BlockType[][]) {
    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[0].length; j++) {
        if (
          state[i][j] == BlockType.PLAYER_AT_EMPTY_SPACE ||
          state[i][j] == BlockType.PLAYER_AT_VALID_SPACE
        ) {
          return { i, j };
        }
      }
    }

    throw new Error('Player not present');
  }

  isFinalState(state: BlockType[][]) {
    for (const row of state) {
      for (const block of row) {
        if (
          block == BlockType.VALID_SPACE ||
          block == BlockType.PLAYER_AT_VALID_SPACE
        )
          return false;
      }
    }
    return true;
  }

  isDeadState(state: BlockType[][]) {
    for (let i = 0; i < state.length - 1; i++) {
      for (let j = 0; j < state[0].length - 1; j++) {
        if (
          state[i][j] == BlockType.WALL ||
          state[i][j] == BlockType.BOX_AT_EMPTY_SPACE ||
          state[i][j] == BlockType.BOX_AT_VALID_SPACE
        ) {
          let flag = false;
          let t1, t2, t3;

          if (state[i][j] == BlockType.BOX_AT_EMPTY_SPACE) {
            flag = true;
          }

          if (state[i + 1][j] == BlockType.BOX_AT_EMPTY_SPACE) {
            flag = true;
            t1 = true;
          } else if (
            state[i + 1][j] == BlockType.BOX_AT_VALID_SPACE ||
            state[i + 1][j] == BlockType.WALL
          ) {
            t1 = true;
          }

          if (state[i][j + 1] == BlockType.BOX_AT_EMPTY_SPACE) {
            flag = true;
            t2 = true;
          } else if (
            state[i][j + 1] == BlockType.WALL ||
            state[i][j + 1] == BlockType.BOX_AT_VALID_SPACE
          ) {
            t2 = true;
          }

          if (state[i + 1][j + 1] == BlockType.BOX_AT_EMPTY_SPACE) {
            flag = true;
            t3 = true;
          } else if (
            state[i + 1][j + 1] == BlockType.WALL ||
            state[i + 1][j + 1] == BlockType.BOX_AT_VALID_SPACE
          ) {
            t3 = true;
          }

          if (t1 && t2 && t3 && flag) return true;
        }
      }
    }
    return false;
  }
}
