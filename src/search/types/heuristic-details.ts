export type NumberOfBoxAtPosition = number;
export type TotalNumberOfBoxes = number;
export type BoxPositions = [number, number][];
export type ValidPositions = [number, number][];
export type NumberOfRows = number;
export type NumberOfColumns = number;

export type HeuristicDetails = {
  numberOfBoxAtPosition: NumberOfBoxAtPosition;
  totalNumberOfBoxes: TotalNumberOfBoxes;
  boxPositions: BoxPositions;
  validPositions: ValidPositions;
  numberOfRows: NumberOfRows;
  numberOfColumns: NumberOfColumns;
};
