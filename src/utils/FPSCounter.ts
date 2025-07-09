import { Text } from 'pixi.js';

export class FPSCounter extends Text {
  private frameCount = 0;
  private elapsed = 0;
  private fps = 0;

  constructor() {
    super('FPS: 0', {
      fill: 'white',
      fontSize: 14,
      fontFamily: 'monospace'
    });

    this.x = 10;
    this.y = 10;
  }

  update(deltaMS: number) {
    this.frameCount++;
    this.elapsed += deltaMS;

    if (this.elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / this.elapsed);
      this.text = `FPS: ${this.fps}`;
      this.elapsed = 0;
      this.frameCount = 0;
    }
  }
}
