
import { Assets } from 'pixi.js';
import { Scene } from '../resource/Scene';
import { SceneManager } from '../resource/SceneManager';
import { UIButton } from '../utils/UIButton';

const ASSET_PATHS = {
	skin: 'assets/skin_style.json',
	tile: 'assets/ui/tile_0018.png',
	font: 'assets/fonts/PressStart2P-Regular.ttf'
};

export class MainMenu extends Scene {

	public async start() {
		await Assets.load(Object.values(ASSET_PATHS));
		const style = Assets.get(ASSET_PATHS.skin);

		const aceOfShadowsBtn = this.createButton('AceOfShadows', 20, 50, style.defaultBtn);
		this.addChild(aceOfShadowsBtn);

		const magicWordsBtn = this.createButton('MagicWords', 20, 110, style.defaultBtn);
		this.addChild(magicWordsBtn);

		const phoenixFlameBtn = this.createButton('PhoenixFlame', 20, 170, style.defaultBtn);
		this.addChild(phoenixFlameBtn);
	}

	onDestroy(): void {
		this.removeChildren();
	}

	private createButton(scene: string, x: number, y: number, style: any): UIButton {
		const playButton = new UIButton(scene, style);
		playButton.x = x;
		playButton.y = y;
		playButton.onClick(() => {
			SceneManager.loadScene(scene);
		});
		return playButton;
	}
}