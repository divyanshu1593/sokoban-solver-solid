export type NumberOfBoxAtPosition = {
  numberOfBoxAtPosition: number;
};

export type TotalNumberOfBoxes = {
  totalNumberOfBoxes: number;
};

export type HeuristicDetails = NumberOfBoxAtPosition & TotalNumberOfBoxes;
