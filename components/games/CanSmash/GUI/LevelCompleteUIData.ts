export interface ILevelCompleteUIData {
  nextLevelTime: number;
  levelNum: number,
  levelScore: number,
  timeBonus: number,
  targetsHits: number,
  totalScore: number,
  nextLevel: number | undefined,
  nextLevelHitTargets: number | undefined
}
