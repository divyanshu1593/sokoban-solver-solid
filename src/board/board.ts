import { BlockType } from './types/block-type.enum';
import { DisplayService } from './types/display-service.interface';

export class Board {
  constructor(
    private readonly initState: BlockType[][],
    private readonly display: DisplayService,
  ) {}

  show() {
    this.display.show(this.initState);
  }
}
