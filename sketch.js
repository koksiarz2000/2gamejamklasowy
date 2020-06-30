// Global dictionary 
const app = {

  // Images
  bg_image: null,
  player_images: [null, null],
  enemy_images: [null, null, null],
  slider_image: null,

  // Enemy vars
  enemy_current_state: 0,
  time_to_show_enemy_0: 1,
  time_to_show_enemy_1: 3,
  time_to_show_enemy_2: 1,

  // Player
  player_current_state: 0,

  // Slider's values
  slider_current: 0,
  slider_current_real: 0,
  slider_max: 5000,
  slider_multiplier: 1,

  // Game manager
  game_is_active: true,

}

function loadGrafic() {
  app.bg_image = loadImage('assets/jaskinia.jpg');

  app.player_images[0] = loadImage('assets/p1.png');
  app.player_images[1] = loadImage('assets/p2.png');

  app.enemy_images[0] = loadImage('assets/e1.png');
  app.enemy_images[1] = loadImage('assets/e2.png');
  app.enemy_images[2] = loadImage('assets/e3.png');

  app.slider_image = loadImage('assets/kanada.png');
}

function setup() {
  createCanvas(1064, 600);

  loadGrafic();
}

function playerManager() {

  // Change player state
  if (keyIsDown(32)) {
    app.player_current_state = 1;
  } else {
    app.player_current_state = 0;
  }

  // Check players states
  if (app.player_current_state === 1) {
    app.slider_multiplier += 0.068;
    app.slider_current += 1 * app.slider_multiplier;
  } else {
    app.slider_multiplier = 1;
  }
}

function enemyManager() {

  //Check enemy states
  if (app.enemy_current_state === 0) {
    // State 0 - State 2
    if (app.time_to_show_enemy_2 >= 0) {
      app.time_to_show_enemy_2 -= deltaTime * 0.001;
    } else {
      app.time_to_show_enemy_2 = random(0.5, 1.1);
      app.enemy_current_state = 2;
    }

  } else if (app.enemy_current_state === 1) {
    // State 1 -> State 0
    if (app.time_to_show_enemy_0 >= 0) {
      app.time_to_show_enemy_0 -= deltaTime * 0.001;
    } else {
      app.time_to_show_enemy_0 = random(0.15, 0.45);
      app.enemy_current_state = 0;
    }

  } else { 
    // State 2 -> State 1
    if (app.time_to_show_enemy_1 >= 0) {
      app.time_to_show_enemy_1 -= deltaTime * 0.001;
    } else {
      app.time_to_show_enemy_1 = random(1.0, 3.0);
      app.enemy_current_state = 1;
    }
  }
}

function drawObjects() {

  // Draw player
  image(app.player_images[app.player_current_state], 0, 100);
  noFill();
  rect(0, 100, 468, 512);
  noStroke();

  // Draw enemy
  image(app.enemy_images[app.enemy_current_state], 600, 100);
  noFill();
  rect(0, 100, 468, 512);
  noStroke();

  // Draw slider background rect
  fill(51);
  rect(167, 536, 800, 20);

  // Draw slider fill
  app.slider_current_real = (app.slider_current * 800) / app.slider_max;
  fill('rgb(100%,0%,10%)');
  rect(167, 536, app.slider_current_real, 20);

  // Draw slider image
  image(app.slider_image, 25, 510);
  noFill();
  rect(25, 510, 143, 72);
  noStroke();
}

function gameManager() {
  if (app.player_current_state === 1 && app.enemy_current_state === 0) {
    app.game_is_active = false;

    fill('#303030');
    rect(0, 0, 1064, 600);

    textSize(48);
    fill('white');
    textAlign(CENTER, CENTER)
    text('Przegrałeś. Nie jaraj na służbie!!\nOdśwież stronę, aby zagrać ponownie', 532, 300);
  }

  if (app.slider_current >= app.slider_max) {
    app.game_is_active = false;

    fill('#303030');
    rect(0, 0, 1064, 600);

    textSize(48);
    fill('white');
    textAlign(CENTER, CENTER)
    text('Wygrałeś!\nPoteżnię się bawisz na warcie.', 532, 300);
  }
}

function draw() {

  frameRate(30);

  if (app.game_is_active) {
    background(app.bg_image)

    drawObjects();

    playerManager();
    enemyManager();

    gameManager();

  }
}