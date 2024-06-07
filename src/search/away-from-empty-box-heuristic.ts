import { Heuristic } from './heuristic';
import { HeuristicDetails } from './types/heuristic-details';

export class AwayFromEmptyBoxHeuristics extends Heuristic {
  evaluate(details: HeuristicDetails) {
    const { isCurrentlyAdjacentToEmptyBox, isPreviouslyAdjacentToEmptyBox } =
      details;

    // going away from unplaced box
    let awayFromBoxEval;
    if (isPreviouslyAdjacentToEmptyBox) {
      if (isCurrentlyAdjacentToEmptyBox) {
        awayFromBoxEval = 10;
      } else {
        awayFromBoxEval = 1;
      }
    } else {
      awayFromBoxEval = 5;
    }
    return awayFromBoxEval;
  }
}
