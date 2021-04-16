import _ from 'underscore-99xp';
import bbxf from '../define';

export default bbxf.vmodel.extend({
    idAttribute: '_filterId',
    format: {},
    defaults: {},
    sendEmptyFilter: {},
    setCols(o) {
        if (!o) return;
        this.attributes = {};
        this.cols = o;
        _.each(o, (col) => {
            if (col.default && !this.get(col.name)) {
                this.set(col.name, col.default);
                this.defaults[col.name] = col.default;
            }
            col.format && (this.format[col.name] = col.format);
            this.sendEmptyFilter[col.name] = col.sendEmpty || false;
        });
    },
});
