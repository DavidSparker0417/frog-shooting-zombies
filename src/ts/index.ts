import Game from './Game'
import HUD from './HUD'
import { butcher, listen } from 'butcherjs'
import Player from './entities/Player'
import { Coords } from './types'

type State = {
  stats: {
    score: number
    projectiles: number
    eliminations: number
    deaths: number
    time: number
  }
  shootingIntervalId?: number
  intervalId?: number
  player: Player | null
  weaponCoord: Coords,
  isShooting: boolean
}

const restartBtn = document.querySelector('#restartBtn')!
const canvasEl = document.querySelector('canvas')!

export const defaultState: State = {
  stats: {
    score: 0,
    projectiles: 0,
    eliminations: 0,
    deaths: 0,
    time: 0,
  },
  shootingIntervalId: undefined,
  intervalId: undefined,
  player: null,
  weaponCoord: {x: 0, y: 0},
  isShooting: false
}

// initialize state
export const state = butcher({
  meat: defaultState,
  name: 'state',
})
;(() => {
  const canvas = document.querySelector('canvas')

  if (!canvas) throw new Error('could not retrieve canvas element')

  const game = new Game(canvas!)
  const hud = new HUD(canvas!)
  state.isShooting = false

  let player = state.player!
  listen(state, 'player', () => {
    player = state.player!
  })

  if (player == null) {
    return
  }

  canvasEl.addEventListener('click', event => {
    const { clientX, clientY } = event
    const { x, y } = player

    if (Game.getGameStatus() === 'up') {
      game.shootProjectile({ x, y }, { x: clientX, y: clientY })
    }
  })

  addEventListener('mousedown', event => {
    state.isShooting = true
  })

  addEventListener('mouseup', event => {
    state.isShooting = false
  })

  addEventListener('mousemove', event => {
    const curPos = {x: event.clientX, y: event.clientY}
    const playerPos: Coords = {x: player.x, y: player.y}
    game.mouse.position = curPos

    const rotation = Math.atan2(curPos.y - playerPos.y, curPos.x - playerPos.x)
    player.angle = rotation
    if (Game.getGameStatus() === 'up' && state.isShooting) {
      state.weaponCoord = curPos
    }
    // if (Game.getGameStatus() === 'up' && state.isShooting ) {
    //   game.shootProjectile(playerPos, curPos)
    // }
  })

  addEventListener('keydown', event => {
    const velocity = 5;
    switch (event.code) {
      case 'KeyD':
      case 'ArrowRight':
        player.velocity.x = velocity
        break
      case 'KeyA':
      case 'ArrowLeft':
        player.velocity.x = -velocity
        break
      case 'KeyW':
      case 'ArrowUp':
        player.velocity.y = -velocity
        break
      case 'KeyS':
      case 'ArrowDown':
        player.velocity.y = velocity
        break
      case 'Escape':
        if (game.gameStatus === 'paused') {
          game.resume()
          game.gameStatus = 'up'
        } else {
          game.stop()
          game.gameStatus = 'paused'
        }
        break
      case 'Tab':
        game.restart()
        break
      default:
        break
    }
  })

  addEventListener('keyup', event => {
    switch (event.code) {
      case 'KeyD':
      case 'ArrowRight':
        player.velocity.x = 0
        break
      case 'KeyA':
      case 'ArrowLeft':
        player.velocity.x = 0
        break
      case 'KeyW':
      case 'ArrowUp':
        player.velocity.y = 0
        break
      case 'KeyS':
      case 'ArrowDown':
        player.velocity.y = 0
        break
      default:
        break
    }
  })

  game.animate()
  game.spawnEnemies()
  game.spawnPowerUps()
  hud.animate()

  restartBtn.addEventListener('click', () => {
    game.restart()
    hud.restart()
  })
})()
