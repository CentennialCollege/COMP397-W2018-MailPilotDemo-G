module objects {
  export class Bullet extends objects.GameObject {
    // private instance variables

    // public properties

    // constructors
    constructor() {
      super("bullet");
      this.Start();
    }

    // private methods

    // public methods
    public Start(): void {
      this._dy = -10;
      this._dx = 0;
      this.Reset();
      this.Update();
    }

    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public Reset():void {

    }

    public CheckBounds():void {
      if(this.y <= -this.height) {
        this.Reset();
      }
      else {
        this.Update();
      }
    }

    public Move():void {
      this.y += this._dy;
    }

  }
}
