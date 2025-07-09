import { DialogueModel } from "./DialogueModel";
import { DialogueView } from "./DialogueView";

export class DialogueController {
	private _model = new DialogueModel();
	private _view = new DialogueView();

	async initialize(endpoint: string) {
		const data = await this.fetchDialogue(endpoint);
		this._model.setData(data);

		await this._view.loadAssets(this._model.emojis, this._model.avatars);
		const line = this._model.getCurrentLine();
		if (line) {
			this._view.showLine(line, this._model.avatars);
		}
	}

	public next() {
		const line = this._model.nextLine();
		if (line) {
			this._view.showLine(line, this._model.avatars);
		}
	}

	public getView() {
		return this._view;
	}

	private async fetchDialogue(endpoint: string) {
		const res = await fetch(endpoint);
		if (!res.ok) {
			throw new Error(`Failed to fetch dialogue: ${res.status}`);
		}

		const json = await res.json();
		return {
			dialogue: json.dialogue,
			emojies: json.emojies,
			avatars: json.avatars
		};
	}
}
