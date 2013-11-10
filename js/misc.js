var raw_terrain, raw_pixeldata;
var terrain;

function applyPhysics(obj) {
  var gravity = 0.5;
  var max_velocity_y = 10;
  if(obj.vy < max_velocity_y) { obj.vy += gravity  }
}

function move(obj) {
  var target = Math.abs(obj.vy);
  var step = parseInt(obj.vy / target);  // step will become -1 for vx < 0 and +0 for vx > 0
  for(var i=0; i < target; i++) {
    obj.y += step;

    if( terrainAt(obj.x, obj.y) || terrainAt(obj.x, obj.rect().y) ) {
      obj.y -= step;
      if(obj.vy > 0) { obj.jumping = false }
      obj.vy = 0;
    }
  }

  target = Math.abs(obj.vx);
  step = parseInt(obj.vx / target);
  for(var i=0; i < target; i++) {
    obj.x += step;

    if(terrainInRect(obj.x, obj.y-obj.height, 1, obj.height)) {
      if(!terrainInRect(obj.x, obj.y-obj.height-6, 1, obj.height)) {
        obj.y -= 6;
      }
      obj.x -= step;
    }
  }
}

function terrainAt(x,y) {
  try {
    x = parseInt(x);
    y = parseInt(y);
    return raw_pixeldata[( (y-1) * terrain.width * 4) + (x*4) + 3];
  }
  catch(e) {
    return false
  }
}

function isOutsideCanvas(item) { return (item.x < 0 || item.y < 0 || item.x > jaws.width || item.y > jaws.height) }
function isCollidingWithTerrain(item) { return terrainAt(item.x, item.y) }

function terrainInRect(x,y,width,height) {
  try {
    for(var x2 = x+width; x < x2; x++) {
      for(var y2 = y+height; y < y2; y++) {
        if(terrainAt(x, y))  return true;
      }
    }
    return false;
  }
  catch(e) {
    return false;
  }
}

