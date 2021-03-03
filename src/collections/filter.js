import _ from 'underscore-99xp';
import bbxf from '../define';

export default bbxf.collection.extend({
    sync(method, model, options) {
        if (this.filterOnServer) {
            method = 'create';
            options.attrs = this.filter.toJSON();
            options.url = this.url();
        }

        _.bind(bbxf.collection.prototype.sync, this)(method, model, options);
    },
});
