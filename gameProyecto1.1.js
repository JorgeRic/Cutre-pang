'use strict';

function Game(canvas, playerName) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.onGameOver = null;
  this.contad_puntos=0;
  this.playerName = playerName;
  this.lives=3;
  this.gameSong1 = new Audio('pang.mp3');
  this.disparo = new Audio('disparo2.mp3');
  this.vida = new Audio('vida.mp3')
}

Game.prototype.startGame = function() {
  // inicializar player y enenmies
  this.player = new Player(this.canvas, this.playerName);
  var loop = () => {
    if(Math.random() > 0.97) {
      var randomY = Math.random() * this.canvas.height - 10;
      var newEnemy = new Enemy(this.canvas, randomY);
      this.enemies.push(newEnemy);

    }
    this.update();
    this.clear();
    this.draw();
    this.checkCollisions();

    if(!this.isGameOver) {
      requestAnimationFrame(loop)
      this.gameSong1.play();
    } else {
      this.onGameOver();
      this.gameSong1.pause();
      this.gameSong1.currentTime = 0;
    }
  };
  loop();
}

Game.prototype.update = function() {
  this.player.move();

  this.enemies.forEach(function(enemy) {
    enemy.move();
  })
  var marcador = document.querySelector('#n_vidas');
  marcador.innerHTML = this.player.lives;
  var puntos = document.querySelector('#n_puntos');
  puntos.innerHTML = this.contad_puntos;
}

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw = function() {
  this.player.draw();
  this.enemies.forEach(function(enemy) {
    enemy.draw();
  })
}

Game.prototype.mouseClickEvent = function (ejeX, ejeY) {
	this.enemies.forEach((enemy,i)=> {

    var distance = Math.sqrt(Math.pow(- enemy.x + ejeX, 2) + Math.pow((-enemy.y + ejeY),2))
    var collision = distance < enemy.radio;
    console.log(collision)

    if(collision){
      this.enemies.splice(i,1);
      this.contad_puntos = this.contad_puntos + 1;
      this.disparo.play();
    }
    
	})
}

Game.prototype.checkCollisions = function() {
  this.enemies.forEach((enemy, index) => {
    var rightLeft = this.player.x + this.player.width >= enemy.x;
    var leftRight = this.player.x <= enemy.x + enemy.width;
    var bottomTop = this.player.y + this.player.height >= enemy.y;
		var topBottom = this.player.y <= enemy.y + enemy.height;
	
    var wrong = enemy.x < 0;
    
		if (wrong) {
      this.enemies.splice(index, 1);
      this.player.lives --;
      this.vida.play()
		}
      if(this.player.lives === 0) {
       this.isGameOver = true;
      }

    if (rightLeft && leftRight && bottomTop && topBottom) {
      this.enemies.splice(index, 1);
      this.player.lives --;
      if(this.player.lives === 0) {
        this.isGameOver = true;
      }
    }
  })
}

Game.prototype.gameOverCallback = function(callback) {
  this.onGameOver = callback;
}
	
