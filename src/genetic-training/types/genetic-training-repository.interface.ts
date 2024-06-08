import { Individual } from './individual.type';
import { UUID } from 'crypto';

export interface GeneticTrainingRepositoryInterface {
  save: (geneticRoundDetails: {
    trainingSessionId?: UUID | undefined;
    roundNumber: number;
    population: Individual[];
    currentBestIndividual: Individual;
    currentBestCost: number[];
  }) => Promise<UUID>;
}
