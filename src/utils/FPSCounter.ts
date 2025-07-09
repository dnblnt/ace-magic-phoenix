import { Text } from 'pixi.js';

export class FPSCounter extends Text {
	private _frameCount = 0;
	private _elapsed = 0;
	private _fps = 0;

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
		this._frameCount++;
		this._elapsed += deltaMS;

		if (this._elapsed >= 1000) {
			this._fps = Math.round((this._frameCount * 1000) / this._elapsed);
			this.text = `FPS: ${this._fps}`;
			this._elapsed = 0;
			this._frameCount = 0;
		}
	}
}
