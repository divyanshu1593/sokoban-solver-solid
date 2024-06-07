import { BlockType } from '../board/types/block-type.enum';
import { MoveDir } from '../board/types/move-direction.enum';
import { AnimationService } from './types/animation-service.interface';
import { DisplayService } from '../board/types/display-service.interface';
import { MoveService } from '../board/types/move-service.interface';
import * as createPrompt from 'prompt-sync';

export class Animation implements AnimationService {
  constructor(
    private readonly displayService: DisplayService,
    private readonly moveService: MoveService,
  ) {}

  animate(startingState: BlockType[][], moves: MoveDir[]) {
    const prompt = createPrompt({ sigint: true });
    const state = structuredClone(startingState);

    for (const move of moves) {
      console.clear();
      this.displayService.show(state);
      console.log();
      prompt('press enter to continue');
      this.moveService.move(state, move);
    }

    console.clear();
    this.displayService.show(state);
    console.log(moves.length);
  }
}
