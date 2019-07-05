'use strict';

function Player(canvas, nombre) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.y = (this.canvas.height / 2) - this.height / 2;
  this.lives = 3;
  this.nombre = nombre;
  this.score = 0;
} 

Player.prototype.move = function() {
  this.y = this.y + this.direction * this.velocity;
}

Player.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.width, this.height)
}