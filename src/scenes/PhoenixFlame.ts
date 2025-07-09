import { Assets, Texture } from "pixi.js";
import { Scene } from "../resource/Scene";
import { SceneManager } from "../resource/SceneManager";
import { SimpleParticleSystem } from "../renderer/SimpleParticleSystem";

const ASSET_PATHS = {
	skin: 'assets/skin_style.json',
};

export class PhoenixFlame extends Scene {

	private _fire!: SimpleParticleSystem;

	public async start() {
		await Assets.load(Object.values(ASSET_PATHS));
		const style = Assets.get(ASSET_PATHS.skin);

		const texture = await Texture.fromURL('assets/particles/particle.png');
		this._fire = new SimpleParticleSystem(texture, {
			position: { x: 500, y: 500 },
			spawnInterval: 80,
			lifetime: { min: 600, max: 1000 },
			velocity: { x: 0, y: -2, variation: 0.8 },
			scale: { min: 0.4, max: 1 },
			speed: 1,
			maxCount: 10
		});
		this.addChild(this._fire);

		await this.addBackBtn('Back', 20, 20, () => SceneManager.loadScene('MainMenu'), style.defaultBtn);
	}

	public update(delta?: number): void {
		if (!this._fire) {
			return;
		}

		this._fire.update(delta);
	}

	public onDestroy(): void {
		this._fire?.destroy();
		this.removeChildren();
	}
}