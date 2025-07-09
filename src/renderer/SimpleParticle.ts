import { Sprite, Texture } from 'pixi.js';

export class SimpleParticle extends Sprite {
	private _lifetime = 1000;
	private _age = 0;
	private _velocity = { x: 0, y: -1 };
	private _startScale = 1;
	private _speed = 1;

	constructor(texture: Texture) {
		super(texture);
		this.anchor.set(0.5);
		this.visible = false;
		this.alpha = 0;
	}

	public init(x: number, y: number, config: {
		lifetime: number,
		velocity: { x: number, y: number },
		scale: number,
		speed: number
	}) {
		this.position.set(x, y);
		this._lifetime = config.lifetime;
		this._age = 0;
		this._velocity = config.velocity;
		this._startScale = config.scale;
		this.scale.set(this._startScale);
		this._speed = config.speed;
		this.alpha = 1;
		this.visible = true;
	}

	public update(deltaMS: number) {
		if (!this.visible) {
            return;
        }
        
		this._age += deltaMS;
		if (this._age > this._lifetime) {
			this.visible = false;
			return;
		}

		const progress = this._age / this._lifetime;
		this.x += this._velocity.x * this._speed;
		this.y += this._velocity.y * this._speed;
		this.alpha = 1 - progress;
		this.scale.set(this._startScale * (1 - progress));
	}
}
