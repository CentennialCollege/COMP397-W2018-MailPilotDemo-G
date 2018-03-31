var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // constructors
        function Bullet() {
            this.Start();
        }
        // private methods
        Bullet.prototype._buildBulletArray = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.Bullet();
                this.Bullets[count].Reset();
                //managers.Game.currentSceneObject.addChild(this.Bullets[count]);
            }
        };
        // public methods
        Bullet.prototype.Start = function () {
            // start with 50 bullets
            this._bulletCount = 50;
            // create an empty bullet Array
            this.Bullets = new Array();
            // Build the bullet pool
            this._buildBulletArray();
            // set the currentBullet
            this.currentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map