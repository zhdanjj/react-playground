import { GridAnimation } from './GridAnimation';
import { AnimationRoundsFromCenter } from './classes/AnimationRoundsFromCenter';
import { AnimationRunningLine } from './classes/AnimationRunningLine';

export default {
  title: 'Grid Animation',
  component: GridAnimation,
}

export const RoundsFromCenter = () => <GridAnimation animation={AnimationRoundsFromCenter} />;
export const RunningLine = () => <GridAnimation animation={AnimationRunningLine} />;