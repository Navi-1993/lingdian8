import MyRequest from './core/index';
import Tools from './tools';

function createInstance () {
    const ctx = new MyRequest();
    let instance;

    instance = MyRequest.prototype.request.bind(ctx);
    instance = Tools.extend(instance, MyRequest.prototype, ctx);
    instance = Tools.extend(instance, ctx);

    return instance;
}

function create () {
    return createInstance();
}

export default create;
