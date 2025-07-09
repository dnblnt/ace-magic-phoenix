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
  private background: NineSlicePlane;
  private label: Text;

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
    this.background = new NineSlicePlane(texture, padding, padding, padding, padding);
    this.background.width = width;
    this.background.height = height;
    this.addChild(this.background);

    console.log(style.font?.fontFamily);

    // Label
    this.label = new Text(text, {
      fontFamily: style.font?.fontFamily ?? 'Arial',
      fontSize: style.font?.fontSize ?? 20,
      fill: style.font?.fill ?? 0xffffff
    });
    this.label.anchor.set(0.5);
    this.label.x = width / 2;
    this.label.y = height / 2;
    this.addChild(this.label);

    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  onClick(fn: () => void) {
    this.on('pointerdown', fn);
  }

  setText(value: string) {
    this.label.text = value;
  }
}
