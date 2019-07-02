'use strict'
function Player (){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
			this.x = this.canvas.width / 2;
			this.y = this.canvas.heigth / 2;
			this.velocity = 3;
      this.lives = 3;
};