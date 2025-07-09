import { Application } from 'pixi.js';
import { SceneManager } from './resource/SceneManager';
import { MainMenu } from './scenes/MainMenu';
import { AceOfShadows } from './scenes/AceOfShadows';
import { MagicWords } from './scenes/MagicWords';
import { PhoenixFlame } from './scenes/PhoenixFlame';
import { FPSCounter } from './utils/FPSCounter';
import { SceneKeys } from './constants/SceneKeys';
import './style.css';

// Create the PIXI Application
const app = new Application({
	resizeTo: window,
	backgroundColor: 0x1099bb,
});

// Add canvas to the DOM
document.body.appendChild(app.view as HTMLCanvasElement);

// Add scenes to stage
SceneManager.init(app);
SceneManager.register(SceneKeys.MAIN_MENU.id, () => new MainMenu());
SceneManager.register(SceneKeys.ACE_OF_SHADOWS.id, () => new AceOfShadows());
SceneManager.register(SceneKeys.MAGIC_WORDS.id, () => new MagicWords());
SceneManager.register(SceneKeys.PHOENIX_FLAME.id, () => new PhoenixFlame());

// Load main menu initially
SceneManager.loadScene(SceneKeys.MAIN_MENU.id);

// Add FPS counter
const fpsCounter = new FPSCounter();
app.stage.addChild(fpsCounter);

// Add update ticker
app.ticker.add(() => {
	SceneManager.update(app.ticker.deltaMS);
	fpsCounter.update(app.ticker.deltaMS);
});