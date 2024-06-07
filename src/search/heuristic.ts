import { HeuristicDetails } from './types/heuristic-details';

export abstract class Heuristic {
  abstract evaluate(details: HeuristicDetails): number;
}
