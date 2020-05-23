/**
 * Interpretation of structured foreign related data
 */
import _ from 'underscore-99xp';
import front from 'front-99xp';
import Bb from 'backbone';

var obj = {};

obj.jsonPile = false;
obj.removePileLists = false;



obj.get = function(key) {
    if(!/^(\w+)\[/.test(key)) {
        return _.bind(Bb.Model.prototype.get, this)(key);
    }

    return _.deepValueSearch(key, this.attributes);
};

obj.set = function(key, val, options) {
    // backbone inherited code
    if (key == null) return this;
    if((typeof key === 'string' && !/^(\w+)\[/.test(key)) || 
        (typeof key === 'object' && !_.filter(_.keys(key), (k)=>/^(\w+)\[/.test(k)).length)) {
        return _.bind(Bb.Model.prototype.set, this)(key, val, options);
    }

    var attrs;
    if (typeof key === 'object') {
        attrs = key;
        options = val;
    } else {
        (attrs = {})[key] = val;
    }

    options || (options = {});
    var _previousAttributes = _.clone(this.attributes);
    var json = this.createJsonStack(attrs);

    var v = this.validate(json, options);
    if(v!==null) {
        this.validationError = v;
        return false;
    }

    // call backbone set
    // deactivated backbone change trigger. it wont work as it is
    var o = _.extend(_.clone(options), {silent: true});
    var r = _.bind(Bb.Model.prototype.set, this)(json, o);

    // take care of old stack items of a list
    var done = false;
    for(let k in attrs) {
        if(!done && k && /^(\w+)\[/.test(k) && r) {
            this.attributes = _.defaults2(this.attributes, _previousAttributes);
            done = true;
        }
        // common change event
        if(!options.silent) {
            this.trigger('change:'+k, this, attrs[k], options, k);
            // change event for lists
            if(/\[\d+\]/.test(k)) {
                let k2 = k.replace(/\[\d+\]/g, '[]');
                this.trigger('change:'+k2, this, attrs[k], options, k);
            }
        }
    }

    return r;
};

obj.createJsonStack = function(obj, k = '') {
    if (!_.size(obj))
        return obj;

    var json = {};
    for (let x in obj) {
        if (typeof obj[x] === 'object') {
            continue;
        } else if (/^\w+$/.test(x)) {
            json[x] = obj[x];
        } else {
            var y = x.match(/^(\w+)\[/)[1];
            var k = x.replace(/^(\w+)/, '');

            json[y] = this.createJsonKey(k, json[y] || {}, obj[x]);
        }
    }

    return json;
}

obj.createJsonKey = function(k, o, v) {
    if (!k)
        return v;
    else {
        var x = k.match(/^\[(\w+)\]/)[1];
        var y = k.replace(/^\[(\w+)\]/, '');

        // convert object to array if its key is numeric
        /^[0-9]+$/.test(x) && (o = []);

       // console.log('set');
       // console.log(x);
       // console.log(y);
        !o[x] && (o[x] = {});
        o[x] = this.createJsonKey(y, o[x], v);
    }

    return o;
}

obj.parse = function(response, options) {
    if (this.jsonPile !== false) {
        for (var x in response) {
            if (typeof response[x] === 'object' && (typeof this.jsonPile === 'boolean' || _.indexOf(this.jsonPile, x) !== -1)) {
                response = this.createFieldStack(x, response[x], response);
            }
        }
    }

    typeof this.formatData === 'function' && (response = this.formatData(response, options, 0));
    return response;
}

obj.createFieldStack = function(k, o, r) {

    for (var x in o) {
        var str2 = k + '[' + x + ']';

        //        console.log(str2);
        //        console.log(o[x]);
        //        console.log(typeof o[x]);
        if (typeof o[x] === 'object' || typeof o[x] === 'array') {
            this.createFieldStack(str2, o[x], r);
        } else {
            //            console.log('www');
            r[str2] = o[x];
        }
        //        
        //        console.log(str2);
    }

    return r;
}



obj.toJSON = function(options) {
    var clone = _.clone(this.attributes),
        json1 = {},
        json2 = {};

    if(!this.removePileLists) {
        json1 = clone;
    } else {
        for (let x in clone) {
            let listName = x.match(/^\w+/) ? x.match(/^\w+/)[0] : x;
            if (!/^upload/.test(x) && (!this.removePileLists || typeof clone[x] !== 'object') &&
                (typeof this.removePileLists === 'boolean' || _.indexOf(this.removePileLists, listName) === -1)) {

                //            console.log(x);
                //            console.log(clone[x]);
                json1[x] = clone[x];
            } else {
                //            console.log(listName);
                //            console.log(x);
            }
        }
    }

    json1 = typeof this.formatData === 'function' ? this.formatData(json1, options, 1) : json1;
    if (!this.jsonPile) return json1;

    json2 = this.createJsonStack(json1);

    return json2;
}

export default obj;