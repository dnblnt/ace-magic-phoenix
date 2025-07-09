import { Container, NineSlicePlane, Text, Texture, Assets } from 'pixi.js';

type FontStyle = {
	fontFamily: string;
	fontSize: number;
	fill: string | number;
};

type ButtonStyle = {
	font?: FontStyle;
};

export class UIButton extends Container {
	private _background: NineSlicePlane;
	private _label: Text;

	constructor(
		text: string,
		style: ButtonStyle = {},
		options?: {
			texture?: Texture;
			width?: number;
			height?: number;
			padding?: number;
		}
	) {
		super();

		// Defaults
		const texture = options?.texture ?? Assets.get('assets/ui/tile_0018.png')!;
		const width = options?.width ?? 400;
		const height = options?.height ?? 60;
		const padding = options?.padding ?? 10;

		// Background
		this._background = new NineSlicePlane(texture, padding, padding, padding, padding);
		this._background.width = width;
		this._background.height = height;
		this.addChild(this._background);

		// Label
		this._label = new Text(text, {
			fontFamily: style.font?.fontFamily ?? 'Arial',
			fontSize: style.font?.fontSize ?? 20,
			fill: style.font?.fill ?? 0xffffff
		});
		this._label.anchor.set(0.5);
		this._label.x = width / 2;
		this._label.y = height / 2;
		this.addChild(this._label);

		this.eventMode = 'static';
		this.cursor = 'pointer';
	}

	public onClick(fn: () => void) {
		this.on('pointerdown', fn);
	}

	public setText(value: string) {
		this._label.text = value;
	}
}
