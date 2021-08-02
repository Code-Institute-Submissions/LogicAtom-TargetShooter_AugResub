// jshint esversion: 6
 

/* ************** GAME DEFAULTS - SECTION START ************** */
// CONSTANTS: constants start at their default inital values always
const FPS = 30; // frames per second of animations
const GAME_LIVES = 99; // starting number of game lives, default = 3

const BULLET_MAX = 5; // maximum number of bullets on the screen at any one time, default = 10
const BULLET_SPD = 1000; // speed of bullets in pixels per second, 500 = default
const BULLET_EXPLODE_DUR = 0.1; // duration of the bullets' explosion in seconds, 0.1 = default
const BULLET_DIST = 0.4; // max distance bullet can travel as fraction of screen width. 0.6 = default

const TARGETS_RIDGES = 0.5; // ridgedness of the target (1 = none, 1 = lots). 0.4 = default
const TARGETS_PTS_LGE = 10; // points for large targets. 20 = default
const TARGETS_PTS_MED = 50; // 50 points for medium targets. 50 = default
const TARGETS_PTS_SML = 100; // 100 points for small targets. 100 = default
const TARGETS_NUM = 1; // starting number of targets. 1 = default
const TARGETS_SIZE = 100; // starting size of targets in pixels. 100 = default
const TARGETS_SPD = 50; // max starting speed of targets in pixels per second. 50 = default
const TARGETS_VERT = 8; // average number of vertices on each target. 10 = default

const HUNTER_SIZE = 30; // hunter height in pixels. 30 = default
const HUNTER_ACCELERATE = 6; // acceleration of the hunter in pixels per second per second - physics. 5 = default
const HUNTER_INV_DUR = 3; // duration of the hunter's invincibility in seconds. 3 = default
const HUNTER_BLINK_DUR = 0.1; // duration in seconds of a single blink during hunters invincibility. 0.1 = default
const HUNTER_EXPLODE_DUR = 0.4; // duration of the hunter's explosion in seconds. 0.3 = default
const FRICTION = 0.5; // friction coefficient (0 = no friction, 1 = lots of friction, 0.7 = default)

const SOUND_ON = true; // rotates game sounds on and off, false = off, true = on. on = default
const MUSIC_ON = true; // rotates game music background on and off, true = on, false = off. on = default
const ROTATE_SPEED = 360; // rotate speed in degrees per second. 360 = default
const SHOW_CENTER_DOT = false; // show or hide hunter's center dot of gravity. false = default. true is for debugging.
const SHOW_BOUNDING = false; // show or hide collision bounding boxes. false = default.
const TEXT_FADE_TIME = 2.5; // text fade time in seconds. 2.5 = default
const TEXT_SIZE = 40; // text font height in pixels. 40 = default
const STOR_KEY_HSCORE = "highscore"; // save key for local storage of high score. "highscore" = default
/* ************** GAME DEFAULTS - SECTION START ************** */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {

  canvasApp();

}

function canvasSupport() {
  return Modernizr.canvas;
}


function canvasApp() {


  if (!canvasSupport()) {
    return;
  } else {
    canv = document.getElementById('canvas');
    ctx = canv.getContext('2d');

  }


  function disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () { window.scrollTo(x, y); };
  }

  // set up game parameters
  var level, lives, targets, score, scoreHigh, hunter, text, textAlpha;
  newGame();

  // set up the game loop
  setInterval(update, 1000 / FPS);

  /* ************** AUDIO - SECTION BEGINNING ************** */

  // set up sound effects
  // associated with function Sound(), which is right above the update function
  var sfxBullet = new Sound("assets/sounds/bullethitwav.mp3", 5, 0.5);
  var sfxExplode = new Sound("assets/sounds/explode2.mp3"); // associated with function explodeHunter()
  var sfxHit = new Sound("assets/sounds/hit.mp3", 5);
  var sfxAccelerate = new Sound("assets/sounds/accelerate.m4a");

  // set up the music
  var music = new Music("assets/sounds/music-low.m4a", "assets/sounds/music-high.m4a");
  // make the music incrementally faster
  var targetsLeft, targetsTotal; // a ratio of how many there are left compared to the total(to use as a guide)

  /* ************** AUDIO - SECTION ENDING ************** */


  /* ************** TARGETS - SECTION START ************** */
  /* drawTargets, builds targets at random coordinates on the canvas (canv.width and canv.height) */
  function drawTargets() {
    targets = [];
    targetsTotal = (TARGETS_NUM + level) * 10; // each target is broken down into 2 mediums and each of those mediums can be broken down into 2 smalls(4 smalls + 2 mediums = 6 + 1original target = 7)
    targetsLeft = targetsTotal;
    var x, y;
    for (var i = 0; i < TARGETS_NUM + level; i++) {
      do {
        x = Math.floor(Math.random() * canv.width);
        y = Math.floor(Math.random() * canv.height);
      } while (distBetweenPoints(hunter.x, hunter.y, x, y) < TARGETS_SIZE * 2 + hunter.r);
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 2)));
    }
  }

  function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  function destroyTarget(index) {
    var x = targets[index].x;
    var y = targets[index].y;
    var r = targets[index].r;

    // split the target into smaller pieces when shot
    if (r == Math.ceil(TARGETS_SIZE / 2)) {
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 4)));
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 4)));
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 4)));
      score += TARGETS_PTS_LGE;
    } else if (r == Math.ceil(TARGETS_SIZE / 4)) {
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 8)));
      targets.push(newTarget(x, y, Math.ceil(TARGETS_SIZE / 8)));
      score += TARGETS_PTS_MED;
    } else {
      score += TARGETS_PTS_SML;
    }

    // check high score
    if (score > scoreHigh) {
      scoreHigh = score;
      localStorage.setItem(STOR_KEY_HSCORE, scoreHigh);
    }

    // destroy the target
    targets.splice(index, 1);
    sfxHit.play();

    // calculate the ratio of remaining targets to determine music tempo
    targetsLeft--; // decrement
    // call the function on music called setTargetRatio, and then in there the ratio is calculated..  targetsLeft == 0 // ? (if true then ratio = 1, reset ratio to 1), : else. // targetsLeft / targetsTotal = find the actual ratio
    music.setTargetRatio(targetsLeft == 0 ? 1 : targetsLeft / targetsTotal);

    // new level when no more targets
    if (targets.length == 0) {
      level++;
      newLevel();
    }
  }

  /* ************** TARGETS - SECTION ENDING ************** */

  /* *********  HUNTER SIZE ************ */
  function drawHunter(x, y, a, color = "limegreen") {
    ctx.strokeStyle = color;
    ctx.lineWidth = HUNTER_SIZE / 15;
    ctx.beginPath();
    ctx.moveTo(
      // nose of the hunter
      x + (5 / 3) * hunter.r * Math.cos(a), // default:  4 / 3
      y - (5 / 3) * hunter.r * Math.sin(a) // default:  4 / 3
    );
    ctx.lineTo(
      // rear left
      x - hunter.r * ((2 / 3) * Math.cos(a) + Math.sin(a)),
      y + hunter.r * ((2 / 3) * Math.sin(a) - Math.cos(a))
    );
    ctx.lineTo(
      // rear right
      x - hunter.r * ((2 / 3) * Math.cos(a) - Math.sin(a)),
      y + hunter.r * ((2 / 3) * Math.sin(a) + Math.cos(a))
    );
    ctx.closePath();
    ctx.stroke();
  }

  function explodeHunter() {
    hunter.explodeTime = Math.ceil(HUNTER_EXPLODE_DUR * FPS);
    sfxExplode.play();
  }

  function gameOver() {
    hunter.dead = true;
    text = "Game Over";
    textAlpha = 1.0;
  }

  /* ************** INTERACTIVE CONTROLS - SECTION BEGINNING ************** */

  // set up event handlers
  // ("in-built event to listen for", function that responds to the occurred event)
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);


  // event listeners
  function keyDown(/** @type [KeyboardEvent] */ ev) {
    if (hunter.dead) {
      return;
    }

    switch (ev.key) {
      case "ArrowDown":
      case " ": // spacebar key
      case "Down":
        shootBullet();
        break;

      case "ArrowLeft": // Keyboard Compatibility
      case "Left": // IE Compatibility
        hunter.rot = ((ROTATE_SPEED / 180) * Math.PI) / FPS;
        break;

      case "ArrowUp": // Keyboard Compatibility
      case "Up": // IE Compatibility
        hunter.accelerateing = true;
        break;

      // case "KeyD":
      case "ArrowRight":
      case "Right":
        hunter.rot = ((-ROTATE_SPEED / 180) * Math.PI) / FPS;
        break;
    }
  }

  function keyUp(/** @type [KeyboardEvent] */ ev) {
    ev.preventDefault();
    if (hunter.dead) {
      return;
    }

    switch (ev.key) {
      case "ArrowDown":
      case " ": // spacebar key
      case "Down": // down arrow (for one handed accessibility controls)
        hunter.canShoot = true;
        break;

      case "ArrowLeft": // Keyboard Compatibility
      case "Left": // IE Compatibility
        hunter.rot = 0;
        break;

      case "ArrowUp":
      case "Up":
        hunter.accelerateing = false;
        break;

      case "ArrowRight":
      case "Right":
        // case 39:  // right arrow (stop rotate hunter right)
        hunter.rot = 0;
        break;
    }
  }


  /* ************** INTERACTIVE CONTROLS - SECTION END ************** */

  /* ************** VELOCITY - SECTION START ************** */
  // x velocity and y velocity. These are values for how far a sprite will move the next frame or in the next second.
  function newTarget(x, y, r) {
    var lvlMult = 1 + 0.1 * level;
    var targets = {
      x: x,
      y: y,
      xv:
        ((Math.random() * TARGETS_SPD * lvlMult) / FPS) *
        (Math.random() < 0.5 ? 1 : -1),
      yv:
        ((Math.random() * TARGETS_SPD * lvlMult) / FPS) *
        (Math.random() < 0.5 ? 1 : -1),
      r: r,
      a: Math.random() * Math.PI * 2, // in radians
      vert: Math.floor(
        Math.random() * (TARGETS_VERT + 2) + TARGETS_VERT / 2
      ),
      offs: [],
    };

    // create the vertex offsets array
    for (var i = 0; i < targets.vert; i++) {
      targets.offs.push(Math.random() * TARGETS_RIDGES * 2 + 1 - TARGETS_RIDGES);
    }
    return targets;
  }

  /* ************** VELOCITY - SECTION ENDING ************** */

  /* ************** RESPAWN - SECTION ENDING ************** */

  function newGame() {
    level = 0;
    lives = GAME_LIVES;
    score = 0;
    hunter = newHunter();
    // get the high score from local storage
    var scoreStr = localStorage.getItem(STOR_KEY_HSCORE);
    if (scoreStr == null) {
      scoreHigh = 0;
    } else {
      scoreHigh = parseInt(scoreStr);
    }
    newLevel();
  }

  function newLevel() {
    text = "Level " + (level + 1);
    textAlpha = 1.0;
    drawTargets();
  }

  function newHunter() {
    return {
      x: canv.width / 2,
      y: canv.height / 2,
      r: HUNTER_SIZE / 2,
      a: (90 / 180) * Math.PI, // convert to radians
      blinkNum: Math.ceil(HUNTER_INV_DUR / HUNTER_BLINK_DUR),
      blinkTime: Math.ceil(HUNTER_BLINK_DUR * FPS),
      explodeTime: 0, // when explodeTime = 0 the hunter is exploding
      canShoot: true,
      dead: false, // start game with 4 lives, true = game over
      bullets: [],
      rot: 0,
      accelerateing: false,
      accelerate: {
        x: 0,
        y: 0,
      },
    };
  }

  /* ************** RESPAWN - SECTION ENDING ************** */

  function shootBullet() {
    // create the bullet object
    if (hunter.canShoot && hunter.bullets.length < BULLET_MAX) {
      hunter.bullets.push({
        // from the nose of the hunter
        x: hunter.x + (4 / 3) * hunter.r * Math.cos(hunter.a),
        y: hunter.y - (4 / 3) * hunter.r * Math.sin(hunter.a),
        xv: (BULLET_SPD * Math.cos(hunter.a)) / FPS,
        yv: (-BULLET_SPD * Math.sin(hunter.a)) / FPS,
        dist: 0,
        explodeTime: 0,
      });
      sfxBullet.play();
    }
    // prevent further shooting
    hunter.canShoot = false;
  }

  /* ************** MUSIC - SECTION START ************** */

  // the speed of the beat increases as the game progresses
  function Music(srcLow, srcHigh) {
    this.soundLow = new Audio(srcLow);
    this.soundHigh = new Audio(srcHigh);
    this.low = true; // keep track of what audio were playing
    this.tempo = 1.0; // seconds per beat (keep track of speed of audio)
    this.beatTime = 0; // frames left until next beat (countdown the tempo)

    this.play = function () {
      if (MUSIC_ON) {
        // if MUSIC_ON = true then do all of this
        if (this.low) {
          // play the Low sound
          this.soundLow.play();
        } else {
          // otherwise
          // play the High sound
          this.soundHigh.play();
        }
        this.low = !this.low; // switch between the two sounds (switches true to false and false to true)
      }
    };

    // this completes the tempo changing
    this.setTargetRatio = function (ratio) {
      this.tempo = 1.0 - 0.75 * (1.0 - ratio); // when ratio is 0, 1-0=1, .75*1=.75, 1-.75=.25 ::: the fastest rate will be .25 which is 4 beats per second
    };

    // countdown the tempo beat
    this.tick = function () {
      // called every frame
      if (this.beatTime == 0) {
        // 0 = its counting down every frame immediately
        this.play(); // play current sound
        this.beatTime = Math.ceil(this.tempo * FPS); // reset the beat time., Math.ceil keeps it as an integer. FPS = framerate. (ex: current tempo is 1 and framerate is 30 = 30 ticks until the sound is played(1 second))
      } else {
        // so doesnt equal zero
        this.beatTime--; // decrement it
      }
    };
  }

  function Sound(src, maxStreams = 1, vol = 1.0) {
    this.streamNum = 0; // keep track of which stream is currently being played
    this.streams = []; // empty array keeps track of each stream
    for (var i = 0; i < maxStreams; i++) {
      // to populate the array
      this.streams.push(new Audio(src)); // push to that array, src = argument
      this.streams[i].volume = vol; // set the volume level
    }

    this.play = function () {
      if (SOUND_ON) {
        this.streamNum = (this.streamNum + 1) % maxStreams; // cycle threw each of the streams and find the modulus of the maxStreams
        this.streams[this.streamNum].play(); // the element number .play is the in-built play function
      }
    };

    this.stop = function () {
      this.streams[this.streamNum].pause();
      this.streams[this.streamNum].currentTime = 0;
    };
  }

  /* ************** MUSIC - SECTION ENDING ************** */


  /* ************** UPDATE - SECTION START ************** */

  function update() {
    var blinkOn = hunter.blinkNum % 2 == 0; // makes blinking an even number
    var exploding = hunter.explodeTime > 0; //  > 0 means the hunter is exploding

    // tick the music
    music.tick();

    ctx.fillStyle = "black"; // canvas background color

    ctx.fillRect(0, 0, canv.width, canv.height); // draw the background

    // accelerate the hunter
    if (hunter.accelerateing && !hunter.dead) {
      // added && !hunter.dead, which combined with keyUp and keyDown ends the game
      hunter.accelerate.x += (HUNTER_ACCELERATE * Math.cos(hunter.a)) / FPS;
      hunter.accelerate.y -= (HUNTER_ACCELERATE * Math.sin(hunter.a)) / FPS;
      sfxAccelerate.play(); // this sound will continue when forward key is released, need a way to stop the sound

      // draw the accelerater
      if (!exploding && blinkOn) {
        ctx.fillStyle = "gold";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = HUNTER_SIZE / 10;
        ctx.beginPath();
        ctx.moveTo(
          // rear left
          hunter.x - hunter.r * ((2 / 3) * Math.cos(hunter.a) + Math.sin(hunter.a)),
          hunter.y + hunter.r * ((2 / 3) * Math.sin(hunter.a) - Math.cos(hunter.a))
        );
        ctx.lineTo(
          // rear center behind the hunter
          hunter.x - ((hunter.r * 5) / 2) * Math.cos(hunter.a),
          hunter.y + ((hunter.r * 11) / 3) * Math.sin(hunter.a)
        );
        ctx.lineTo(
          // rear right
          hunter.x - hunter.r * ((2 / 3) * Math.cos(hunter.a) - Math.sin(hunter.a)),
          hunter.y + hunter.r * ((2 / 3) * Math.sin(hunter.a) + Math.cos(hunter.a))
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    } else {
      hunter.accelerate.x -= (FRICTION * hunter.accelerate.x) / FPS;
      hunter.accelerate.y -= (FRICTION * hunter.accelerate.y) / FPS;
      sfxAccelerate.stop(); // stops the accelerate sound when the forward key is released.
    }

    //draw a traingular hunter
    if (!exploding) {
      // if hunter is not exploding
      if (blinkOn && !hunter.dead) {
        // added && !hunter.dead combined with other lines to not draw a new hunter when game is over
        drawHunter(hunter.x, hunter.y, hunter.a);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = HUNTER_SIZE / 20;
        ctx.beginPath();
        ctx.moveTo(  // nose of the hunter
          hunter.x + 4 / 3 * hunter.r * Math.cos(hunter.a),
          hunter.y - 4 / 3 * hunter.r * Math.sin(hunter.a)
        );
        ctx.lineTo( // rear left
          hunter.x - hunter.r * (2 / 3 * Math.cos(hunter.a) + Math.sin(hunter.a)),
          hunter.y + hunter.r * (2 / 3 * Math.sin(hunter.a) - Math.cos(hunter.a))
        );
        ctx.lineTo( // rear right
          hunter.x - hunter.r * (2 / 3 * Math.cos(hunter.a) - Math.sin(hunter.a)),
          hunter.y + hunter.r * (2 / 3 * Math.sin(hunter.a) + Math.cos(hunter.a))
        );
        ctx.closePath();
        ctx.stroke();
      }

      // handle blinking
      if (hunter.blinkNum > 0) {
        //reduce the blink time
        hunter.blinkTime--;

        //reduce the blink num
        if (hunter.blinkTime == 0) {
          hunter.blinkTime = Math.ceil(HUNTER_BLINK_DUR * FPS);
          hunter.blinkNum--;
        }
      }
    } else {
      // draw the explosion
      ctx.fillStyle = "darkblue";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r * 1.7, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r * 1.4, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = "gray";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r * 1.1, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r * 0.8, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r * 0.5, 0, Math.PI * 2, false);
      ctx.fill();
    }

    if (SHOW_BOUNDING) {
      ctx.strokeStyle = "lime";
      ctx.beginPath();
      ctx.arc(hunter.x, hunter.y, hunter.r, 0, Math.PI * 2, false);
      ctx.stroke();
    }

    // draw the targets
    var x, y, r, a, vert, offs;
    for (var i = 0; i < targets.length; i++) {
      ctx.strokeStyle = "brown";
      ctx.lineWidth = HUNTER_SIZE / 20;

      // get the target properties
      x = targets[i].x;
      y = targets[i].y;
      r = targets[i].r;
      a = targets[i].a;
      vert = targets[i].vert;
      offs = targets[i].offs;

      // draw a path
      ctx.beginPath();
      ctx.moveTo(x + r * offs[0] * Math.cos(a), y + r * offs[0] * Math.sin(a));

      // draw the polygon
      for (var p = 1; p < vert; p++) {
        ctx.lineTo(
          x + r * offs[p] * Math.cos(a + (p * Math.PI * 2) / vert),
          y + r * offs[p] * Math.sin(a + (p * Math.PI * 2) / vert)
        );
      }
      ctx.closePath();
      ctx.stroke();

      // bounding boxes
      if (SHOW_BOUNDING) {
        ctx.strokeStyle = "pink";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.stroke();
      }
    }

    // center dot
    if (SHOW_CENTER_DOT) {
      ctx.fillStyle = "brown";
      ctx.fillRect(hunter.x - 1, hunter.y - 1, 2, 2);
    }

    // draw the bullets
    for (
      var bulletExplosionColor = 0;
      bulletExplosionColor < hunter.bullets.length;
      bulletExplosionColor++
    ) {
      if (hunter.bullets[bulletExplosionColor].explodeTime == 0) {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(
          hunter.bullets[bulletExplosionColor].x,
          hunter.bullets[bulletExplosionColor].y,
          HUNTER_SIZE / 15,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
      } else {
        // draw the explosion
        ctx.fillStyle = "silver";
        ctx.beginPath();
        ctx.arc(
          hunter.bullets[bulletExplosionColor].x,
          hunter.bullets[bulletExplosionColor].y,
          hunter.r * 0.75,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(
          hunter.bullets[bulletExplosionColor].x,
          hunter.bullets[bulletExplosionColor].y,
          hunter.r * 0.5,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(
          hunter.bullets[bulletExplosionColor].x,
          hunter.bullets[bulletExplosionColor].y,
          hunter.r * 0.25,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
      }
    }

    // detect bullet hits on targets
    var ax, ay, ar, lx, ly;
    for (var detectHits = targets.length - 1; detectHits >= 0; detectHits--) {
      // grab the target properties
      ax = targets[detectHits].x;
      ay = targets[detectHits].y;
      ar = targets[detectHits].r;
      // loop over the bullets
      for (
        var properties = hunter.bullets.length - 1;
        properties >= 0;
        properties--
      ) {
        // grab the bullet properties
        lx = hunter.bullets[properties].x;
        ly = hunter.bullets[properties].y;
        // detect hits
        if (
          hunter.bullets[properties].explodeTime == 0 &&
          distBetweenPoints(ax, ay, lx, ly) < ar
        ) {
          // destroy the target and activate the bullet explosion
          destroyTarget(detectHits);
          hunter.bullets[properties].explodeTime = Math.ceil(
            BULLET_EXPLODE_DUR * FPS
          );
          break;
        }
      }
    }
    //check for target collisions
    if (!exploding) {
      if (hunter.blinkNum == 0 && !hunter.dead) {
        for (
          var chekCollisions = 0;
          chekCollisions < targets.length;
          chekCollisions++
        ) {
          if (
            distBetweenPoints(
              hunter.x,
              hunter.y,
              targets[chekCollisions].x,
              targets[chekCollisions].y
            ) <
            hunter.r + targets[chekCollisions].r
          ) {
            explodeHunter();
            destroyTarget(chekCollisions);
            break; // adding break makes it so the hunter explosion doesn't take out more than one target intermittenly
          }
        }
      }

      // rotate hunter
      hunter.a += hunter.rot;

      // move the hunter
      hunter.x += hunter.accelerate.x;
      hunter.y += hunter.accelerate.y;
    } else {
      // reduce the explode time
      hunter.explodeTime--;

      // reset the hunter after the explosion has finished
      if (hunter.explodeTime == 0) {
        lives--; // removes 1 life after a hunter explodes
        if (lives == 0) {
          // no more lives left
          gameOver(); // call function
        } else {
          hunter = newHunter();
        }
      }
    }

    // handle edge of the screen
    if (hunter.x < 0 - hunter.r) {
      hunter.x = canv.width + hunter.r;
    } else if (hunter.x > canv.width + hunter.r) {
      hunter.x = 0 - hunter.r;
    }
    if (hunter.y < 0 - hunter.r) {
      hunter.y = canv.height + hunter.r;
    } else if (hunter.y > canv.height + hunter.r) {
      hunter.y = 0 - hunter.r;
    }

    // move the bullets
    for (var moveBullets = hunter.bullets.length - 1; moveBullets >= 0; moveBullets--) {

      // check the distance travelled
      if (hunter.bullets[moveBullets].dist > BULLET_DIST * canv.width) {
        hunter.bullets.splice(moveBullets, 1); // delete one
        continue;
      }

      // handle the explosion
      if (hunter.bullets[moveBullets].explodeTime > 0) {
        hunter.bullets[moveBullets].explodeTime--;

        // destroy the bullet after the duration is up
        if (hunter.bullets[moveBullets].explodeTime == 0) {
          hunter.bullets.splice(moveBullets, 1);
          continue; // continue, stops the code from continuing on instead it goes back to the for loop above
        }
      } else {
      }
      // move the bullets
      hunter.bullets[moveBullets].x += hunter.bullets[moveBullets].xv;
      hunter.bullets[moveBullets].y += hunter.bullets[moveBullets].yv;

      // calculate the bullets distance travelled
      hunter.bullets[moveBullets].dist += Math.sqrt(
        Math.pow(hunter.bullets[moveBullets].xv, 2) +
        Math.pow(hunter.bullets[moveBullets].yv, 2)
      );

      // handle edge of the screen
      if (hunter.bullets[moveBullets].x < 0) {
        hunter.bullets[moveBullets].x = canv.width;
      } else if (hunter.bullets[moveBullets].x > canv.width) {
        hunter.bullets[moveBullets].x = 0;
      }
      if (hunter.bullets[moveBullets].y < 0) {
        hunter.bullets[moveBullets].y = canv.height;
      } else if (hunter.bullets[moveBullets].y > canv.height) {
        hunter.bullets[moveBullets].y = 0;
      }
    }

    // move the targets
    for (
      var handleMoveBullets = 0;
      handleMoveBullets < targets.length;
      handleMoveBullets++
    ) {
      targets[handleMoveBullets].x += targets[handleMoveBullets].xv;
      targets[handleMoveBullets].y += targets[handleMoveBullets].yv;

      // handle edge of screen
      if (targets[handleMoveBullets].x < 0 - targets[handleMoveBullets].r) {
        targets[handleMoveBullets].x = canv.width + targets[handleMoveBullets].r;
      } else if (
        targets[handleMoveBullets].x >
        canv.width + targets[handleMoveBullets].r
      ) {
        targets[handleMoveBullets].x = 0 - targets[handleMoveBullets].r;
      }
      if (targets[handleMoveBullets].y < 0 - targets[handleMoveBullets].r) {
        targets[handleMoveBullets].y = canv.height + targets[handleMoveBullets].r;
      } else if (
        targets[handleMoveBullets].y >
        canv.height + targets[handleMoveBullets].r
      ) {
        targets[handleMoveBullets].y = 0 - targets[handleMoveBullets].r;
      }
    }
  }
}

/* ************** UPDATE - SECTION ENDING ************** */

/* ************** END OF GAME CODE ************** */