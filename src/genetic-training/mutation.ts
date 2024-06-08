import { Individual } from './types/individual.type';
import { MutationService } from './types/mutation-service.interface';

export class Mutation implements MutationService {
  mutate(
    population: Individual[],
    mutationProbability: number,
    maxWeightLimit: number,
  ) {
    for (const individual of population) {
      this.applyMutation(individual, mutationProbability, maxWeightLimit);
    }

    return population;
  }

  private applyMutation(
    individual: Individual,
    mutationProbability: number,
    maxWeightLimit: number,
  ) {
    if (Math.random() <= mutationProbability) {
      const randomIndex = Math.floor(
        Math.random() * (individual.length - 1 + 1),
      );
      const randomValue = Math.floor(Math.random() * (maxWeightLimit + 1));
      individual[randomIndex][1] = randomValue;

      this.applyMutation(individual, mutationProbability, maxWeightLimit);
    }
  }
}
