export type DialogueLine = {
	name: string;
	text: string;
};

export type EmojiData = {
	name: string;
	url: string;
};

export type AvatarData = {
	name: string;
	url: string;
	position: 'left' | 'right';
};

export class DialogueModel {
	public lines: DialogueLine[] = [];
	public emojis: EmojiData[] = [];
	public avatars: AvatarData[] = [];

	private _index = 0;

	public setData(data: {
		dialogue: DialogueLine[];
		emojies: EmojiData[];
		avatars: AvatarData[];
	}) {
		this.lines = data.dialogue;
		this.emojis = data.emojies;
		this.avatars = data.avatars;
		this._index = 0;
	}

	public getCurrentLine(): DialogueLine | null {
		return this.lines[this._index] ?? null;
	}

	public nextLine(): DialogueLine | null {
		if (this._index < this.lines.length - 1) {
			this._index++;
			return this.lines[this._index];
		}
		return null;
	}

	public isComplete(): boolean {
		return this._index >= this.lines.length - 1;
	}
}