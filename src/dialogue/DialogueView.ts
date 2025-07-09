import { Container, Texture, Text, Sprite, TextStyle } from 'pixi.js';
import { RichTextRenderer } from '../renderer/RichTextRenderer';
import type { AvatarData, DialogueLine, EmojiData } from './DialogueModel';

export class DialogueView extends Container {
	private _emojiTextures: Record<string, Texture> = {};
	private _avatarTextures: Record<string, Texture> = {};

	private _style: {
		nameStyle: Partial<TextStyle>,
		textStyle: Partial<TextStyle>
	} = {
			nameStyle: {},
			textStyle: {}
		};

	async loadAssets(emojis: EmojiData[], avatars: AvatarData[]) {
		for (const emoji of emojis) {
			this._emojiTextures[emoji.name] = await Texture.fromURL(emoji.url);
		}

		for (const avatar of avatars) {
			this._avatarTextures[avatar.name] = await Texture.fromURL(avatar.url);
		}
	}

	public showLine(line: DialogueLine, avatars: AvatarData[]) {
		this.removeChildren();

		const avatarData = avatars.find(a => a.name.toLowerCase() === line.name.toLowerCase());
		const avatarTexture = avatarData ? this._avatarTextures[avatarData.name] : null;

		const isLeftAligned = avatarData?.position === 'left';

		const nameLabel = new Text(line.name, this._style.nameStyle);
		nameLabel.anchor.set(isLeftAligned ? 1 : 0, 1);
		nameLabel.x = isLeftAligned ? 200 : 800;
		nameLabel.y = 70;
		this.addChild(nameLabel);

		if (avatarData && avatarTexture) {
			const avatar = new Sprite(avatarTexture);
			avatar.width = avatar.height = 64;
			avatar.x = isLeftAligned ? 100 : 825;
			avatar.y = -20;
			this.addChild(avatar);
		}

		const renderer = new RichTextRenderer(line.text, this._emojiTextures, this._style.textStyle);
		renderer.position.set(70, 90);
		this.addChild(renderer);
	}

	public setSkinStyle(style: any) {
		this._style.nameStyle = style?.nameStyle || {};
		this._style.textStyle = style?.textStyle || {};
	}
}