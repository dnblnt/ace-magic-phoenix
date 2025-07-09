import { Container } from "pixi.js";

export abstract class Scene extends Container {
    public start?(): void;
    public onDestroy?(): void;
    public update?(delta?: number): void;
}