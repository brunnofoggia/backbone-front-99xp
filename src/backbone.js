import bbx from 'backbone-99xp';
import locator from './locator';
import router from './router';
import state from './state';
import utils from './utils';
import validation from './validation';

var bbxf = {};

// backbone extensions
bbxf.collection = bbx.collection.extend();
bbxf.model = bbx.model.extend();
bbxf.view = bbx.view.extend();

// configs
bbxf.model.prototype['formatOnToJSON'] = true;

// locator
bbxf.locator = locator;
for(let x in locator['model']) {
	bbxf.model[x] = locator['model'][x];
}

for(let x in locator['model_prototype']) {
	bbxf.model.prototype[x] = locator['model_prototype'][x];
}

for(let x in locator['collection']) {
	bbxf.collection[x] = locator['collection'][x];
}

for(let x in locator['collection_prototype']) {
	bbxf.collection.prototype[x] = locator['collection_prototype'][x];
}

// router
bbxf.router = router;

// security
bbxf.view.Shield = function(options={}) {
    router.setShield(this.prototype.className, options);
    return this;
}

// state
for(let x in state['model']) {
	bbxf.model[x] = state['model'][x];
}

for(let x in state['model_prototype']) {
	bbxf.model.prototype[x] = state['model_prototype'][x];
}

for(let x in state['collection']) {
	bbxf.collection[x] = state['collection'][x];
}

for(let x in state['collection_prototype']) {
	bbxf.collection.prototype[x] = state['collection_prototype'][x];
}

for(let x in state['view']) {
	bbxf.view[x] = state['view'][x];
}

for(let x in state['view_prototype']) {
	bbxf.view.prototype[x] = state['view_prototype'][x];
}

// validation
bbxf.validation = validation;

// utils
bbxf.utils = utils;

export default bbxf;