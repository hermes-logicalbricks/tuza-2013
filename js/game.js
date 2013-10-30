function PlayState() {
  var player;
  var goal;


  this.setup = function() {
    player = new jaws.Sprite({ image: "images/bullet.png", x: 20, y: 20 });
    goal = new jaws.Sprite({ image: "images/block.bmp", x: 80, y: 80 });
  };

  this.update = function() {
    player.setImage("images/bullet.png");

    if(jaws.pressed("up")) {
      player.y -= 4;
    }

    if(jaws.pressed("left")) {
      player.x -= 4;
    }

    if(jaws.pressed("down")) {
      player.y += 4;
    }

    if(jaws.pressed("right")) {
      player.x += 4;
    }

    if(jaws.collideOneWithOne(player, goal)) {
      player.setImage("images/bullet1.png");
    }

  };


  this.draw = function() {
    jaws.clear();
    player.draw();
    goal.draw();
  };

};

jaws.onload = function() {
  jaws.assets.add("images/block.bmp");
  jaws.assets.add("images/bullet.png");
  jaws.assets.add("images/bullet1.png");
  jaws.start(PlayState);
};
