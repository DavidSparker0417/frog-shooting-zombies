import { Coords, Point, Velocity } from '../types'
import { getVelocity, isColliding } from '../utils/utils'

export type EnemyMovementType = 'homing' | 'linear'

export class Enemy {
  x: number
  y: number
  movementType: EnemyMovementType
  totalHealth: number
  health: number
  radius: number
  color: string
  velocity: Velocity
  attackingIntervalId: number | null

  constructor({
    x,
    y,
    movementType,
    health,
    radius,
    color,
    velocity,
    attackingIntervalId
  }: {
    x: number
    y: number
    movementType?: EnemyMovementType
    health: number
    radius: number
    color: string
    velocity: Velocity
    attackingIntervalId?: number | null,
  }) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.health = health
    this.totalHealth = health

    if (movementType === undefined) {
      if (Math.random() < 0.3) {
        movementType = 'homing'
      } else {
        movementType = 'homing' //'linear'
      }
    }

    this.movementType = movementType
    this.attackingIntervalId = null
  }

  public static spawn = (canvasWidth: number, canvasHeight: number) => {
    const health = parseInt((Math.random() * 10 + 10).toFixed(0))
    const radius = health

    let oX
    let oY

    if (Math.random() < 0.5) {
      oX = Math.random() < 0.5 ? 0 - radius : canvasWidth + radius
      oY = Math.random() * canvasHeight
    } else {
      oX = Math.random() * canvasWidth
      oY = Math.random() < 0.5 ? 0 - radius : canvasHeight + radius
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`
    const velocity = getVelocity({
      oX,
      tX: canvasWidth / 2,
      oY,
      tY: canvasHeight / 2,
      speed: Math.random() * 2,
    })
    return new Enemy({ x: oX, y: oY, health, radius, color, velocity })
  }

  public draw = (c: CanvasRenderingContext2D) => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
  }

  public drawHealth = (c: CanvasRenderingContext2D) => {
    const fontSize = this.radius * 2

    c.font = `${fontSize}`
    c.textAlign = 'center'
    c.fillStyle = 'black'
    c.fillText(`${this.health}`, this.x, this.y + fontSize / 10)

    if (this.health === this.totalHealth)
      return;

    c.strokeStyle = 'cyan'
    c.lineWidth = 1.2
    c.beginPath()
    c.roundRect(this.x - this.radius,
      this.y - this.radius - 10,
      this.radius * 2, 6)
    c.stroke()

    const width = (this.radius * 2) * (this.health / this.totalHealth)
    c.beginPath()
    c.fillStyle = 'red'
    c.roundRect(this.x - this.radius,
      this.y - this.radius - 10,
      width, 6)
    c.fill()
  }

  public update = (c: CanvasRenderingContext2D, playerCoords: Coords) => {
    this.draw(c)
    this.drawHealth(c)

    // Add homing capability
    if (this.movementType === 'homing') {
      const { x, y } = playerCoords
      const angle = Math.atan2(y - this.y, x - this.x)
      const expectedPos: Point = { x: this.x + Math.cos(angle), y: this.y + Math.sin(angle), radius: this.radius }
      if (isColliding(expectedPos, { x: playerCoords.x, y: playerCoords.y, radius: 20 })) {
        this.velocity.x = 0;
        this.velocity.y = 0;
      } else {
        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)
      }
    }

    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }

  public setAttacking = (func: Function) => {
    if (this.attackingIntervalId !== null)
      return;
    this.attackingIntervalId = window.setInterval(() => {
      func()
    }, 500)
  }

  public clearAttacking = () => {
    if (this.attackingIntervalId === null) return
    window.clearInterval(this.attackingIntervalId)
    this.attackingIntervalId = null
  }
}
