import { Board } from './board/board';
import { levels } from './levels';
import {
  animationInstance,
  awayFromEmptyBoxHeuristicsInstance,
  boxAtValidPlaceHeuristicInstance,
  boxAverageDistanceHeuristicInstance,
  displayInstance,
  moveInstance,
  sameDirectionHeuristicInstance,
  searchInstance,
} from './singletons';

// initiating level 5
const board = new Board(levels.level5, displayInstance, moveInstance);

// finding solution to level 5
console.log('fining solution...');
const solution = searchInstance.search(
  board.state,
  [boxAtValidPlaceHeuristicInstance, 32],
  [boxAverageDistanceHeuristicInstance, 90],
  [awayFromEmptyBoxHeuristicsInstance, 36],
  [sameDirectionHeuristicInstance, 20],
);

// animating the solution to level 5
animationInstance.animate(board.state, solution);
