/**
 * Router
 *
 * It will serve as a router that uses of bbx.locator to apply a router behavior based on name patterns
 *
 */
import Bb from 'backbone';
import _ from 'underscore-99xp';
import front from 'front-99xp';
import utils from './utils';

var _shieldData = {};

var checkViewAccess = function (viewName, id, routeData, callback) {
    callback();
};

var baseDir = () => front.baseDir || '';

var router = new (Bb.Router.extend({
    defaultViewName: 'index',
    routePrefixes: {
        public: 'p',
        internal: 'i',
        admin: 'a',
    },
    defaultRouteLoader: 'loadView',
    //    transitionEffect: false,
    //    keepViewsInstance: false,
    routes: {
        '': 'loadView',
    },
    routeViewAlias: {},
    routeViewPathAlias: {},
    checkViewAccessChanged: false,
    authType: {
        public: 0,
        private: 1,
        internal: 2,
    },
    options: {},
    regExpRouteTemplate: '^\\/*{{partial}}{{regexproute}}\\/*(\\?.*)?$',
    regExpRoutes: [
        //        '(?<module>[a-zA-Z\\-]+)',
        //        '(?<module>[a-zA-Z\\-]+)\\\/(?<id>[0-9]+)',
        //        '(?<module>[a-zA-Z\\-]+)\\\/s\\\/(?<suffix>[a-zA-Z\\-]+)',
        '(?<module>[a-zA-Z\\-]+)(\\/s\\/(?<suffix>[a-zA-Z\\-]+))*(\\/(?<id>[0-9]+))*',
        '(?<dir>[a-zA-Z\\-]+\\/)?(?<module>[a-zA-Z\\-]+)(\\/s\\/(?<suffix>[a-zA-Z\\-]+))*(\\/(?<id>[0-9]+))*',
    ],
    initialize() {
        this.route(/(.*)/, 'parseRoute');
    },
    parseRoute() {
        var data = {},
            path = (typeof arguments[0] === 'string' ? arguments[0] : '').split(
                '?'
            )[0];
        !path && (path = null);

        //         var regexp = new RegExp ('(?<module>[a-zA-Z\\-]+)\\\/m\\\/(?<method>[a-zA-Z\\-]+)');
        //         const results = regexp.exec(path);

        const routes = [[true, this.defaultRouteLoader]];

        for (let [prefix, loader] of routes) {
            var partial = typeof prefix === 'string' ? prefix + '\\/' : '';
            for (let x in this.regExpRoutes) {
                let str = _.template(this.regExpRouteTemplate)({
                        partial: partial,
                        regexproute: this.regExpRoutes[x],
                    }),
                    regexp;
                regexp = new RegExp(str);
                let data = regexp.exec(path);
                if (data !== null) {
                    data.groups.path = path;
                    return this[loader](this.setRouteData(data.groups));
                }
            }
        }

        data = { module: this.routeViewPathAlias[path], path };
        return routes[0][1](this.setRouteData(data));
    },
    viewPath2Name(viewPath) {
        if (!typeof viewPath === 'string') {
            viewPath = this.formatViewPath(viewPath);
        }
        return viewPath.camelize();
    },
    formatViewPath(viewPath) {
        return viewPath.join('-');
    },
    setRouteData(data) {
        this.routeData = data;

        var viewPath = [
            data.module && data.module !== 'null'
                ? data.module
                : this.defaultViewName,
        ];
        data.suffix && viewPath.push(data.suffix);
        viewPath = this.formatViewPath(viewPath);

        this.routeData.viewPath = viewPath;
        this.routeData.viewName = this.viewPath2Name(this.routeData.viewPath);
        this.routeData.viewAlias = this.routeData.viewName;

        if (this.routeViewPathAlias[this.routeData.viewPath]) {
            this.routeData.viewName = this.routeViewPathAlias[
                this.routeData.viewPath
            ];
        }
        if (this.routeViewAlias[this.routeData.viewName]) {
            this.routeData.viewName = this.routeViewAlias[
                this.routeData.viewName
            ];
        }

        return this.routeData;
    },
    loadView(data) {
        if (!front.locator.getListItem('view', data.viewName)) {
            front.loadView(data.viewName, (vn) => this.checkView(vn, data.id));
        } else {
            this.checkView(data.viewName, data.id);
        }
    },
    setNames(viewName) {
        var view = front.locator.getListItem('view', viewName);
        view.prototype.moduleName = this.routeData.module.camelize();
        view.prototype.modulePath = this.routeData.module;
        view.prototype.viewPath = this.routeData.path;
        view.prototype.viewAlias = this.routeData.viewAlias;

        return view;
    },
    checkView(viewName, id = null) {
        var view = this.setNames(viewName);
        checkViewAccess(viewName, id, router.getShield(viewName) || {}, () => {
            utils.showView(viewName, id);
        });
    },
    setCheckViewAccess(fn) {
        if (this.checkViewAccessChanged)
            return console.log('cannot set checkViewAccess twice');
        this.checkViewAccessChanged = true;
        checkViewAccess = fn;
    },
    /* Shield */
    setShield(name, data) {
        !(name in _shieldData) && (_shieldData[name] = data);
    },
    getShield(name) {
        return _shieldData[name];
    },
}))();

export default router;
