var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // Constructor
        function Plane() {
            var _this = _super.call(this, "plane") || this;
            _this.Start();
            return _this;
        }
        // private methods
        Plane.prototype._animationEnded = function () {
            if (this.alpha == 0) {
                this.alpha = 1;
                this.planeFlash.alpha = 0;
            }
        };
        // public methods
        // Initializes variables and creates new objects
        Plane.prototype.Start = function () {
            this.BulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight - 2);
            this.planeFlash = new objects.PlaneFlash();
            this.planeFlash.alpha = 1;
            this.planeFlash.on("animationend", this._animationEnded.bind(this), false);
            this.x = 320;
            this.y = 430;
        }; // Start end
        // updates the game object every frame
        Plane.prototype.Update = function () {
            this.Move();
            this.BulletFire();
            this.CheckBounds();
        }; // Update End
        // reset the objects location to some value
        Plane.prototype.Reset = function () {
        }; // Reset End
        // move the object to some new location
        Plane.prototype.Move = function () {
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
        }; // Move End
        Plane.prototype.BulletFire = function () {
            var ticker = createjs.Ticker.getTicks();
            if (this.alpha == 1) {
                if ((managers.Game.keyboardManager.fire) && (ticker % 10 == 0)) {
                    this.BulletSpawn = new math.Vec2(this.x, this.y - this.halfHeight - 2);
                    managers.Game.BulletManager.Bullets[managers.Game.BulletManager.currentBullet].x = this.BulletSpawn.x;
                    managers.Game.BulletManager.Bullets[managers.Game.BulletManager.currentBullet].y = this.BulletSpawn.y;
                    managers.Game.BulletManager.currentBullet++;
                    if (managers.Game.BulletManager.currentBullet > 49) {
                        managers.Game.BulletManager.currentBullet = 0;
                    }
                } // inner if end
            } // outer if end
        }; // bulletfire end
        // check to see if some boundary has been passed
        Plane.prototype.CheckBounds = function () {
            // right boundary
            if (this.x >= 640 - this.halfWidth) {
                this.x = 640 - this.halfWidth;
            }
            // left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map