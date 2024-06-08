import { Individual } from './individual.type';

export interface MutationService {
  mutate: (
    population: Individual[],
    mutationProbability: number,
    maxWeightLimit: number,
  ) => Individual[];
}
