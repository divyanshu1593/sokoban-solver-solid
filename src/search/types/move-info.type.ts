import { MoveDir } from 'src/board/types/move-direction.enum';

export type MoveInfo = {
  dir: MoveDir;
  evaluation: number;
};
