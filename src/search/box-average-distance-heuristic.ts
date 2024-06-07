import { Heuristic } from './heuristic';
import { HeuristicDetails } from './types/heuristic-details';

export class BoxAverageDistanceHeuristic extends Heuristic {
  evaluate(details: HeuristicDetails) {
    const { boxPositions, validPositions, numberOfRows, numberOfColumns } =
      details;

    let averageDistanceSum = 0;

    for (const boxPos of boxPositions) {
      let distSum = 0;
      for (const validPos of validPositions) {
        distSum +=
          Math.max(boxPos[0], validPos[0]) - Math.min(boxPos[0], validPos[0]);
        distSum +=
          Math.max(boxPos[1], validPos[1]) - Math.min(boxPos[1], validPos[1]);
      }
      averageDistanceSum += distSum / validPositions.length;
    }

    const averageDistance = averageDistanceSum / boxPositions.length;

    // scaling the distance to fit in 1 to 10 range
    const maxPossibleDistance = numberOfRows - 1 + (numberOfColumns - 1);
    let scaledAverageDistance = Math.trunc(
      (averageDistance / maxPossibleDistance) * 10,
    );
    if (scaledAverageDistance != 10) scaledAverageDistance += 1;

    // inverting the scaledAverageDistance so that 1, 2, ..., 10 get converted to 10, 9, ..., 1
    scaledAverageDistance = (scaledAverageDistance - 11) * -1;
    return scaledAverageDistance;
  }
}
