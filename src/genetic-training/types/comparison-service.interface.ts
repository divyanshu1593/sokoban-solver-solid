export interface ComparisonService {
  compareCosts: (costArr1: number[], costArr2: number[]) => -1 | 0 | 1;
}
