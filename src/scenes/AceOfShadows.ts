import { Sprite, Texture, Assets } from 'pixi.js';
import { Scene } from '../resource/Scene';
import { TweenManager } from '../utils/TweenManager';
import { SceneManager } from '../resource/SceneManager';

const ASSET_PATHS = {
    skin: 'assets/skin_style.json',
};

export class AceOfShadows extends Scene {
    protected _tweenManager = new TweenManager();

    private _stacks: Sprite[][] = [];
    private _stackPositions: { x: number; y: number }[] = [];
    private _cardTextures: Texture[] = [];

    private _timeSinceLastMove = 0;
    private _speed = 1;

    private readonly _cardsInDeck = 144;
    private _totalStacks = 12;
    private _roundRobinIndex = 1;

    public async start() {
        await Assets.load(Object.values(ASSET_PATHS));
        const style = Assets.get(ASSET_PATHS.skin);

        this.loadStackPositions();
        await this.loadCardTextures();
        this.createDeck();

        this.sortableChildren = true;

        await this.addBackBtn('Back', 20, 20, () => SceneManager.loadScene('MainMenu'), style.defaultBtn);
    }

    public update(delta: number): void {
        this._timeSinceLastMove += delta;
        this._tweenManager.update(delta * this._speed);

        if (this._timeSinceLastMove >= 500 / this._speed) {
            this._timeSinceLastMove = 0;
            this.dealCard();
        }
    }

    private loadStackPositions(): void {
        for (let i = 0; i < this._totalStacks; i++) {
            const x = 80 + i * 60;
            const y = 100;
            this._stackPositions.push({ x, y });
            this._stacks.push([]);
        }
    }

    private async loadCardTextures() {
        const suits = ['diamonds', 'hearts', 'clubs', 'spades'];
        const values = [
            'A', '02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K'
        ];

        const texturePaths: string[] = [];

        for (const suit of suits) {
            for (const value of values) {
                texturePaths.push(`assets/cards/card_${suit}_${value}.png`);
            }
        }

        await Assets.load(texturePaths);
        this._cardTextures = texturePaths.map(path => Assets.get<Texture>(path));
    }

    private createDeck(): void {
        const cardsPerSet = this._cardTextures.length;
        const tintBatch = [0xffffff, 0x66ccff, 0xff6666];

        for (let j = 0; j < this._cardsInDeck; j++) {
            const textureIndex = j % cardsPerSet;
            const batchIndex = Math.floor(j / cardsPerSet); // 0, 1, 2...
            const tint = tintBatch[batchIndex] ?? 0xffffff;

            const sprite = new Sprite(this._cardTextures[textureIndex]);
            sprite.tint = tint;

            sprite.width = 50;
            sprite.height = 70;
            sprite.x = this._stackPositions[0].x;
            sprite.y = this._stackPositions[0].y + j * 2;
            sprite.zIndex = j;

            this.addChild(sprite);
            this._stacks[0].push(sprite);
        }
    }

    private dealCard(): void {
        const deck = this._stacks[0];
        if (deck.length === 0) {
            return;
        }

        const card = deck.pop();
        if (!card) {
            return;
        }

        const toIndex = this._roundRobinIndex;
        this._roundRobinIndex++;
        if (this._roundRobinIndex >= this._totalStacks) {
            this._roundRobinIndex = 1;
        }

        const toStack = this._stacks[toIndex];
        const { x, y } = this._stackPositions[toIndex];
        const newY = y + toStack.length * 2;

        card.zIndex = 9999;

        this._tweenManager.move(card, { x, y: newY }, 1000 / this._speed, () => {
            card.zIndex = toStack.length;
            toStack.push(card);
        });
    }

    public onDestroy(): void {
        this.removeChildren();
    }
}
