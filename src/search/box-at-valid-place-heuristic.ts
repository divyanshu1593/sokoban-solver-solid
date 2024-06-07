import { Heuristic } from './heuristic';
import { HeuristicDetails } from './types/heuristic-details';

export class BoxAtValidPlaceHeuristic extends Heuristic {
  evaluate(details: HeuristicDetails) {
    const { numberOfBoxAtPosition, totalNumberOfBoxes } = details;

    // scaling the boxPlaced to fit in 1 to 10 range
    let scaledBoxPlaced = Math.trunc(
      (numberOfBoxAtPosition / totalNumberOfBoxes) * 10,
    );
    if (scaledBoxPlaced != 10) scaledBoxPlaced += 1;

    return scaledBoxPlaced;
  }
}
