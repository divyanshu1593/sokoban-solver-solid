import { BlockType } from 'src/board/types/block-type.enum';
import { SearchService } from './types/search-service.interface';
import { MoveDir } from 'src/board/types/move-direction.enum';
import { StateEvaluationService } from 'src/board/types/state-evaluation-service.interface';
import { HeuristicEvaluationService } from './types/heuristic-evaluation-service.interface';
import { StateHashingService } from 'src/common/types/state-hashing-service.interface';
import { MoveInfo } from './types/move-info.type';
import { MoveService } from 'src/board/types/move-service.interface';
import { BoxAtValidPlaceHeuristic } from './box-at-valid-place-heuristic';
import { Weights } from './types/weights.type';

export class Search implements SearchService {
  constructor(
    private readonly stateEvaluationService: StateEvaluationService,
    private readonly heuristicEvaluationService: HeuristicEvaluationService,
    private readonly stateHashingService: StateHashingService,
    private readonly moveService: MoveService,
    private readonly boxAtValidPlaceHeuristic: BoxAtValidPlaceHeuristic,
  ) {}

  search(state: BlockType[][]) {
    const result = this.breadthFirstSearch(state, [], new Set(), {
      boxAtValidPlaceWeight: 32,
    });

    if (result) return result;
    throw new Error('No possible solution were found');
  }

  private breadthFirstSearch(
    state: BlockType[][],
    movesMade: MoveDir[],
    visitedState: Set<string>,
    weights: Weights,
  ): MoveDir[] | null {
    const { boxAtValidPlaceWeight } = weights;
    if (this.stateEvaluationService.isFinalState(state)) return movesMade;
    if (this.stateEvaluationService.isDeadState(state)) return null;

    const hashedState = this.stateHashingService.hash(state);
    if (visitedState.has(hashedState)) return null;
    visitedState.add(hashedState);

    const possibleMoves: MoveInfo[] = [];
    for (const dir of Object.values(MoveDir)) {
      const stateClone = structuredClone(state);

      if (this.moveService.move(stateClone, dir)) {
        possibleMoves.push({
          dir,
          evaluation: this.heuristicEvaluationService.evaluate(
            {
              currentState: stateClone,
              movesHistory: movesMade,
            },
            [this.boxAtValidPlaceHeuristic, boxAtValidPlaceWeight],
          ),
        });
      }
    }

    possibleMoves.sort((a, b) => b.evaluation - a.evaluation);

    for (const move of possibleMoves) {
      const stateClone = structuredClone(state);
      const movesMadeClone = structuredClone(movesMade);

      this.moveService.move(stateClone, move.dir);
      movesMadeClone.push(move.dir);

      return this.breadthFirstSearch(
        stateClone,
        movesMadeClone,
        visitedState,
        weights,
      );
    }
    return null;
  }
}
