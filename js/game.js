function PlayState() {
  // Variables
  var viewport;
  var raw_terrain, raw_pixeldata;
  var terrain;
  var player;
  var frame;

  var game_objects = new jaws.SpriteList()

  function loadGameObjects(json_file) {
     jaws.log("Starting loading objects", true)
     jaws.assets.get(json_file).forEach( function(item, index) {
       jaws.log("Creating object..." + item.type + item, true)
       var game_object = new window[item.type](item)
       jaws.log("Created object...", true)
       game_object.setAnchor("center")
       game_object.rect()
       game_objects.push(game_object)
       jaws.log("Created " + game_object, true)
     });
     jaws.log("Created " + game_objects.length + " game objects", true)
   }

  // Before game start
  this.setup = function() {
    // Setting the browser options
    jaws.log("Configuring browser options",true);
    jaws.context.mozImageSmoothingEnabled = false;
    jaws.preventDefaultKeys(["w","a", "s","d","space","z","up","down","right","left"]);

    jaws.log("Loading map", true);
    terrain = new jaws.Sprite({x: 0, y: 0, image: 'images/map.png'});
    raw_terrain = terrain.asCanvasContext();
    raw_pixeldata = raw_terrain.getImageData(0, 0, terrain.width, terrain.height).data;

    jaws.log("Setting up viewport", true);
    viewport = new jaws.Viewport({max_x: terrain.width, max_y: terrain.height});

    start_pos = [240,3150];

    jaws.log("Creating player object", true);
    player = new jaws.Sprite({ x: 20, y: 20, anchor: "center_bottom" });
    player.animation = new jaws.Animation({ sprite_sheet: 'images/tuza_sprite2.png', frame_size: [40,52], frame_duration: 120, subsets: { saltar: [2,4] } });

    player.move_anim = player.animation.slice(0,2);
    player.vx = player.vy = 0;
    player.x = start_pos[0];
    player.y = start_pos[1];

    // Loading objects on map
    jaws.log("Loading objects", true);
    game_objects = new jaws.SpriteList();
    loadGameObjects('objects.json');
    jaws.log("Loaded objects", true);
  }

  function applyPhysics(obj) {
    var gravity = 0.5
    var max_velocity_y = 10
    if(obj.vy < max_velocity_y) { obj.vy += gravity  }
  }

  function move(obj) {
    var target = Math.abs(obj.vy)
    var step = parseInt(obj.vy / target)  // step will become -1 for vx < 0 and +0 for vx > 0
    for(var i=0; i < target; i++) {
      obj.y += step

      if( terrainAt(obj.x, obj.y) || terrainAt(obj.x, obj.rect().y) ) {
        obj.y -= step
        if(obj.vy > 0) { obj.jumping = false }
        obj.vy = 0
      }
    }

    target = Math.abs(obj.vx)
    step = parseInt(obj.vx / target)
    for(var i=0; i < target; i++) {
      obj.x += step

      if(terrainInRect(obj.x, obj.y-obj.height, 1, obj.height)) {
        if(!terrainInRect(obj.x, obj.y-obj.height-6, 1, obj.height)) {
          obj.y -= 6
        }
        obj.x -= step
      }
    }
  }

  function terrainAt(x,y) {
    try {
      x = parseInt(x)
      y = parseInt(y)
      return raw_pixeldata[( (y-1) * terrain.width * 4) + (x*4) + 3]
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
      return false
    }
    catch(e) {
      return false
    }
  }

  this.update = function() {
    var frame = 0
    if(player.jumping)      { frame = 3 }
    else if(player.vx)      { frame = -1; player.setImage( player.move_anim.next() ) }
    if(frame >= 0)          { player.setImage( player.animation.frames[frame] ) }

    player.vx = 0
    if (jaws.pressed("left"))        { player.vx = -4; player.flipped = 1; }
    else if (jaws.pressed("right"))  { player.vx = +4; player.flipped = 0; }
    if (jaws.pressed("up"))  { if(!player.jumping && player.can_jump) { player.vy = -10; player.jumping = true; player.can_jump = false} }
    else { player.can_jump = true }

    if(jaws.pressed("space")) {
      game_objects.forEach( function(game_object, index) {
        if(player.rect().collideRect(game_object.rect())) {
          game_object.action && game_object.action();
        }
      });
    }

    game_objects.forEach( function(game_object, index) {
      if(game_object.hasOwnProperty("update")) { game_object.update() }
    });

    applyPhysics(player)
    move(player)

    viewport.x = player.x - jaws.width / 2
    viewport.y = player.y - jaws.height + 100
  };


  this.draw = function() {
    jaws.clear()

    viewport.apply( function() {
      terrain.draw()
      game_objects.draw()
      player.draw()
    });
  };


};

// Objects of the game
function Penguin(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'bottom_center' })
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/penguin2x17x24.png", frame_size: [17,24]})
  this.setImage(this.sprite_sheet.frames[0])
  this.action = function() {
    this.activated = (this.activated ? false : true)
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]))
  };
}
Penguin.prototype = jaws.Sprite.prototype

function Ultrasound(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'bottom_center' })
  this.animation = new jaws.Animation({ sprite_sheet: 'images/ultrasound3x30x36.png', frame_size: [30,36], frame_duration: 120 })
  this.setImage(this.animation.frames[0])
  this.action = function() {
    this.activated = (this.activated ? false : true)
  };
  this.update = function() {
    if (this.activated) {
      this.setImage(this.animation.next());
    }
  };
}
Ultrasound.prototype = jaws.Sprite.prototype

function Company(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'bottom_center' })
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/company2x150x300.png", frame_size: [150,300], anchor: 'bottom_center'})
  this.setImage(this.sprite_sheet.frames[0])
  this.action = function() {
    this.activated = (this.activated ? false : true)
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]))
  };
}
Company.prototype = jaws.Sprite.prototype

function House(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'bottom_center' })
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/house2x250x200.png", frame_size: [250,200]})
  this.setImage(this.sprite_sheet.frames[0])
  this.action = function() {
    this.activated = (this.activated ? false : true)
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]))
  };
}

House.prototype = jaws.Sprite.prototype

jaws.onload = function() {
  jaws.assets.add("objects.json");
  jaws.assets.add("images/map.png");
  jaws.assets.add("images/penguin2x17x24.png");
  jaws.assets.add("images/ultrasound3x30x36.png");
  jaws.assets.add("images/company2x150x300.png");
  jaws.assets.add("images/house2x250x200.png");
  jaws.assets.add("images/tuza_sprite2.png");
  jaws.start(PlayState);
};
