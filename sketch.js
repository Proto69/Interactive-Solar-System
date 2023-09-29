// Planet textures website -> https://planetpixelemporium.com/earth.html
// Changeable variables !!!

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let sunRadius = 200;
let totalPlanets = 2;
let starsNum = 2000;
let maxZ = 2000;
let minZ = -2000;
let scale = 100;
let sphereRadius = 5500; // Radius of the imaginary sphere
let asteroidsCount = 600;
let aMin = 0.4;
let aMax = 1.5;

// Buttons

let pauseButton;
let sliderGroup = [];
let resetButtons = [];
let labels = [];

// Not changeable variables !!!

let asteroidsArray = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
let h = 70;
let sliderLabels;
let textureArray = new Array(10);
let stars = [];
let sun;
let cam;
let sunTexture;
let play = true;



function preload() {
  sunTexture = loadImage("sun.jpg");

  sliderLabels = [
    "X Position: ",
    "Y Position: ",
    "Z Position: ",
    "Center X: ",
    "Center Y: ",
    "Center Z: ",
    "Orbit speed: ",
  ];

  fillTextureArray();
}

// window.addEventListener("resize", adjustLayout);

function adjustLayout() {
  location.reload();
}


function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  drawControlPanel();
  generateStars(starsNum);

  createStar();
}

function draw() {
  background(0);
  drawStars();
  drawAsteroids();
  
  sun.show();
  sun.orbit(sliderGroup[6].value());
  cameraView();
}

function cameraView() {
  X = sliderGroup[0].value();
  Y = sliderGroup[1].value();
  Z = sliderGroup[2].value();
  centerX = sliderGroup[3].value();
  centerY = sliderGroup[4].value();
  centerZ = sliderGroup[5].value();
  camera(X, Y + 300, Z + 300, centerX, centerY, centerZ, 0, 1, 0);
}

function fillTextureArray() {
  textureArray[0] = loadImage("mercury.jpg");
  textureArray[1] = loadImage("venus.jpg");
  textureArray[2] = loadImage("earth.jpg");
  textureArray[3] = loadImage("mars.jpg");
  textureArray[4] = loadImage("jupiter.jpg");
  textureArray[5] = loadImage("saturn.jpg");
  textureArray[6] = loadImage("uranus.jpg");
  textureArray[7] = loadImage("neptune.jpg");
  textureArray[8] = loadImage("pluto.jpg");
  textureArray[9] = loadImage("moon.jpg");
}

function resetSlider(index) {
  return function () {
    if (index == 2) {
      sliderGroup[index].value(2000);
    } else {
      sliderGroup[index].value(0);
    }
  };
}

function createStar() {
  sun = new Planet(sunRadius, 0, 0, sunTexture);
  //sun.spawnChildPlanets(totalPlanets, 1);
  sun.spawnSolarSystem();
  spawnAsteroids();
}

function spawnAsteroids() {
  for (let i = 0; i < asteroidsCount; i++) {
    asteroidsArray[i] = new Asteroid(aMin, aMax);
  }
}

function drawPauseButton() {
      //TO DO: add max value for the width and space them further away

  pauseButton = createButton("Pause/Play");
  pauseButton.position(1030, height + 80);
  pauseButton.style(
    "height: 120px; width: 23.7%; align-items: center; background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB); border: 0; border-radius: 8px; box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px; box-sizing: border-box; color: #FFFFFF; display: flex; font-family: Phantomsans, sans-serif; font-size: 20px; justify-content: center; line-height: 1em; max-width: 100%; min-width: 140px; padding: 3px; text-decoration: none; user-select: none; -webkit-user-select: none; touch-action: manipulation; white-space: nowrap; cursor: pointer;");
  
  pauseButton.mousePressed(isPlaying);
}

function isPlaying() {
  play = !play;
}

function drawSliders() {
      //TO DO: add max value for the width and space them further away

  for (let i = 0; i < 7; i++) {
    if (i == 2) {
      sliderGroup[i] = createSlider(-4000, 4000, 2000);
    } else {
      sliderGroup[i] = createSlider(-4000, 4000, 0);
    }
    if (i < 3) {
      sliderGroup[i].position(25, height + i * 75 + 37);
    } else if (i >= 3 && i != 6) {
      sliderGroup[i].position(525, height + (i - 3) * 75 + 37);
    } else if (i == 6) {
      sliderGroup[i].position(1030, height + (i - 6) * 75 + 37);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].style("width: 17%; height: 20px;");
  }
}

function drawResetButtons() {
      //TO DO: add max value for the width and space them further away

  for (let i = 0; i < 7; i++) {
    resetButtons[i] = createButton("Reset");
    resetButtons[i].style(
      "align-items: center; background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB); border: 0; border-radius: 8px; box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px; box-sizing: border-box; color: #FFFFFF; display: flex; font-family: Phantomsans, sans-serif; font-size: 20px; justify-content: center; line-height: 1em; max-width: 100%; min-width: 60px; padding: 3px; text-decoration: none; user-select: none; -webkit-user-select: none; touch-action: manipulation; white-space: nowrap; cursor: pointer;");
    resetButtons[i].style("width: 6%; height: 48px");
    if (i < 3) {
      resetButtons[i].position(395, height + i * 75 + 5);
    } else if (i >= 3 && i != 6) {
      resetButtons[i].position(895, height + (i - 3) * 75 + 5);
    } else if (i == 6) {
      resetButtons[i].position(1395, height + (i - 6) * 75 + 5);
    }
    resetButtons[i].mousePressed(resetSlider(i));
  }
}

function drawLabels() {
      //TO DO: add max value for the width and space them further away

  for (let i = 0; i < 7; i++) {
    let label = createP(sliderLabels[i]);

    if (i < 3) {
      label.position(window.innerWidth * 0.096, height + i * 75 - 20);
    } else if (i >= 3 && i != 6) {
      label.position(655, height + (i - 3) * 75 - 20);
    } else {
      label.position(1150, height + (i - 6) * 75 - 20);
    }

    label.style("color: white; font-size: 24px;");
    labels.push(label);
  }
}

function drawControlPanel() {
  drawSliders();
  drawResetButtons();
  drawLabels();
  drawPauseButton();
}

function generateStars(numStars) {
  for (let i = 0; i < numStars; i++) {
    let theta = random(0, TWO_PI); // Random angle in spherical coordinates
    let phi = random(0, PI); // Random angle in spherical coordinates
    let radius = sphereRadius; // Sphere radius
    // Convert spherical coordinates to Cartesian coordinates
    let x = radius * sin(phi) * cos(theta);
    let y = radius * sin(phi) * sin(theta);
    let z = radius * cos(phi);

    stars.push({ x, y, z });
  }
}

function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let { x, y, z } = star;
    let starSize = map(z, 0, maxZ, 1, 2); // Adjust the range (5 to 10) for larger stars

    // Draw a star at the calculated 3D coordinates
    push();
    translate(x, y, z);
    fill(255);
    noStroke();
    sphere(starSize * 5); // Adjust the size of the star as needed
    pop();
  }
}

function drawAsteroids() {
  for (let i = 0; i < asteroidsCount; i++) {
    asteroidsArray[i].show();
    asteroidsArray[i].orbit(sliderGroup[6].value());
  }
}