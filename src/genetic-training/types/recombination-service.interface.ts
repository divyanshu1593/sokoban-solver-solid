import { Individual } from './individual.type';

export interface RecombinationService {
  recombine: (selectedIndividuals: Individual[]) => Individual[];
}
