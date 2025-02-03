export const Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function(options) {
        // Usamos history.pushState en lugar de hash si está disponible
        this.mode = options && options.mode && options.mode === 'history' && !!history.pushState ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function() {
        let fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    add: function(path, callback) {
        this.routes.push({ path, callback });
        return this;
    },
    check: function() {
        const current = this.getFragment();
        if (current === this.last) return; // 🚀 PREVENIR LLAMADAS REPETIDAS
        this.last = current;
        this.routes.some(route => {
            const match = current.match(route.path);
            if (match) {
                match.shift();
                route.callback.apply({}, match);
                return true;
            }
            return false;
        });
    },
    listen: function() {
        let self = this;
        let current = self.getFragment();
        const fn = function() {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check();
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function(path = '') {
        path = this.clearSlashes(path);
        if (this.mode === 'history') {
            const currentPath = this.getFragment();
            if (currentPath === path) return;
            history.pushState(null, null, this.root + path); // Esto cambia la URL sin recargar
        } else {
            if (window.location.hash === '#' + path) return;
            window.location.hash = path;
        }
        this.check();
        return this;
    }
};
