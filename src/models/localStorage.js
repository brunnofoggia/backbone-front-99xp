import _ from 'underscore-99xp';
import bbxf from '../define';

export default bbxf.vmodel.extend({
    storedAttributes: [],
    setOnLocalStorage(a, v) {
        if (
            _.isArray(this.storedAttributes) &&
            _.indexOf(this.storedAttributes, a) < 0
        )
            return;
        localStorage.setItem(this.className + '.' + a, v || '');
    },
    readLocalStorage() {
        if (_.isArray(this.storedAttributes))
            for (var k of this.storedAttributes) {
                this.attributes[k] =
                    localStorage.getItem(this.className + '.' + k) || '';
            }
    },
    updateLocalStorage() {
        if (_.isArray(this.storedAttributes))
            for (var k of this.storedAttributes) {
                this.setOnLocalStorage(k, this.attributes[k] || '');
            }
    },
    initialize(o) {
        this.readLocalStorage();
        this.on('sync', () => this.updateLocalStorage());
        bbxf.vmodel.prototype.initialize.call(this, o);
    },
});
