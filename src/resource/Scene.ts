import { Container } from "pixi.js";
import { UIButton } from "../utils/UIButton";

export abstract class Scene extends Container {
    public start?(): void;
    public onDestroy?(): void;
    public update?(delta?: number): void;

    protected async addBackBtn(text = 'Back', x = 20, y = 20, onClick: () => void, style?: any) {
        const btn = new UIButton(text, style);
        btn.position.set(x, y);
        btn.onClick(onClick);
        this.addChild(btn);
    }
}