import { Heuristic } from './heuristic';
import { HeuristicEvaluationService } from './types/heuristic-evaluation-service.interface';
import { BlockType } from '../board/types/block-type.enum';
import {
  BoxPositions,
  HeuristicDetails,
  ValidPositions,
} from './types/heuristic-details';
import { StateHistory } from './types/state-history.type';
import { StateEvaluationService } from '../board/types/state-evaluation-service.interface';
import { MoveService } from '../board/types/move-service.interface';
import { MoveDir } from '../board/types/move-direction.enum';

export class HeuristicEvaluation implements HeuristicEvaluationService {
  constructor(
    private readonly stateEvaluationService: StateEvaluationService,
    private readonly moveService: MoveService,
  ) {}

  evaluate(
    stateHistory: StateHistory,
    ...heuristicsWithWeights: [Heuristic, number][]
  ) {
    let evaluation = 0;
    const allDetails = this.deriveAllDetails(stateHistory);

    for (const [heuristic, weight] of heuristicsWithWeights) {
      evaluation += heuristic.evaluate(allDetails) * weight;
    }

    return evaluation;
  }

  private deriveAllDetails(stateHistory: StateHistory): HeuristicDetails {
    const { currentState, movesHistory } = stateHistory;
    let numberOfBoxAtPosition = 0;
    const boxPositions: BoxPositions = [];
    const validPositions: ValidPositions = [];

    for (let i = 0; i < currentState.length; i++) {
      for (let j = 0; j < currentState[0].length; j++) {
        if (currentState[i][j] == BlockType.BOX_AT_EMPTY_SPACE) {
          boxPositions.push([i, j]);
        } else if (currentState[i][j] == BlockType.BOX_AT_VALID_SPACE) {
          numberOfBoxAtPosition += 1;
          boxPositions.push([i, j]);
          validPositions.push([i, j]);
        } else if (currentState[i][j] == BlockType.VALID_SPACE) {
          validPositions.push([i, j]);
        }
      }
    }

    const isCurrentlyAdjacentToEmptyBox =
      this.isAdjacentToEmptyBox(currentState);

    let previousState = null;
    if (movesHistory.length) {
      previousState = structuredClone(currentState);
      if (movesHistory.at(-1) == MoveDir.UP) {
        this.moveService.move(previousState, MoveDir.DOWN);
      } else if (movesHistory.at(-1) == MoveDir.LEFT) {
        this.moveService.move(previousState, MoveDir.RIGHT);
      } else if (movesHistory.at(-1) == MoveDir.RIGHT) {
        this.moveService.move(previousState, MoveDir.LEFT);
      } else if (movesHistory.at(-1) == MoveDir.DOWN) {
        this.moveService.move(previousState, MoveDir.UP);
      }
    }

    const isPreviouslyAdjacentToEmptyBox = previousState
      ? this.isAdjacentToEmptyBox(previousState)
      : false;

    const isInSameDir =
      movesHistory.length >= 2 && movesHistory.at(-1) === movesHistory.at(-2);

    return {
      numberOfBoxAtPosition,
      totalNumberOfBoxes: boxPositions.length,
      boxPositions,
      validPositions,
      numberOfRows: currentState.length,
      numberOfColumns: currentState[0].length,
      isCurrentlyAdjacentToEmptyBox,
      isPreviouslyAdjacentToEmptyBox,
      isInSameDir,
    };
  }

  private isAdjacentToEmptyBox(state: BlockType[][]) {
    const playerPos = this.stateEvaluationService.findPlayerPosition(state);
    if (
      state[playerPos.i + 1][playerPos.j] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i][playerPos.j + 1] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i - 1][playerPos.j] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i][playerPos.j - 1] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i - 1][playerPos.j - 1] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i - 1][playerPos.j + 1] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i + 1][playerPos.j - 1] == BlockType.BOX_AT_EMPTY_SPACE ||
      state[playerPos.i + 1][playerPos.j + 1] == BlockType.BOX_AT_EMPTY_SPACE
    ) {
      return true;
    }
    return false;
  }
}
