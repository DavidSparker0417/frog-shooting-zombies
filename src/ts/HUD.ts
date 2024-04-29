// extract the HUD
import { listen } from 'butcherjs'
import { state } from './index'
import Component from './Component'

const scoreStatEl = document.querySelector('#scoreStatEl')!
const elimsStatEl = document.querySelector('#elimsStatEl')!
const shotsStatEl = document.querySelector('#shotsStatEl')!
const deathsStatEl = document.querySelector('#deathsStatEl')!

export default class HUD extends Component {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
  }

  public restart = () => {
    scoreStatEl.innerHTML = '0'
    elimsStatEl.innerHTML = '0'
    shotsStatEl.innerHTML = '0'
  }

  public animate = () => {
    listen(state, 'stats', () => {
      scoreStatEl.innerHTML = `${state.stats.score}`
      deathsStatEl.innerHTML = `${state.stats.deaths}`
      elimsStatEl.innerHTML = `${state.stats.eliminations}`
      shotsStatEl.innerHTML = `${state.stats.projectiles}`
    })
  }
}
