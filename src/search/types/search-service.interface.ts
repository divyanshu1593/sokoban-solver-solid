import { BlockType } from '../../board/types/block-type.enum';
import { MoveDir } from '../../board/types/move-direction.enum';
import { Heuristic } from '../heuristic';

export interface SearchService {
  search: (
    state: BlockType[][],
    ...heuristicsWithWeights: [Heuristic, number][]
  ) => MoveDir[];
}
