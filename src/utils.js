/**
 *
 */
import _ from 'underscore-99xp';
import front from 'front-99xp';

var utils = _.extend({}, front.utils);

utils.showView = async function (view, id = null, callback = null) {
    var viewClass = view;
    if (typeof view === 'string') {
        viewClass = await this.getView(view);
    }

    var viewObj = typeof view === 'string' ? new viewClass({ id: id }) : view,
        App = front.locator.getItem('iApp');

    typeof callback === 'function' && (viewObj.callback = callback);
    App.showContent(viewObj);
    return viewObj;
};

utils.getView = async function (view) {
    if (!front.locator.getListItem('view', view)) {
        await front.importView(view);
    }
    var viewClass = front.locator.getListItem('view', view);

    return viewClass;
};

export default utils;
