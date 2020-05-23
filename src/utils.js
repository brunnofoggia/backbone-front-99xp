/**
 * 
 */
import _ from 'underscore-99xp';
import front from 'front-99xp';

var utils = {};

utils.showView = async function(view, id=null, callback=null) {
    var viewClass = view;
    if(typeof view === 'string') {
        viewClass = await this.getView(view);
    }
    
    var viewObj = typeof view === 'string' ? (new viewClass({id: id})) : view,
            App = front.locator.getItem('iApp');
    
    typeof callback === 'function' && (viewObj.callback = callback);
    App.showContent(viewObj);
    return viewObj;
};

export default utils;
