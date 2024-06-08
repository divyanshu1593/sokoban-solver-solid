import { Levels } from '../common/types/levels.type';
import { SearchService } from '../search/types/search-service.interface';
import { ComparisonService } from './types/comparison-service.interface';
import { Individual } from './types/individual.type';
import { SelectionService } from './types/selection-service.interface';

export class Selection implements SelectionService {
  constructor(
    private readonly searchService: SearchService,
    private readonly comparisonService: ComparisonService,
  ) {}

  select(population: Individual[], levels: Levels) {
    if (population.length % 2 !== 0)
      throw new Error('number of individuals must b even');

    const populationWithCost: [Individual, number[]][] = population.map(
      (Individual) => [
        Individual,
        this.costOfIndividualOnLevels(Individual, levels),
      ],
    );

    const sortedPopulationWithCost = populationWithCost.sort((a, b) =>
      this.comparisonService.compareCosts(a[1], b[1]),
    );

    return {
      selectedIndividuals: sortedPopulationWithCost
        .slice(0, population.length / 2)
        .map((IndividualWithCost) => IndividualWithCost[0]),
      bestIndividual: sortedPopulationWithCost[0][0],
      bestCost: sortedPopulationWithCost[0][1],
    };
  }

  private costOfIndividualOnLevels(
    individual: Individual,
    levels: Levels,
  ): number[] {
    const costArr = [];

    for (const level of Object.values(levels)) {
      const moves = this.searchService.search(level, ...individual);
      costArr.push(moves.length);
    }

    return costArr;
  }
}
