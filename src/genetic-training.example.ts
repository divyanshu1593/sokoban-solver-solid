import { Individual } from './genetic-training/types/individual.type';
import { levels } from './levels';
import {
  awayFromEmptyBoxHeuristicsInstance,
  boxAtValidPlaceHeuristicInstance,
  boxAverageDistanceHeuristicInstance,
  geneticTrainingInstance,
  sameDirectionHeuristicInstance,
} from './singletons';

const initWeights = [
  [60, 90, 50, 70],
  [100, 100, 100, 70],
  [0, 0, 0, 70],
  [30, 60, 10, 50],
  [80, 30, 50, 0],
  [90, 20, 60, 20],
  [40, 10, 70, 40],
  [30, 60, 80, 100],
  [50, 20, 10, 30],
  [30, 50, 40, 60],
];

const initPopulation: Individual[] = [];

for (const weight of initWeights) {
  const individual: Individual = [
    [boxAtValidPlaceHeuristicInstance, weight[0]],
    [boxAverageDistanceHeuristicInstance, weight[1]],
    [awayFromEmptyBoxHeuristicsInstance, weight[2]],
    [sameDirectionHeuristicInstance, weight[3]],
  ];

  initPopulation.push(individual);
}

void geneticTrainingInstance.train(initPopulation, levels, 100, 0.6, 100);
