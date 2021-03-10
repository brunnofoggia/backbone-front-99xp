import _ from 'underscore-99xp';
import bbxf from '../define';

export default bbxf.collection.extend({
    sendEmptyFilter: {},
    sync(method, model, options) {
        if (this.filterOnServer) {
            method = 'create';
            options.attrs = this.prepareFilterValues(this.filter.toJSON());
            options.url = this.url();
        }

        _.bind(bbxf.collection.prototype.sync, this)(method, model, options);
    },
    prepareFilterValues(d) {
        var j = {};
        if (_.size(d) > 0) {
            for (var x in d) {
                if (!(d[x] + '').trim() == '') {
                    j[x] = d[x];
                } else if (this.filter.sendEmptyFilter[x] !== false) {
                    j[x] = '';
                }
            }
        }

        return j;
    },
});
