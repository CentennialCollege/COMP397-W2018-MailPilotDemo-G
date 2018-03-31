module objects {
  export class Plane extends objects.GameObject {
    // private instance variables

    // public properties
    public planeFlash: objects.PlaneFlash;
    public BulletSpawn: math.Vec2;

    // Constructor
    constructor() {
      super("plane");
      this.Start();
    }

    // private methods
    private _animationEnded(): void {
      if (this.alpha == 0) {
        this.alpha = 1;
        this.planeFlash.alpha = 0;
      }
    }

    // public methods

    // Initializes variables and creates new objects
    public Start(): void {
      this.BulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight - 2);

      this.planeFlash = new objects.PlaneFlash();
      this.planeFlash.alpha = 1;
      this.planeFlash.on("animationend", this._animationEnded.bind(this), false);

      this.x = 320;
      this.y = 430;
    } // Start end

    // updates the game object every frame
    public Update(): void {
      this.Move();
      this.BulletFire();
      this.CheckBounds();
    } // Update End

    // reset the objects location to some value
    public Reset(): void {

    } // Reset End

    // move the object to some new location
    public Move(): void {
      // mouse controls
      // this.x = objects.Game.stage.mouseX;

      // keyboard controls
      if (managers.Game.keyboardManager.moveLeft) {
        this.x -= 5;
      } //end

      if (managers.Game.keyboardManager.moveRight) {
        this.x += 5;
      } //end

      this.planeFlash.x = this.x;
      this.planeFlash.y = this.y;

    }// Move End

    public BulletFire(): void {
      let ticker: number = createjs.Ticker.getTicks();

      if (this.alpha == 1) {
        if ((managers.Game.keyboardManager.fire) && (ticker % 10 == 0)) {
          this.BulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight - 2);
          managers.Game.BulletManager.Bullets[managers.Game.BulletManager.currentBullet].x = this.BulletSpawn.x;
          managers.Game.BulletManager.Bullets[managers.Game.BulletManager.currentBullet].y = this.BulletSpawn.y;
          managers.Game.BulletManager.currentBullet++;
          if(managers.Game.BulletManager.currentBullet > 49) {
            managers.Game.BulletManager.currentBullet = 0;
          }
        } // inner if end
      } // outer if end
    } // bulletfire end

    // check to see if some boundary has been passed
    public CheckBounds(): void {
      // right boundary
      if (this.x >= 640 - this.halfWidth) {
        this.x = 640 - this.halfWidth;
      }

      // left boundary
      if (this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }
    }

  }
}
