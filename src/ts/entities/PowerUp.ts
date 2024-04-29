import { Coords, Velocity } from '../types'
import gsap from 'gsap'
import imgUrl from '../../assets/img/lightningBolt.png'

export class PowerUp {
  coords: Coords
  velocity: Velocity
  image: HTMLImageElement
  alpha: number
  radians: number

  constructor({ coords, velocity }: { coords: Coords; velocity: Velocity }) {
    this.coords = coords
    this.velocity = velocity

    // load image
    this.image = new Image()

    this.alpha = 1
    gsap.to(this, {
      alpha: 0,
      duration: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    })

    this.radians = 0
  }

  public draw = (c: CanvasRenderingContext2D) => {
    c.save()
    c.globalAlpha = this.alpha
    c.translate(
      this.coords.x + this.image.width / 2,
      this.coords.y + this.image.height / 2
    )
    c.rotate(this.radians)
    c.translate(
      -this.coords.x - this.image.width / 2,
      -this.coords.y - this.image.height / 2
    )
    this.image.onload = () =>
      c.drawImage(this.image, this.coords.x, this.coords.y)

    this.image.src = imgUrl

    c.restore()
  }

  public update = (c: CanvasRenderingContext2D) => {
    this.draw(c)
    this.radians += 0.01
    this.coords.x += this.velocity.x
  }
}
