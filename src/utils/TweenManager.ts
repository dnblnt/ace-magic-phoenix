import { Tween } from './Tween';

export class TweenManager {
	private _tweens: Tween[] = [];

	public update(deltaMS: number) {
		this._tweens = this._tweens.filter(tween => tween.update(deltaMS));
	}

	public add(tween: Tween) {
		this._tweens.push(tween);
	}

	public move(
		target: { x: number; y: number },
		to: { x: number; y: number },
		duration: number,
		onComplete?: () => void
	) {
		this.add(new Tween(target, to, duration, onComplete));
	}
}
