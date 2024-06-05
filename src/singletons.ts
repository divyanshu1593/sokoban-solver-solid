import { Display } from './board/display';
import { Move } from './board/move';
import { StateEvaluation } from './board/state-evaluation';

export const displayInstance = new Display();
export const stateEvaluationInstance = new StateEvaluation();
export const moveInstance = new Move(stateEvaluationInstance);
