import { Display } from './board/display';
import { Move } from './board/move';
import { StateEvaluation } from './board/state-evaluation';
import { StateHashing } from './common/state-hashing';
import { BoxAtValidPlaceHeuristic } from './search/box-at-valid-place-heuristic';
import { HeuristicEvaluation } from './search/heuristic-evaluation';
import { Search } from './search/search';

export const displayInstance = new Display();
export const animationInstance = new Animation();
export const stateEvaluationInstance = new StateEvaluation();
export const moveInstance = new Move(stateEvaluationInstance);
export const boxAtValidPlaceHeuristicInstance = new BoxAtValidPlaceHeuristic();
export const heuristicEvaluationInstance = new HeuristicEvaluation();
export const stateHashingInstance = new StateHashing();
export const searchInstance = new Search(
  stateEvaluationInstance,
  heuristicEvaluationInstance,
  stateHashingInstance,
  moveInstance,
);
