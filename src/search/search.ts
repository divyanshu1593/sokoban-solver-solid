import { BlockType } from '../board/types/block-type.enum';
import { SearchService } from './types/search-service.interface';
import { MoveDir } from '../board/types/move-direction.enum';
import { StateEvaluationService } from '../board/types/state-evaluation-service.interface';
import { HeuristicEvaluationService } from './types/heuristic-evaluation-service.interface';
import { StateHashingService } from '../common/types/state-hashing-service.interface';
import { MoveInfo } from './types/move-info.type';
import { MoveService } from '../board/types/move-service.interface';
import { Heuristic } from './heuristic';

export class Search implements SearchService {
  constructor(
    private readonly stateEvaluationService: StateEvaluationService,
    private readonly heuristicEvaluationService: HeuristicEvaluationService,
    private readonly stateHashingService: StateHashingService,
    private readonly moveService: MoveService,
  ) {}

  search(
    state: BlockType[][],
    ...heuristicsWithWeights: [Heuristic, number][]
  ) {
    const result = this.breadthFirstSearch(
      state,
      [],
      new Set(),
      ...heuristicsWithWeights,
    );

    if (result) return result;
    throw new Error('No possible solution were found');
  }

  private breadthFirstSearch(
    state: BlockType[][],
    movesMade: MoveDir[],
    visitedState: Set<string>,
    ...heuristicsWithWeights: [Heuristic, number][]
  ): MoveDir[] | null {
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
            ...heuristicsWithWeights,
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

      const result = this.breadthFirstSearch(
        stateClone,
        movesMadeClone,
        visitedState,
        ...heuristicsWithWeights,
      );

      if (result) return result;
    }
    return null;
  }
}
