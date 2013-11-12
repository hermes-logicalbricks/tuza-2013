// Objects of the game
function Penguin(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/penguin2x17x24.png', frame_size: [17,24], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
  };
  this.update = function(player) {
    if (this.activated) {
      this.setImage(this.animation.next());
    }
  };
}
Penguin.prototype = jaws.Sprite.prototype;

function Ultrasound(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/ultrasound3x30x36.png', frame_size: [30,36], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
  };
  this.update = function(player) {
    if (this.activated) {
      this.setImage(this.animation.next());
    }
  };
}
Ultrasound.prototype = jaws.Sprite.prototype;

function Company(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/company2x150x300.png", frame_size: [150,300]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
Company.prototype = jaws.Sprite.prototype;

function House(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/house2x250x200.png", frame_size: [250,200]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
House.prototype = jaws.Sprite.prototype;

function Tucito(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/tucito4x40x32.png', frame_size: [40,32], frame_duration: 120 });
  // Another animation
  this.truckle = this.animation.slice(0,2);
  this.walking = this.animation.slice(2,4);

  this.setImage(this.animation.frames[0]);
  this.action = function() {
    if (!this.activated) { this.text && message(this.text); }
    this.activated = true;
  };

  this.update = function(player) {
    if (this.activated) {
      this.flipped = player.flipped;
      if(player.vy == -10 ) {
        this.vy = player.vy;
        this.jumping = player.jumping;
        this.can_jump = player.can_jump;
      }
      this.vx = player.vx;
      applyPhysics(this);
      move(this);
      this.y = player.y - 15;
      if (player.walking_baby) { this.setImage(this.walking.next());}
      else { this.setImage(this.truckle.next()); }
    }
  };

}
Tucito.prototype = jaws.Sprite.prototype;

function Tuzo(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/tuzo2x40x52.png', frame_size: [40,52], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.action = function() {
    if (!this.activated) { this.text && message(this.text);}
    this.activated = true;
  };

  this.update = function(player) {
    if (this.activated) {
      this.flipped = player.flipped;
      if(player.vy == -10 ) {
        this.vy = player.vy;
        this.jumping = player.jumping;
        this.can_jump = player.can_jump;
      }
      this.vx = player.vx;
      applyPhysics(this);
      move(this);
      this.y = player.y - 25;
      this.setImage(this.animation.next());
    }
  };

}
Tuzo.prototype = jaws.Sprite.prototype;

function Home(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: "center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/home2x250x200.png", frame_size: [250,200]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
Home.prototype = jaws.Sprite.prototype;

function Boy(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: "center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/boy2x34x48.png", frame_size: [34,48]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
Boy.prototype = jaws.Sprite.prototype;

function ArrowRight(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: "center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/arrow-right1x41x30.png", frame_size: [41,30]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.activated = true;
  this.action = function() {
    this.text && message(this.text);
  };
}
ArrowRight.prototype = jaws.Sprite.prototype;

function ArrowLeft(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: "center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/arrow-left1x41x30.png", frame_size: [41,30]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.activated = true;
  this.action = function() {
    this.text && message(this.text);
  };
}
ArrowLeft.prototype = jaws.Sprite.prototype;

function Cake(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/cake4x100x100.png', frame_size: [100,100], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.animation_fire = this.animation.slice(1,5);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
  };

  this.update = function(player) {
    if (this.activated) {
      this.setImage(this.animation_fire.next());
    }
  };

}
Cake.prototype = jaws.Sprite.prototype;

function Hospital(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
  this.type = options.type
  this.text = options.text;
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/hospital2x225x138.png", frame_size: [225,138]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
Hospital.prototype = jaws.Sprite.prototype;

function End(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.type = options.type
  this.text = options.text;
  this.animation = new jaws.Animation({ sprite_sheet: 'images/end5x500x500.png', frame_size: [500,500], frame_duration: 240 });
  this.setImage(this.animation.frames[0]);
  this.animation_fire = this.animation.slice(1,6);
  this.action = function() {
    this.text && message(this.text);
    this.activated = true;
  };

  this.update = function(player) {
    if (this.activated) {
      this.setImage(this.animation_fire.next());
    }
  };

}
End.prototype = jaws.Sprite.prototype;

