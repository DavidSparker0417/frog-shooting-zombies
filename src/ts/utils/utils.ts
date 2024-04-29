import { Point, Velocity } from '../types'

export const getRandomInt = (min: number, max: number): number => {
  const randMin = Math.ceil(min)
  const randMax = Math.floor(max)
  return Math.floor(Math.random() * (randMax - randMin) + randMin) //The maximum is exclusive and the randMinimum is
}

export const getVelocity = ({
  oX,
  tX,
  oY,
  tY,
  speed = 1,
}: {
  oX: number
  tX: number
  oY: number
  tY: number
  speed?: number
}): Velocity => {
  const angle = Math.atan2(tY - oY, tX - oX)
  return {
    x: Math.cos(angle) * speed,
    y: Math.sin(angle) * speed,
  }
}

export const getDistance = (p1: Point, p2: Point): number => {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

export const isColliding = (p1: Point, p2: Point): boolean => {
  return getDistance(p1, p2) - p1.radius - p2.radius < 1
}
