import { BlockType } from '../../board/types/block-type.enum';
import { Individual } from './individual.type';

export interface SelectionService {
  select: (
    population: Individual[],
    levels: Record<string, BlockType[][]>,
  ) => {
    selectedIndividuals: Individual[];
    bestIndividual: Individual;
  };
}
