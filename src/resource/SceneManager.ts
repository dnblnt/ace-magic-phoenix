import type { Application } from "pixi.js";
import type { Scene } from "./Scene";

export class SceneManager {
    protected static _app: Application;
    protected static _currentScene: Scene;
    protected static _scenes = new Map<string, () => Scene>();

    public static init(app: Application) {
        this._app = app;
    }

    public static register(key: string, createFn: () => Scene) {
        if (this._scenes.has(key)) {
            console.warn(`Scene "${key}" is already registered.`);
            return;
        }

        this._scenes.set(key, createFn);
    }

    public static loadScene(key: string) {
        const createFn = this._scenes.get(key);

        if (!this._scenes.has(key) || !createFn) {
            console.warn(`Scene ${key} not found.`);
            return;
        }

        if (this._currentScene) {
            this._currentScene.onDestroy?.();
            this._app.stage.removeChild(this._currentScene);
        }

        const scene = createFn();
        this._currentScene = scene;

        scene.start?.();
        this._app.stage.addChild(scene);
    }

    public static update(deltaMS: number): void {
        this._currentScene?.update?.(deltaMS);
    }

    public static get current(): Scene | undefined{
        return this._currentScene;
    }
}