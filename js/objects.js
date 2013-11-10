// Objects of the game
function Penguin(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
    this.animation = new jaws.Animation({ sprite_sheet: 'images/penguin2x17x24.png', frame_size: [17,24], frame_duration: 120 });
    this.setImage(this.animation.frames[0]);
    this.action = function() {
      this.activated = (this.activated ? false : true);
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
    this.animation = new jaws.Animation({ sprite_sheet: 'images/ultrasound3x30x36.png', frame_size: [30,36], frame_duration: 120 });
    this.setImage(this.animation.frames[0]);
    this.action = function() {
      this.activated = (this.activated ? false : true);
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
    this.sprite_sheet = new jaws.SpriteSheet({image:"images/company2x150x300.png", frame_size: [150,300]});
    this.setImage(this.sprite_sheet.frames[0]);
    this.action = function() {
      this.activated = (this.activated ? false : true);
        this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
    };
}
Company.prototype = jaws.Sprite.prototype;

function House(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor: 'center_bottom' });
    this.sprite_sheet = new jaws.SpriteSheet({image:"images/house2x250x200.png", frame_size: [250,200]});
    this.setImage(this.sprite_sheet.frames[0]);
    this.action = function() {
      this.activated = (this.activated ? false : true);
        this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
    };
}
House.prototype = jaws.Sprite.prototype;

function Tucito(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.animation = new jaws.Animation({ sprite_sheet: 'images/tucito2x22x32.png', frame_size: [22,32], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.action = function() {
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
      this.setImage(this.animation.next());
    }
  };

}
Tucito.prototype = jaws.Sprite.prototype;

function Tuzo(options) {
  jaws.Sprite.call(this, { x: options.x, y: options.y, anchor:"center_bottom" });
  this.animation = new jaws.Animation({ sprite_sheet: 'images/tuzo2x40x52.png', frame_size: [40,52], frame_duration: 120 });
  this.setImage(this.animation.frames[0]);
  this.action = function() {
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
  this.sprite_sheet = new jaws.SpriteSheet({image:"images/home2x250x200.png", frame_size: [250,200]});
  this.setImage(this.sprite_sheet.frames[0]);
  this.action = function() {
    this.activated = (this.activated ? false : true);
    this.setImage((this.activated ?  this.sprite_sheet.frames[1] : this.sprite_sheet.frames[0]));
  };
}
Home.prototype = jaws.Sprite.prototype;


