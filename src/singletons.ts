import { Display } from './board/display';
import { Move } from './board/move';
import { StateEvaluation } from './board/state-evaluation';
import { StateHashing } from './common/state-hashing';
import { AwayFromEmptyBoxHeuristics } from './search/away-from-empty-box-heuristic';
import { BoxAtValidPlaceHeuristic } from './search/box-at-valid-place-heuristic';
import { BoxAverageDistanceHeuristic } from './search/box-average-distance-heuristic';
import { HeuristicEvaluation } from './search/heuristic-evaluation';
import { SameDirectionHeuristic } from './search/same-direction-heuristic';
import { Search } from './search/search';
import { Animation } from './common/animation';
import { Recombination } from './genetic-training/recombination';
import { Selection } from './genetic-training/selection';
import { Mutation } from './genetic-training/mutation';
import { GeneticTrainingRepository } from './genetic-training/genetic-training.repository';
import { Comparison } from './genetic-training/comparison';
import { GeneticTraining } from './genetic-training/genetic-training';

export const displayInstance = new Display();
export const stateEvaluationInstance = new StateEvaluation();
export const moveInstance = new Move(stateEvaluationInstance);
export const animationInstance = new Animation(displayInstance, moveInstance);
export const boxAtValidPlaceHeuristicInstance = new BoxAtValidPlaceHeuristic();
export const awayFromEmptyBoxHeuristicsInstance =
  new AwayFromEmptyBoxHeuristics();
export const boxAverageDistanceHeuristicInstance =
  new BoxAverageDistanceHeuristic();
export const sameDirectionHeuristicInstance = new SameDirectionHeuristic();
export const heuristicEvaluationInstance = new HeuristicEvaluation(
  stateEvaluationInstance,
  moveInstance,
);
export const stateHashingInstance = new StateHashing();
export const searchInstance = new Search(
  stateEvaluationInstance,
  heuristicEvaluationInstance,
  stateHashingInstance,
  moveInstance,
);
export const comparisonInstance = new Comparison();
export const selectionInstance = new Selection(
  searchInstance,
  comparisonInstance,
);
export const recombinationInstance = new Recombination();
export const mutationInstance = new Mutation();
export const geneticTrainingRepositoryInstance =
  new GeneticTrainingRepository();
export const geneticTrainingInstance = new GeneticTraining(
  selectionInstance,
  recombinationInstance,
  mutationInstance,
  geneticTrainingRepositoryInstance,
  comparisonInstance,
);
