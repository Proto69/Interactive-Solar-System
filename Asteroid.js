class Asteroid {
  constructor(aMin, aMax) {
    this.pos = createVector(random(width), random(height), random(-500, 500));
    this.r = random(aMin, aMax);
    this.vel = p5.Vector.random3D();
    this.distance = random(600, 800);
    this.angle = random(TWO_PI);
    this.orbitSpeed = 0.0076;
  }

  orbit(sliderValue) {
    if (play) {
      this.angle = this.angle + this.orbitSpeed + sliderValue * 0.0001;
    }
  }

  show() {
    push();

    fill(255);
    noStroke();
    rotate(this.angle);
    translate(this.distance - sunRadius, 0);

    // texture(loadImage('earth.jpg'));
    sphere(this.r);

    pointLight(255, 255, 255, 0, 0, 0);
    ambientLight(50);
    pop();
  }
}
