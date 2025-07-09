import * as PIXI from 'pixi.js';

// Create the PIXI Application
const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});

// Add canvas to the DOM
document.body.appendChild(app.view as HTMLCanvasElement);