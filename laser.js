// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

var colors = [[248, 12, 18], [238, 17, 0], [255, 51, 17], [255, 68, 34], [255, 102, 68], [255, 153, 51], [254, 174, 45], [204, 187, 51], [208, 195, 16], [170, 204, 34], [105, 208, 37], [34, 204, 170], [18, 189, 185], [17, 170, 187], [68, 68, 221], [51, 17, 187], [59, 12, 189], [68, 34, 153]]

function Laser(spos, angle) {
  Entity.call(this, createVector(spos.x, spos.y), 10, 4);

  var force = p5.Vector.fromAngle(angle);
  force.mult(100);
  Entity.prototype.applyForce.call(this, force);

  this.color = colors[floor(random(0,colors.length-1))];

  this.render = function() {
    push();
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.playSoundEffect = function(sound){
    if (!sound.isPlaying()){
      sound.play();
    }
  }

  this.hits = function(asteroid) {
    var last_pos = p5.Vector.sub(this.pos, this.vel);
    var asteroid_vertices = asteroid.vertices;
    for(var i = 0; i < asteroid_vertices.length; i++) {
      aVert = asteroid_vertices[i].copy();
      aVert.add(asteroid.pos);
      bVert = asteroid_vertices[(i + 1) % asteroid_vertices.length].copy();
      bVert.add(asteroid.pos);
      if(lineIntersect(last_pos, this.pos, aVert, bVert)) {
        return true;
      }
    }
    return false;
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }
}

Laser.prototype = Object.create(Entity.prototype);
