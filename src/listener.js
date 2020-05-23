var listen = {};

listen.allListeners = {
	always: {},
	once: {},
};

listen.getListenId = function(obj) {
	var id = obj.cid || (obj.cid = _.uniqueId('obj'));
	return id;
}

listen.setObjListeners(obj) {
	var id = this.getListenId(obj);
	if(!this.allListeners.always[id]) {
		this.allListeners.always[id] = [];
	}
	if(!this.allListeners.once[id]) {
		this.allListeners.once[id] = [];
	}
}

listen.addListenToAlways = function(obj, event, callback, apply=true) {
	var id = this.getListenId(obj);
	this.allListeners.always[id].push([obj, event, callback]);

	if(apply) {
		this.listenTo(obj, event, callback);
	}
}

listen.addListenToOnce = function(obj, event, callback, apply=true) {
	var id = this.getListenId(obj);
	this.allListeners.once[id].push([obj, event, callback]);

	if(apply) {
		this.listenToOnce(obj, event, callback);
	}
}

listen.stopListeners = function(obj=null) {
	if(!obj) {
		return view.stopListening();
	}

	
}