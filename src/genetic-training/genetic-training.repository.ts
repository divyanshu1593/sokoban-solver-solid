import { UUID, randomUUID } from 'crypto';
import { GeneticTrainingRepositoryInterface } from './types/genetic-training-repository.interface';
import { Individual } from './types/individual.type';
import * as fs from 'fs/promises';
import * as path from 'path';

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

    const trainingFolder = path.resolve('./trainingData');
    await this.makeDirectoryIfDoesNotExists(trainingFolder);
    await fs.appendFile(
      path.resolve(trainingFolder, `trainingData-${currentSessionId}.txt`),
      `Round number: ${roundNumber}
      Population: ${JSON.stringify(population)}
      Current best Individuals: ${JSON.stringify(currentBestIndividual)}
      Current best cost: ${JSON.stringify(currentBestCost)}
      
      `,
    );

    return currentSessionId;
  }

  private async makeDirectoryIfDoesNotExists(path: string) {
    try {
      await fs.mkdir(path);
    } catch (err) {
      if (err.code != 'EEXIST') throw err;
    }
  }
}
