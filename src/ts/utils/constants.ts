export type PlayerUpgrade = {
  scoreRequired: number
  upgradedAttack: number
}

export const PLAYER_UPGRADES: ReadonlyArray<PlayerUpgrade> = [
  {
    scoreRequired: 0,
    upgradedAttack: 1,
  },
  {
    scoreRequired: 1000,
    upgradedAttack: 2,
  },
  {
    scoreRequired: 5000,
    upgradedAttack: 3,
  },
  {
    scoreRequired: 20000,
    upgradedAttack: 4,
  },
]
