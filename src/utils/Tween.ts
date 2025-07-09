type TweenTarget = { x: number; y: number };

export class Tween {
	private _elapsed = 0;
	private readonly _from: { x: number; y: number };
	private readonly _to: { x: number; y: number };
	private readonly _duration: number;
	private readonly _target: TweenTarget;
	private readonly _onComplete?: () => void;

	constructor(
		target: TweenTarget,
		to: { x: number; y: number },
		duration: number,
		onComplete?: () => void
	) {
		this._target = target;
		this._from = { x: target.x, y: target.y };
		this._to = to;
		this._duration = duration;
		this._onComplete = onComplete;
	}

	public update(deltaMS: number): boolean {
		this._elapsed += deltaMS;
		const t = Math.min(this._elapsed / this._duration, 1);

		// Linear interpolation
		this._target.x = this._from.x + (this._to.x - this._from.x) * t;
		this._target.y = this._from.y + (this._to.y - this._from.y) * t;

		if (t >= 1) {
			this._onComplete?.();
			return false;
		}

		return true;
	}
}
