import _ from 'underscore-99xp';
import bbx from 'backbone-99xp';
import front from 'front-99xp';
import locator from './locator';
import router from './router';
import state from './state';
import utils from './utils';
import validation from './validation';

var bbxf = front;

// backbone extensions
bbxf.collection = bbx.collection.extend();
bbxf.model = bbx.model.extend();
bbxf.view = bbx.view.extend();

// configs
bbxf.model.prototype['formatOnToJSON'] = true;

// locator
for (let x in locator['model']) {
    bbxf.model[x] = locator['model'][x];
}
bbxf.locate = _.bind(bbxf.locator.find, bbxf.locator);
bbxf.iModel = _.bind(_.partial(bbxf.locator.find, 'iModel'), bbxf.locator);

for (let x in locator['model_prototype']) {
    bbxf.model.prototype[x] = locator['model_prototype'][x];
}

for (let x in locator['collection']) {
    bbxf.collection[x] = locator['collection'][x];
}

for (let x in locator['collection_prototype']) {
    bbxf.collection.prototype[x] = locator['collection_prototype'][x];
}

// router
bbxf.router = router;

// security
bbxf.view.Shield = function (options = {}) {
    router.setShield(this.prototype.className, options);
    return this;
};

// state
for (let x in state['model']) {
    bbxf.model[x] = state['model'][x];
}

for (let x in state['model_prototype']) {
    bbxf.model.prototype[x] = state['model_prototype'][x];
}

for (let x in state['collection']) {
    bbxf.collection[x] = state['collection'][x];
}

for (let x in state['collection_prototype']) {
    bbxf.collection.prototype[x] = state['collection_prototype'][x];
}

for (let x in state['view']) {
    bbxf.view[x] = state['view'][x];
}

for (let x in state['view_prototype']) {
    bbxf.view.prototype[x] = state['view_prototype'][x];
}

// validation
bbxf.validation = validation;
bbxf.vmodel = bbxf.model.extend(_.extend({}, bbxf.validation));
// bbxf.vmodel = bbxf.model.extend(_.extend(_.clone(bbxf.validation), {}));

// utils
bbxf.utils = utils;

// load view
bbxf.loadView = async function (v, callback) {
    typeof v === 'string' && (v = { viewName: v });
    const { viewName, viewPath = '' } = v;

    if (typeof bbxf.importView !== 'function') {
        throw new Error('define importView first');
    }

    await bbxf.importView(v);
    typeof callback === 'function' && callback(viewName);
};

export default bbxf;
