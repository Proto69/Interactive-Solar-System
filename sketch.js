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

let a = 0;

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

window.addEventListener("resize", adjustLayout);

function adjustLayout() {
  location.reload();
 // canvasWidth = window.innerWidth;
 // canvasHeight = window.innerHeight;
 // a = 1;
 // setup();
 // a = 0;
 // console.log(`Screen width: ${canvasWidth}, Screen height: ${canvasHeight}`);
}


function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  if (a != 0)
  {
    deleteControlPanel(); 
  }
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
  pauseButton = createButton("Pause/Play");
  pauseButton.position(1025, height + 80);
  pauseButton.style(
    "height: 120px; width: 475px; border-radius: 25px; background: #59C7B4; font-size: 48px; font-family: Palatino Linotype;"
  );
  
  pauseButton.mousePressed(isPlaying);
}

function isPlaying() {
  play = !play;
}

function drawSliders() {
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
      sliderGroup[i].position(1025, height + (i - 6) * 75 + 37);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].style("width: 350px; height: 20px;");
  }
}

function drawResetButtons() {
  for (let i = 0; i < 7; i++) {
    resetButtons[i] = createButton("Reset");
    resetButtons[i].style(
      "font-family: Palatino Linotype; background: #59C7B4; border-radius: 5px; height: 48px; width: 100px; font-size: 30px"
    );
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
  
  for (let i = 0; i < 7; i++) {
    let label = createP(sliderLabels[i]);

    if (i < 3) {
      label.position(155, height + i * 75 - 20);
    } else if (i >= 3 && i != 6) {
      label.position(655, height + (i - 3) * 75 - 20);
    } else {
      label.position(1125, height + (i - 6) * 75 - 20);
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

function deleteControlPanel() {
  deleteSliders();
  deleteResetButtons();
  deleteLabels();
  deletePauseButton();
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


function deleteSliders() {
  for (let i = 0; i < 7; i++) {
      sliderGroup[i].remove();
  }
}

function deleteResetButtons() {
  for (let i = 0; i < 7; i++) {
    resetButtons[i].remove();
  }
}

function deleteLabels() {
  for (let i = 0; i < labels.length; i++) {
    labels[i].remove();
  }
}

function deletePauseButton() {
  pauseButton.remove();
}