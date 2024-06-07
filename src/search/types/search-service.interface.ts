import { BlockType } from 'src/board/types/block-type.enum';
import { MoveDir } from 'src/board/types/move-direction.enum';
import { Heuristic } from '../heuristic';

export interface SearchService {
  search: (
    state: BlockType[][],
    ...heuristicsWithWeights: [Heuristic, number][]
  ) => MoveDir[];
}
