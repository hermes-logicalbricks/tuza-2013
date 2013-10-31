function PlayState() {
  var viewport;
  var raw_terrain, raw_pixeldata;
  var terrain;



  var player;
  var goal;


  this.setup = function() {
    // Setting the browser options
    jaws.log("Configuring browser options");
    jaws.context.mozImageSmoothingEnabled = false;
    jaws.preventDefaultKeys(["w","a", "s","d","space","z","up","down","right","left"]);

    jaws.log("Loading map");
    terrain = new jaws.Sprite({x: 0, y: 0, image: 'images/level1.png'});
    raw_terrain = terrain.asCanvasContext();
    raw_pixeldata = raw_terrain.getImageData(0, 0, terrain.width, terrain.height).data;

    jaws.log("Setting up viewport");
    viewport = new jaws.Viewport({max_x: terrain.width, max_y: terrain.height});

    start_pos = [30*8,240*8];

    jaws.log("Creating player object");
    player = new jaws.Sprite({ x: 20, y: 20, anchor: "center_bottom" });
    player.animation = new jaws.Animation({ sprite_sheet: 'images/tuza_sprite2.png', frame_size: [40,52], frame_duration: 120, subsets: { saltar: [2,4] } });

    player.move_anim = player.animation.slice(0,2);
    player.vx = player.vy = 0;
    player.x = start_pos[0];
    player.y = start_pos[1];
  };

  this.update = function() {
    if(jaws.pressed("up")) {
      player.y -= 2;
      player.setImage(player.animation.subset('saltar').next());
    }

    if(jaws.pressed("left")) {
      player.x -= 2;
      player.setImage(player.move_anim.next());
    }

    if(jaws.pressed("down")) {
      player.y += 2;
      player.setImage(player.animation.subset('saltar').next());
    }

    if(jaws.pressed("right")) {
      player.x += 2;
      player.setImage( player.move_anim.next());
    }

    viewport.x = player.x - jaws.width / 2
    viewport.y = player.y - jaws.height + 100
  };


  this.draw = function() {
    jaws.clear()

    viewport.apply( function() {
      terrain.draw()
      player.draw()
    });
  };

};

jaws.onload = function() {
  jaws.assets.add("images/level1.png");
  jaws.assets.add("images/tuza_sprite2.png");
  jaws.start(PlayState);
};
