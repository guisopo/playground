class Physics {
  constructor(x, y, power) {
    this.x = x || 0;
    this.y = y || 0;

    this.originalX = x || 0;
    this.originalY = y || 0;
    this.vx = 0;
    this.vy = 0;
    
    this.friction = 0.9;
    this.springFactor = 0.1;
    
    this.power = power || 0.1;
    this.maxSpeed = 2;
    
    this.diffX = 0;
    this.diffY = 0;
  }
  
  setPos(x,y) {
    this.x = x;
    this.y = y;
  }

  think(mouse) {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;

    let dist = Math.sqrt(dx*dx + dy*dy);
    // interaction
    if(dist<200) {
      let angle = Math.atan2(dy,dx);
      let tx = mouse.x + Math.cos(angle) * 200;
      let ty = mouse.y + Math.sin(angle) * 200;

      this.vx += (tx - this.x) * -1;
      this.vy += (ty - this.y) * -1;
      // power
      this.vx *= this.power;
      this.vy *= this.power;
    }

    // spring back
    let dx1 = -(this.x - this.originalX);
    let dy1 = -(this.y - this.originalY);

    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;

        
    // friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vx = Math.min(this.vx, this.maxSpeed);
    this.vy = Math.min(this.vy, this.maxSpeed);

    // actual move
    this.x += this.vx;
    this.y += this.vy;

    this.diffX = this.x - this.originalX;
    this.diffY = this.y - this.originalY;
  }


}
