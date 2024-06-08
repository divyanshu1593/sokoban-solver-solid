import { Levels } from '../common/types/levels.type';
import { SearchService } from '../search/types/search-service.interface';
import { Individual } from './types/individual.type';
import { SelectionService } from './types/selection-service.interface';

export class Selection implements SelectionService {
  constructor(private readonly searchService: SearchService) {}

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
      this.compareCosts(a[1], b[1]),
    );

    return {
      selectedIndividuals: sortedPopulationWithCost
        .slice(0, population.length / 2)
        .map((IndividualWithCost) => IndividualWithCost[0]),
      bestIndividual: sortedPopulationWithCost[0][0],
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

  private compareCosts(costArr1: number[], costArr2: number[]): -1 | 0 | 1 {
    if (costArr1.length !== costArr2.length)
      throw new Error('length of cost arrays must be equal');
    let cnt1 = 0;
    let cnt2 = 0;

    for (let i = 0; i < costArr1.length; i++) {
      if (costArr1[i] > costArr2[i]) {
        cnt1++;
      } else if (costArr2[i] > costArr1[i]) {
        cnt2++;
      }
    }

    if (cnt1 > cnt2) return 1;
    if (cnt1 === cnt2) return 0;
    return -1;
  }
}
