module managers {
  export class Bullet {
    // private Instance Variables
    private _bulletCount:number;

    // public properties
    public Bullets: objects.Bullet[];
    public currentBullet: number;

    // constructors
    constructor() {
      this.Start();
    }

    // private methods
    private _buildBulletArray():void {
      for (let count = 0; count < this._bulletCount; count++) {
        this.Bullets[count] = new objects.Bullet();
        this.Bullets[count].Reset();
        //managers.Game.currentSceneObject.addChild(this.Bullets[count]);
      }
    }


    // public methods
    public Start():void {
      // start with 50 bullets
      this._bulletCount = 50;

      // create an empty bullet Array
      this.Bullets = new Array<objects.Bullet>();

      // Build the bullet pool
      this._buildBulletArray();

      // set the currentBullet
      this.currentBullet = 0
    }

    public Update():void {
      this.Bullets.forEach(bullet => {
        bullet.Update();
      });
    }

  }
}
