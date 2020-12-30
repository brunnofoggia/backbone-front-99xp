import _ from 'underscore-99xp';
import front from 'front-99xp';
import bbxf from '../backbone';

export default bbxf.model.extend(_.extend(_.clone(bbxf.validation), {
    idAttribute: 'path',
    titleAttribute: 'path',
    urlRoot() {
        if(/^\//.test(this.id)) this.id = this.id.substr(1);
        return front.envUrl('auth/authorize/', true)+this.id+'?_=';
    },
    isAuthorized() {
        return this.isReady()===true && this.get('authorization')===true;
    }
})).Mark('authAccess');
