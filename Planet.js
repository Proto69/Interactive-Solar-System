class Planet {
  constructor(r, d, o, img, name) {
    this.name = name;
    this.img = img;
    this.radius = r;
    this.distance = d;
    this.angle = random(TWO_PI);
    this.planetArray = new Array();
    this.orbitSpeed = o;
    this.vector = p5.Vector.random3D();
    this.vector.mult(this.distance);
  }

  show() {
    push();

    push();

    fill(255);
    noStroke();
    rotate(this.angle);
    translate(this.distance, 0);

    texture(this.img);
    sphere(this.radius);

    pop();

    pointLight(255, 255, 255, 0, 0, 0);
    ambientLight(50);
    if (this.planetArray != null) {
      for (let i = 0; i < this.planetArray.length; i++) {
        this.planetArray[i].show();
      }
    }

    pop();
  }

  spawnSolarSystem() {
    this.spawnPlanets();
  }

  spawnPlanets() {
    this.planetArray = new Array(9);

    this.planetArray[0] = new Planet(
      17.525 * 0.3,
      41.6 + sunRadius,
      0.0047,
      textureArray[0],
      "Mercury"
    );
    this.planetArray[1] = new Planet(
      43.465 * 0.3,
      77.73 + sunRadius,
      0.0078,
      textureArray[1],
      "Venus"
    );
    this.planetArray[2] = new Planet(
      45.76 * 0.3,
      107.5 + sunRadius,
      0.0107,
      textureArray[2],
      "Earth"
    );
    this.planetArray[3] = new Planet(
      24.35 * 0.3,
      163.7 + sunRadius,
      0.0086871,
      textureArray[3],
      "Mars"
    );
    this.planetArray[4] = new Planet(
      256 * 0.3,
      559.3 + sunRadius,
      0.0047051,
      textureArray[4],
      "Jupiter"
    );
    this.planetArray[5] = new Planet(
      209.225 * 0.3,
      1530 * 0.5 + sunRadius,
      0.0034821,
      textureArray[5],
      "Saturn"
    );
    this.planetArray[6] = new Planet(
      182.2 * 0.3,
      2067 * 0.5 + sunRadius,
      0.0024607,
      textureArray[6],
      "Uranus"
    );
    this.planetArray[7] = new Planet(
      176.9 * 0.3,
      3235 * 0.5 + sunRadius,
      0.00002,
      textureArray[7],
      "Neptune"
    );
    this.planetArray[8] = new Planet(
      8.52 * 0.3,
      4220 * 0.5 + sunRadius,
      0.00167633,
      textureArray[8],
      "Pluto"
    );
  }

  orbit(sliderValue) {
    if (play) {
      this.angle = this.angle + this.orbitSpeed + sliderValue * 0.0001;

      if (this.planetArray != null) {
        for (let i = 0; i < this.planetArray.length; i++) {
          this.planetArray[i].orbit(sliderValue);
        }
      }
    }
  }

  /*
  generatePlanet(generation, index) {
    let childPlanetRadius =
      this.radius / (generation * 2 + random(0, generation * 2));

    let minDistance = this.radius + this.radius * 0.3;
    let maxDistance = this.radius + this.radius * 0.8;
    let childPlanetDistance = random(minDistance, maxDistance);

    let orbitSpeed = random(-0.06, 0.06);

    this.planetArray[index] = new Planet(
      childPlanetRadius,
      childPlanetDistance / generation,
      orbitSpeed,
      textureArray[9],
      "Name " + index
    );
  }

  spawnChildPlanets(total, generation) {
    this.planetArray = new Array(total);

    for (let i = 0; i < this.planetArray.length; i++) {
      this.generatePlanet(generation, i);

      if (generation < 3) {
        let moons = int(random(0, 4));

        console.log(i);
        //this.planetArray[i].spawnChildPlanets(moons, generation + 1);
      }
    }
  }
  
 spawnMoons() {
    // Mercury - 0 moons
    // Venus - 0 moons
    // Earth - 1 moon (Moon)
    // Mars - 2 moons (Phobos, Deimos)
    // Jupiter - 80 - 95 moons (87.5) (names...)
    // Saturn - 145 moons (names...)
    // Uranus - 27 moons (names...)
    // Neptune - 14 moons (names...)
    // Pluto - 5 moons (Charon, Nix, Styx, Kerberos, Hydra)
  }
 */
}
