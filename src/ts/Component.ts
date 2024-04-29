export default class Component {
  protected canvas: HTMLCanvasElement
  protected context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = this.getValidContext(canvas)
  }

  private getValidContext = (canvas: HTMLCanvasElement) => {
    const context = canvas?.getContext('2d')
    if (!context) throw new Error('could not retrieve canvas context')
    return context
  }
}
