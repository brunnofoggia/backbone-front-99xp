
import Bb from 'backbone';

import formatter from './formatter';
import helpers from './helpers';
import jsonpile from './json_pile_html';
import locator from './locator';
import pretriggers from './pretriggers';
import router from './router';
import state from './state';
import utils from './utils';
import validation from './validation';

var bbx = {};

// backbone extensions
bbx.collection = Bb.Collection.extend();
bbx.model = Bb.Model.extend();
bbx.view = Bb.View.extend();


// formatter
for(let x in formatter['model']) {
	bbx.model.prototype[x] = formatter['model'][x];
}

for(let x in formatter['collection']) {
	bbx.collection.prototype[x] = formatter['collection'][x];
}

// helpers
for(let x in helpers['model_prototype']) {
	bbx.model.prototype[x] = helpers['model_prototype'][x];
}

// jsonpile
for(let x in jsonpile) {
	bbx.model.prototype[x] = jsonpile[x];
}

// locator
bbx.locator = locator;
for(let x in locator['model']) {
	bbx.model[x] = locator['model'][x];
}

for(let x in locator['model_prototype']) {
	bbx.model.prototype[x] = locator['model_prototype'][x];
}

for(let x in locator['collection']) {
	bbx.collection[x] = locator['collection'][x];
}

for(let x in locator['collection_prototype']) {
	bbx.collection.prototype[x] = locator['collection_prototype'][x];
}

// pretriggers
bbx.view.prototype.pretriggers = [];
bbx.collection.prototype.pretriggers = [];
bbx.model.prototype.pretriggers = [];
bbx.view.prototype.preinitialize = bbx.collection.prototype.preinitialize = bbx.model.prototype.preinitialize = pretriggers;

// router
bbx.router = router;

// security
bbx.view.Shield = function(options={}) {
    router.setShield(this.prototype.className, options);
    return this;
}

// state
for(let x in state['model']) {
	bbx.model[x] = state['model'][x];
}

for(let x in state['model_prototype']) {
	bbx.model.prototype[x] = state['model_prototype'][x];
}

for(let x in state['collection']) {
	bbx.collection[x] = state['collection'][x];
}

for(let x in state['collection_prototype']) {
	bbx.collection.prototype[x] = state['collection_prototype'][x];
}

for(let x in state['view']) {
	bbx.view[x] = state['view'][x];
}

for(let x in state['view_prototype']) {
	bbx.view.prototype[x] = state['view_prototype'][x];
}

// validation
bbx.validation = validation;

// utils
bbx.utils = utils;

export default bbx;