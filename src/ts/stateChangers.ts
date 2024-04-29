import { defaultState, state } from './index'
import Game from './Game'

export const updateScore = (score: number): void => {
  state.stats = {
    ...state.stats,
    score: state.stats.score + score,
  }
}

export const updateProjectileCount = (projectiles?: number): void => {
  if (projectiles == null) projectiles = 1
  state.stats = {
    ...state.stats,
    projectiles: state.stats.projectiles + projectiles,
  }
}

export const updateEliminationCount = (eliminations?: number): void => {
  if (eliminations == null) eliminations = 1
  state.stats = {
    ...state.stats,
    eliminations: state.stats.eliminations + eliminations,
  }
}

export const updateDeathCount = (): void => {
  state.stats = {
    ...state.stats,
    deaths: state.stats.deaths + 1,
  }
}

export const initializeState = (props: {
  canvasHeight: number
  canvasWidth: number
}) => {
  state.player = Game.createPlayer(props, {})
  state.stats = {
    ...defaultState.stats,
    deaths: state.stats.deaths + 1,
  }
}
