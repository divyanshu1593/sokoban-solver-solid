import { Levels } from '../../common/types/levels.type';
import { Individual } from './individual.type';

export interface GeneticTrainingService {
  train: (
    population: Individual[],
    levels: Levels,
    maxWeightsLimit: number,
    mutationProbability: number,
    numberOfRounds: number,
  ) => void;
}
