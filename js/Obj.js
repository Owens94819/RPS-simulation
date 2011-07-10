
export class Obj {
    obj;
    ctx;
    objective;
    targetObject;
    speed = 2;
    constructor({ id, color, ctx, x, y, objective, backgroundImage }, ...arg) {
        this.id = id
        this.color = color
        this.x = x
        this.y = y
        this.objective = objective
        this.backgroundImage = backgroundImage

        const obj = ctx.createObject();

        this.obj = obj

        obj.obj = this

        this.ctx = ctx

        this.object = obj

        const self = this;
        // console.log(self.objective);
        obj.collide = (obj) => this.collide(obj, self);
        this.mod(obj)
    }
    direct() {
        const obj = this.obj
        // if (this.collided) return this.collided = false;
        if (!obj.isConnected) return;
        const speed = this.speed
        const ctx = this.ctx

        let targetObject = this.targetObject;
        if (!targetObject || !targetObject.isConnected || targetObject.id !== this.objective) {
            this.targetObject = targetObject = this.getObjective();
        }

        if (!targetObject) return

        const ox = targetObject.x;
        const oy = targetObject.y;
        const { x, y } = obj;

        if (x === ox && y === oy) return

        if (ox > x) (x + 10) > ox ? obj.x++ : obj.x += speed;
        if (x > ox) (x - 10) < ox ? obj.x-- : obj.x -= speed;

        if (oy > y) (y + 10) > oy ? obj.y++ : obj.y += speed;
        if (y > oy) (y - 10) < oy ? obj.y-- : obj.y -= speed;

        if (!targetObject) {
            console.log("no objective found");
            return
        }
    }
    collide(o_obj, obj) {
        const _obj = o_obj.obj;
        const ctx = this.ctx

        _obj.objective = this.objective;

        _obj.targetObject && (delete _obj.targetObject.pinned);

        o_obj.id = this.obj.id
        // _obj.id = this.id
        o_obj.color = this.obj.color
        o_obj.backgroundImage = this.obj.backgroundImage
        this.collided = true
    }
    getObjective() {
        const ctx = this.ctx
        let objective = ctx.getAllObjectById(this.objective).find(e => !e.pinned);
        objective && (objective.pinned = true)
        return objective
    }
    async mod(obj) {
        const ctx = this.ctx
        obj.width = obj.height = 20
        obj.id = this.id;
        obj.color = this.color
        obj.x = this.x
        obj.y = this.y
        obj.backgroundImage = this.backgroundImage;
    }
}