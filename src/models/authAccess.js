import _ from 'underscore-99xp';
import front from 'front-99xp';
import bbx from '../backbone';

export default bbx.model.extend(_.extend(_.clone(bbx.validation), {
    idAttribute: 'path',
    titleAttribute: 'path',
    urlRoot() {
        if(/^\//.test(this.id)) this.id = this.id.substr(1);
        return front.envUrl('auth/authorize/', true)+this.id+'?_=';
    },
    isAuthorized() {
        return this.isReady() && this.get('authorization')===true;
    }
})).Mark('authAccess');
