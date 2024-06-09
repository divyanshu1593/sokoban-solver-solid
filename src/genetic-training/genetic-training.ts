import { randomUUID } from 'crypto';
import { Levels } from '../common/types/levels.type';
import { ComparisonService } from './types/comparison-service.interface';
import { GeneticTrainingRepositoryInterface } from './types/genetic-training-repository.interface';
import { GeneticTrainingService } from './types/genetic-training-service.interface';
import { Individual } from './types/individual.type';
import { MutationService } from './types/mutation-service.interface';
import { RecombinationService } from './types/recombination-service.interface';
import { SelectionService } from './types/selection-service.interface';

export class GeneticTraining implements GeneticTrainingService {
  constructor(
    private readonly selectionService: SelectionService,
    private readonly recombinationService: RecombinationService,
    private readonly mutationService: MutationService,
    private readonly geneticTrainingRepository: GeneticTrainingRepositoryInterface,
    private readonly comparisonService: ComparisonService,
  ) {}

  async train(
    population: Individual[],
    levels: Levels,
    maxWeightsLimit: number,
    mutationProbability: number,
    numberOfRounds: number,
    logging: boolean = true,
  ) {
    let currentCost = null;
    let currentIndividual = null;
    let currentPopulation = population;
    const currentSessionId = randomUUID();

    for (let i = 0; i < numberOfRounds; i++) {
      if (logging) console.log(`Round ${i} started`);

      const { currentRoundBestCost, currentRoundBestIndividual, population } =
        this.geneticRound(
          currentPopulation,
          levels,
          maxWeightsLimit,
          mutationProbability,
          currentCost,
          currentIndividual,
          logging,
        );

      currentCost = currentRoundBestCost;
      currentIndividual = currentRoundBestIndividual;
      currentPopulation = population;

      await this.geneticTrainingRepository.save({
        // TODO: check how this assertion can be avoided
        currentBestCost: currentCost as number[],
        currentBestIndividual: currentIndividual as Individual,
        population: currentPopulation,
        roundNumber: i,
        trainingSessionId: currentSessionId,
      });
    }
  }

  private geneticRound(
    population: Individual[],
    levels: Levels,
    maxWeightsLimit: number,
    mutationProbability: number,
    currentBestCost: number[] | null,
    currentBestIndividual: Individual | null,
    logging: boolean,
  ) {
    console.log('selection phase started');
    const { bestCost, bestIndividual, selectedIndividuals } =
      this.selectionService.select(population, levels);

    let currentRoundBestCost = bestCost;
    let currentRoundBestIndividual = bestIndividual;

    if (currentBestCost) {
      if (
        this.comparisonService.compareCosts(bestCost, currentBestCost) !== 1
      ) {
        currentRoundBestCost = currentBestCost;
        currentRoundBestIndividual = currentBestIndividual as Individual;
      }
    }

    if (logging) console.log('recombination phase started');
    const newGen = this.recombinationService.recombine(selectedIndividuals);

    if (logging) console.log('mutation phase started');
    const mutatedNewGen = this.mutationService.mutate(
      newGen,
      mutationProbability,
      maxWeightsLimit,
    );

    return {
      population: mutatedNewGen,
      currentRoundBestCost,
      currentRoundBestIndividual,
    };
  }
}
