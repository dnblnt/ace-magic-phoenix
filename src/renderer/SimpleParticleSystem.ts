import { Container, Texture } from 'pixi.js';
import { SimpleParticle } from './SimpleParticle';

export interface ParticleEffectOptions {
	position?: { x: number, y: number };
	spawnInterval?: number;
	lifetime?: { min: number; max: number };
	velocity?: { x: number; y: number; variation: number };
	scale?: { min: number; max: number };
	speed?: number;
	maxCount?: number;
}

export class SimpleParticleSystem extends Container {
	private _particles: SimpleParticle[] = [];
	private _timeSinceLastSpawn = 0;
	private _options: Required<ParticleEffectOptions>;

	constructor(texture: Texture, options: ParticleEffectOptions = {}) {
		super();

		this._options = {
			position: options.position || { x: 400, y: 500 },
			spawnInterval: options.spawnInterval ?? 100,
			lifetime: options.lifetime || { min: 800, max: 1200 },
			velocity: options.velocity || { x: 0, y: -2, variation: 1 },
			scale: options.scale || { min: 0.5, max: 1 },
			speed: options.speed ?? 1,
			maxCount: options.maxCount ?? 10
		};

		for (let i = 0; i < this._options.maxCount; i++) {
			const p = new SimpleParticle(texture);
			this._particles.push(p);
			this.addChild(p);
		}
	}

	public update(delta: number = 1) {
		const deltaMS = delta * this._options.speed;
		this._timeSinceLastSpawn += deltaMS;

		if (this._timeSinceLastSpawn >= this._options.spawnInterval) {
			this._timeSinceLastSpawn = 0;
			const particle = this._particles.find(p => !p.visible);
			if (particle) {
				const { position, lifetime, velocity, scale, speed } = this._options;
				const lifetimeMs = lifetime.min + Math.random() * (lifetime.max - lifetime.min);
				const scaleVal = scale.min + Math.random() * (scale.max - scale.min);
				const vx = velocity.x + (Math.random() - 0.5) * velocity.variation * 2;
				const vy = velocity.y + (Math.random() - 0.5) * velocity.variation * 2;

				particle.init(position.x, position.y, {
					lifetime: lifetimeMs,
					velocity: { x: vx, y: vy },
					scale: scaleVal,
					speed: speed
				});
			}
		}

		for (const p of this._particles) {
			p.update(deltaMS);
		}
	}
}
