import { Assets } from "pixi.js";
import { DialogueController } from "../dialogue/DialogueController";
import { Scene } from "../resource/Scene";
import { SceneManager } from "../resource/SceneManager";
import { SceneKeys } from "../constants/SceneKeys";

const ASSET_PATHS = {
	skin: 'assets/skin_style.json',
};

export class MagicWords extends Scene {

	private _dialogue = new DialogueController();

	public async start() {
		await Assets.load(Object.values(ASSET_PATHS));
		const style = Assets.get(ASSET_PATHS.skin);


		const view = this._dialogue.getView();
		view.position.set(50, 200);
		view.setSkinStyle(style.dialogue);
		await this._dialogue.initialize('https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords');
		view.eventMode = 'static';
		view.cursor = 'pointer';
		view.on('pointertap', () => {
			this._dialogue.next();
		});

		this.addChild(view);
		const mainMenu = SceneKeys.MAIN_MENU.id;
		await this.addBackBtn('Back', 20, 20, () => SceneManager.loadScene(mainMenu), style.defaultBtn);
	}

	public onDestroy(): void {
		this.removeChildren();
	}
}