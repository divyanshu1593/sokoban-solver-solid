import { Heuristic } from './heuristic';
import { HeuristicEvaluationService } from './types/heuristic-evaluation-service.interface';
import { BlockType } from 'src/board/types/block-type.enum';
import {
  BoxPositions,
  HeuristicDetails,
  ValidPositions,
} from './types/heuristic-details';
import { StateHistory } from './types/state-history.type';

export class HeuristicEvaluation implements HeuristicEvaluationService {
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
    const { currentState } = stateHistory;
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

    return {
      numberOfBoxAtPosition,
      totalNumberOfBoxes: boxPositions.length,
      boxPositions,
      validPositions,
      numberOfRows: currentState.length,
      numberOfColumns: currentState[0].length,
    };
  }
}
