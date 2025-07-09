import { Application } from 'pixi.js';
import { SceneManager } from './resource/SceneManager';
import { MainMenu } from './scenes/MainMenu';
import { AceOfShadows } from './scenes/AceOfShadows';
import { MagicWords } from './scenes/MagicWords';
import { FPSCounter } from './utils/FPSCounter';
import './style.css';

// Create the PIXI Application
const app = new Application({
  // width: 1280,
  // height: 720,
  resizeTo: window,
  backgroundColor: 0x1099bb,
});

// Add canvas to the DOM
document.body.appendChild(app.view as HTMLCanvasElement);

// Add scenes to stage
SceneManager.init(app);
SceneManager.register('MainMenu', () => new MainMenu());
SceneManager.register('AceOfShadows', () => new AceOfShadows());
SceneManager.register('MagicWords', () => new MagicWords());
// SceneManager.register('PhoenixFlame', () => new PhoenixFlame());

// Load main menu initially
SceneManager.loadScene('MainMenu');

// Add FPS counter
const fpsCounter = new FPSCounter();
app.stage.addChild(fpsCounter);

// Add update ticker
app.ticker.add(() => {
  SceneManager.update(app.ticker.deltaMS);
  fpsCounter.update(app.ticker.deltaMS);
});