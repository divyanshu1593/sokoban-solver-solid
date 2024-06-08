import { Individual } from './types/individual.type';
import { RecombinationService } from './types/recombination-service.interface';

export class Recombination implements RecombinationService {
  recombine(selectedIndividuals: Individual[]) {
    const newGen: Individual[] = [];

    for (let i = 0; i < selectedIndividuals.length; i++) {
      const offspring1 = this.makeOffspring(
        selectedIndividuals[i],
        selectedIndividuals[(i + 1) % selectedIndividuals.length],
      );
      const offspring2 = this.makeOffspring(
        selectedIndividuals[i],
        selectedIndividuals[(i + 2) % selectedIndividuals.length],
      );
      newGen.push(offspring1);
      newGen.push(offspring2);
    }

    return newGen;
  }

  private makeOffspring(parent1: Individual, parent2: Individual): Individual {
    if (parent1.length !== parent2.length)
      throw new Error('parents must be of same length');

    const offspring: Individual = [];
    for (let i = 0; i < parent1.length; i++) {
      if (Math.random() < 0.5) {
        offspring.push(parent1[i]);
      } else {
        offspring.push(parent2[i]);
      }
    }

    return offspring;
  }
}
