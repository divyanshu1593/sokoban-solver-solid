import { BlockType } from './block-type.enum';
import { playerPositionDetails } from './player-position.type';

export interface StateEvaluationService {
  isDeadState: (state: BlockType[][]) => boolean;
  isFinalState: (state: BlockType[][]) => boolean;
  findPlayerPosition: (state: BlockType[][]) => playerPositionDetails;
}
