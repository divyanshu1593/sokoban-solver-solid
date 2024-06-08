import { UUID, randomUUID } from 'crypto';
import { GeneticTrainingRepositoryInterface } from './types/genetic-training-repository.interface';
import { Individual } from './types/individual.type';
import * as fs from 'fs/promises';

export class GeneticTrainingRepository
  implements GeneticTrainingRepositoryInterface
{
  async save(geneticRoundDetails: {
    trainingSessionId?: UUID | undefined;
    roundNumber: number;
    population: Individual[];
    currentBestIndividual: Individual;
    currentBestCost: number[];
  }) {
    const {
      currentBestCost,
      currentBestIndividual,
      population,
      roundNumber,
      trainingSessionId,
    } = geneticRoundDetails;

    const currentSessionId = trainingSessionId
      ? trainingSessionId
      : randomUUID();

    await fs.appendFile(
      `trainingData-${currentSessionId}.txt`,
      `Round number: ${roundNumber}
      Population: ${JSON.stringify(population)}
      Current best Individuals: ${JSON.stringify(currentBestIndividual)}
      Current best cost: ${JSON.stringify(currentBestCost)}`,
    );

    return currentSessionId;
  }
}
