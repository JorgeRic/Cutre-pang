'use strict';

function Enemy(canvas, randomY) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.x = this.canvas.width;
  this.y = randomY;
  this.velocity = getRandomInt(1,6);
  this.direction = -1;
  this.colores = ['red','indianred','yellow','blue','green','violet', 'pink','orange']
  this.color = this.colores[getRandomInt(0,7)];
  this.radio = getRandomInt(20,80);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function radios(grados){
  return grados * Math.PI / 180;
}

Enemy.prototype.move = function() {
  this.x = this.x + this.direction * this.velocity;
}


Enemy.prototype.draw = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radio, radios(0) ,radios(360));
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
}
