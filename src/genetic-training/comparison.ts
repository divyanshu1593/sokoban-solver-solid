import { ComparisonService } from './types/comparison-service.interface';

export class Comparison implements ComparisonService {
  compareCosts(costArr1: number[], costArr2: number[]) {
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
