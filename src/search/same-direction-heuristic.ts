import { Heuristic } from './heuristic';
import { HeuristicDetails } from './types/heuristic-details';

export class SameDirectionHeuristic extends Heuristic {
  evaluate(details: HeuristicDetails) {
    const { isInSameDir } = details;

    if (isInSameDir) return 10;
    return 1;
  }
}
