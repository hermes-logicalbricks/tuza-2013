function PlayState() {
  // Variables
  var viewport;
  var player;
  var frame;

  var game_objects = new jaws.SpriteList();

  function loadGameObjects(json_file) {
    jaws.log("Cargando objetos", true);
    jaws.assets.get(json_file).forEach( function(item, index) {
      jaws.log("Creando objeto..." + item.type + item, true);
      var game_object = new window[item.type](item);
      jaws.log("Objeto creado...", true);
      game_object.setAnchor("center");
      game_object.rect();
      game_objects.push(game_object);
      jaws.log("Creado " + game_object, true);
    });
    jaws.log("" + game_objects.length + " Objetos del juego creados", true);
  }

  // Before game start
  this.setup = function() {
    // Setting the browser options
    jaws.log("Configurando las opciones del navegador",true);
    jaws.context.mozImageSmoothingEnabled = false;
    jaws.preventDefaultKeys(["w","a", "s","d","space","z","up","down","right","left"]);

    jaws.log("Loading map", true);
    terrain = new jaws.Sprite({x: 0, y: 0, image: 'images/map.png'});
    raw_terrain = terrain.asCanvasContext();
    raw_pixeldata = raw_terrain.getImageData(0, 0, terrain.width, terrain.height).data;

    jaws.log("Configurando el puerto de visualización", true);
    viewport = new jaws.Viewport({max_x: terrain.width, max_y: terrain.height});

    start_pos = [240,2500];
    //start_pos = [800,1200];

    jaws.log("Creando al objeto jugador", true);
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


  this.update = function() {
    var frame = 0;
    if(player.jumping)      { frame = 3 }
    else if(player.vx)      { frame = -1; player.setImage( player.move_anim.next() ) }
    if(frame >= 0)          { player.setImage( player.animation.frames[frame] ) }

    if (!player.walking_baby && player.y < 2400) {
      player.walking_baby = true;
    }
    if (player.walking_baby && player.y < 2300) {
      player.walking_baby = false;
      player.walking_uniform = true;
    }


    player.vx = 0;
    if (jaws.pressed("left"))        { player.vx = -4; player.flipped = 1; }
    else if (jaws.pressed("right"))  { player.vx = +4; player.flipped = 0; }
    if (jaws.pressed("up"))  { if(!player.jumping && player.can_jump) { player.vy = -10; player.jumping = true; player.can_jump = false} }
    else { player.can_jump = true }

    if(jaws.pressed("space")) {
      game_objects.forEach( function(game_object, index) {
        if(player.rect().collideRect(game_object.rect())) {
          if (game_object.type == "End") {
            other_objects = game_objects.filter( function(item,index) { return ( item.type != game_object.type) })
            if( other_objects.every( function(i) {return i.activated}) ) {
              game_object.action && game_object.action();
            } else { message('Debes activar a todos los elementos para activar el final...');}
          } else {
            game_object.action && game_object.action();
          }
        }
      });
    }

    game_objects.forEach( function(game_object, index) {
      if(game_object.hasOwnProperty("update")) { game_object.update(player) }
    });

    applyPhysics(player);
    move(player);

    viewport.x = player.x - jaws.width / 2;
    viewport.y = player.y - jaws.height + 80;
  };


  this.draw = function() {
    jaws.clear();

    viewport.apply( function() {
      terrain.draw();
      game_objects.draw();
      player.draw();
    });
  };
};
