import { BlockType } from './types/block-type.enum';
import { DisplayService } from './types/display-service.interface';
import { MoveDir } from './types/move-direction.enum';
import { MoveService } from './types/move-service.interface';

export class Board {
  constructor(
    readonly state: BlockType[][],
    private readonly displayService: DisplayService,
    private readonly moveService: MoveService,
  ) {}

  show() {
    this.displayService.show(this.state);
  }

  move(moveDir: MoveDir) {
    return this.moveService.move(this.state, moveDir);
  }
}
