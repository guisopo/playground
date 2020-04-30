export class Particle {
  constructor(options = {}) {

    this.position = options.position || {x: 0, y: 0};
    this.particleColor = options.particleColor || '#000000';
    this.size = options.size || 10;
    this.mass = options.mass || 1;

    this.direction = options.direction || 0;
    this.speed = options.speed || 0;
    
    this.gravity = options.gravity || 0;
    this.friction = options.friction || 1;
    this.bounce = options.bounce || -1;

    this.springs = [];
    this.gravitations = [];

    this.vx = Math.cos(this.direction) * this.speed;
    this.vy = Math.sin(this.direction) * this.speed;

    this.springTargetX = null,
    this.springTargetY = null,
    this.springTargetK = null,
    this.hasSpringTarget = false;
  }

  bindAll() {
    [ 'addEventListeners', 'render', 'drawParticle', 'init']
      .forEach( fn => this[fn] = this[fn].bind(this));
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(speed) {
    const heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(heading) { 
    const speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  }

  accelerate(ax, ay) {
    this.vx += ax;
    this.vy += ay;
  }

  angleTo(p2) {
    return Math.atan2(p2.position.y - this.position.y, p2.position.x - this.position.x);
  }

  distanceTo(p2) {
    const dx = p2.position.x - this.position.x; 
    const dy = p2.position.y - this.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  addGravitation(point) {
    this.removeGravitation(point);
    this.gravitations.push(point);
  }

  removeGravitation(p) {
    this.gravitations.forEach(gravitation => {
      if(p === gravitation.p) {
        this.gravitations.splice(this.gravitations.indexOf(p), 1);
        return;
      }
    });
  }

  handleGravitations() {
    this.gravitations.forEach(gravitation => {
      this.gravitateTo(gravitation);
    });
  }

  gravitateTo(p2) {
    const dx = p2.position.x - this.position.x;
    const dy = p2.position.y - this.position.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = p2.mass / (distance * distance);

    const ax = dx / distance * force;
    const ay = dy / distance * force;

    this.vx += ax;
    this.vy += ay;
  }

  setSpringTarget(x, y, k) {
    this.springTargetX = x;
    this.springTargetY = y;
    this.springTargetK = k || 0.02;
    this.hasSpringTarget = true;
  }

  addSpring(point, k, length = 0) {
    this.removeSpring(point);
    this.springs.push({
      point: point,
      k: k,
      length: length
    });
  }

  removeSpring(point) {
    this.springs.forEach(spring => {
      if(point === spring.point) {
        this.springs.splice(this.springs.indexOf(point), 1);
        return;
      }
    });
  }

  handleSprings() {
    this.springs.forEach(spring => {
      this.springTo(spring.point, spring.k, spring.length);
    });
  }

  springTo(p2, k, springLength = 0) {
    const dx = p2.position.x - this.position.x;
    const dy = p2.position.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const springForce = (distance - springLength) * k;
    this.vx += dx / distance * springForce;
    this.vy += dy / distance * springForce;
  }

  springFrom(springPoint, k, springLength) {
    let dx = springPoint.position.x - this.position.x,
        dy = springPoint.position.y - this.position.y,
        distance = Math.sqrt(dx * dx + dy * dy),
        springForce = (distance - springLength || 0) * k;
    if(distance < springLength) {
      this.vx += dx / distance * springForce,
      this.vy += dy / distance * springForce;
    }
  }

  springBack(k) {
    let dx = -(this.position.x - this.originalX),
        dy = -(this.position.y - this.originalY);
    this.vx += dx * k,
    this.vy += dy * k;
  }

  think(p2, dp2) {
    let dx = this.position.x - p2.position.x,
        dy = this.position.y - p2.position.y,
        distance = Math.sqrt(dx * dx + dy * dy);

    if(distance < dp2) {
      let tx = p2.position.x + dx / distance * dp2,
          ty = p2.position.y + dy / distance * dp2;
      this.vx += tx - this.position.x;
      this.vy += ty - this.position.y;
    }
  }

  update() {
    this.handleSprings();
    this.handleGravitations();

    if (this.hasSpringTarget) {
      this.vx += (this.springTargetX - this.position.x) * this.springTargetK;
      this.vy += (this.springTargetY - this.position.y) * this.springTargetK;
    }
    
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.vy += this.gravity;
    
    this.position.x += this.vx;
    this.position.y += this.vy;
  }

  drawParticle(context) {
    context.fillStyle = this.particleColor;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
    context.fill();
  }

  init() {
    this.bindAll();
    this.addEventListeners();
  }
}