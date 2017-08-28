// Enemies our player must avoid
var Enemy = function(startLocation) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // Set a randomized, negative starting position
    this.x = - Math.floor((Math.random() * 200) + 1);
    this.y = startLocation;
    this.speed = Math.floor((Math.random() * 100) + 60);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // All enemies move with their own random speed
    this.x += (this.speed * dt);

    // If an enemy leaves the screen, it returns on the other side
    if (this.x > 505) {
          this.x = -100;
    }

    // Collision detection
    if ((this.x < player.x + 80) &&
      (this.x + 80 > player.x) &&
      (this.y < player.y + 50) &&
	    (50 + this.y > player.y)) {
        // Collision detected! Player is set back to start
        player.x = 202;
        player.y = 395;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 202;
	this.y = 395;
  this.sprite = "images/char-boy.png";
};

Player.prototype.update = function() {
  //Out of Bounds movement impossible
  if (this.x < 0) {
    this.x = 0;
  }
  else if (this.x > 404) {
    this.x = 404;
  }
  else if (this.y > 395) {
    this.y = 395;
  }
  else if (this.y < 0) {
    this.x = 202;
    this.y = 395;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  switch (key) {
      case 'up': this.y -= 83;
        break;
      case 'right': this.x += 101;
        break;
      case 'down': this.y += 83;
        break;
      case 'left': this.x -= 101;
        break;
      }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Initialize Player
var player = new Player();

// Initialize Enemies and make an array containing each
var bug = new Enemy(63);
var bug2 = new Enemy(146);
var bug3 = new Enemy(229);
var allEnemies = [bug, bug2, bug3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
