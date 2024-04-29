import { Velocity } from '../types'

export class Circle {
  x: number
  y: number
  radius: number
  color: string

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  public draw = (c: CanvasRenderingContext2D) => {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
  }
}

export class MovingCircle extends Circle {
  velocity: Velocity

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocity: Velocity
  ) {
    super(x, y, radius, color)
    this.velocity = velocity
  }

  public update = (c: CanvasRenderingContext2D) => {
    this.draw(c)
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}
