import { Container, Sprite, Text, TextStyle, Texture } from 'pixi.js';

export class RichTextRenderer extends Container {
	constructor(
		rawText: string,
		emojiMap: Record<string, Texture>,
		style: Partial<TextStyle> = {}
	) {
		super();
		const parts = rawText.split(/({.*?})/g);
		let offsetX = 0;

		for (const part of parts) {
			const emojiMatch = part.match(/{(.*?)}/);
			if (emojiMatch) {
				const emoji = emojiMap[emojiMatch[1]];
				if (emoji) {
					const sprite = new Sprite(emoji);
					sprite.width = sprite.height = 24;
					sprite.x = offsetX;
					this.addChild(sprite);
					offsetX += sprite.width + 4;
					continue;
				}
			}

			const txt = new Text(part, style);
			txt.x = offsetX;
			this.addChild(txt);
			offsetX += txt.width;
		}
	}
}
