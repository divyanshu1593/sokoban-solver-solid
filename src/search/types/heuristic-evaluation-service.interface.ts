import { Heuristic } from '../heuristic';
import { StateHistory } from './state-history.type';

export interface HeuristicEvaluationService {
  evaluate: (
    stateHistory: StateHistory,
    ...heuristicsWithWeights: [Heuristic, number][]
  ) => number;
}
