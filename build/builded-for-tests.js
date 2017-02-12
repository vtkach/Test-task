window.app = {
    routers: {},
    models: {},
    views: {},
    JST: {}
};
this["app"]["JST"]["category"] = function(obj) {obj || (obj = {});var __t, __p = '', __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<ul class="flex-container shift">\r\n    '; _.each(tabs, function (tab) { ;__p += '\r\n        <li><label for="directory/' +((__t = (category)) == null ? '' : __t) +'/' +((__t = (tab.toLowerCase())) == null ? '' : __t) +'">' +((__t = (tab )) == null ? '' : __t) +'</label></li>\r\n    '; }); ;__p += '\r\n</ul>\r\n<section class="main-content"></section>';}return __p};
this["app"]["JST"]["content"] = function(obj) {obj || (obj = {});var __t, __p = '';with (obj) {__p += '<input id="directory/' +((__t = (category)) == null ? '' : __t) +'/' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'" name="' +((__t = (category)) == null ? '' : __t) +'-group" type="radio">\r\n\r\n<ul>\r\n    <li>\r\n        <input name="subcategory-' +((__t = (category)) == null ? '' : __t) +'" id="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-shipping" type="checkbox"/>\r\n        <header class="flex-container aligning">\r\n            <div class="caret">▽</div>\r\n            <h2><label for="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-shipping">Shipping ' +((__t = (category)) == null ? '' : __t) +' ' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'</label></h2>\r\n        </header>\r\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur earum esse iusto\r\n            labore maiores quis rem voluptatem voluptatibus! Adipisci cum delectus impedit magni nisi rerum\r\n            tempore tenetur vel?</p>\r\n    </li>\r\n    <li>\r\n        <input name="subcategory-' +((__t = (category)) == null ? '' : __t) +'" id="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-billing" type="checkbox"/>\r\n        <header class="flex-container aligning">\r\n            <div class="caret">▽</div>\r\n            <h2><label for="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-billing">Billing ' +((__t = (category)) == null ? '' : __t) +' ' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'</label></h2>\r\n        </header>\r\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur earum esse iusto\r\n            labore maiores quis rem voluptatem voluptatibus! Adipisci cum delectus impedit magni nisi rerum\r\n            tempore tenetur vel?</p>\r\n    </li>\r\n    <li>\r\n        <input name="subcategory-' +((__t = (category)) == null ? '' : __t) +'" id="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-home" type="checkbox"/>\r\n        <header class="flex-container aligning">\r\n            <div class="caret">▽</div>\r\n            <h2><label for="' +((__t = (category)) == null ? '' : __t) +'-' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'-home">Home ' +((__t = (category)) == null ? '' : __t) +' ' +((__t = (tab.toLowerCase() )) == null ? '' : __t) +'</label></h2>\r\n        </header>\r\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias consequatur earum esse iusto\r\n            labore maiores quis rem voluptatem voluptatibus! Adipisci cum delectus impedit magni nisi rerum\r\n            tempore tenetur vel?</p>\r\n    </li>\r\n</ul>';}return __p};
this["app"]["JST"]["main"] = function(obj) {obj || (obj = {});var __t, __p = '', __j = Array.prototype.join;function print() { __p += __j.call(arguments, '') }with (obj) {__p += '<div class="flex-container main-container">\r\n    <aside>\r\n        <nav>\r\n            <ul class="sidebar">\r\n                '; _.each(data, function (elem, index) { ;__p += '\r\n                    <li><a href=\'#directory/' +((__t = ( index.toLowerCase() )) == null ? '' : __t) +'\'>' +((__t = ( index )) == null ? '' : __t) +'</a></li>\r\n                '; }); ;__p += '\r\n            </ul>\r\n        </nav>\r\n    </aside>\r\n    <main>\r\n        '; _.each(data, function (elem, index) { ;__p += '\r\n            <section id=\'directory/' +((__t = ( index.toLowerCase() )) == null ? '' : __t) +'\'></section>\r\n        '; }); ;__p += '\r\n    </main>\r\n</div>';}return __p};
;(function (app, B) {

    app.models.MainModel = B.Model.extend({

        url: 'assets/data.json',

        initialize: function () {
            this.listenTo(B, 'save-to-storage', this.savePreferencies);
        },

        savePreferencies: function (isChecked, id) {
            var topics = localStorage.getItem('choosen-topics'),
                splitted = topics && topics.split(', ') || [],
                selector = '#' + id,
                result;

            if (isChecked) {
                splitted.push(selector);
                result = splitted.join(', ');
            } else {
                result = _.without(splitted, selector).join(', ');
            }

            localStorage.setItem('choosen-topics', result);
        }

    });

} (window.app, Backbone));

;(function (app, B) {

    app.views.TabView = B.View.extend({

        initialize: function (options) {
            this.render(options);
        },

        render: function (opts) {
            this.$el.html(app.JST.content(opts));

            return this;
        }

    });

} (window.app, Backbone));
;(function (app, $, B) {

    app.views.CategoryView = B.View.extend({

        events: {
            'change [type=checkbox]': 'toggleDescription',
            'change [type=radio]': 'changeActive'
        },

        changeActive: function (event) {
            this.$('.shift > li').removeClass('active');
            app.router.navigate(event.target.id, { trigger: true });
            this.$('[for="' + event.target.id + '"]').parent().addClass('active');
            this.$('.visible').removeClass('visible');
        },

        initialize: function (options) {
            this.render(options);
        },

        renderTab: function (opts, tab) {
            var view = new app.views.TabView({
                category: opts.category,
                tab: tab
            });

            this.$('.main-content').append(view.el);
        },

        toggleDescription: function (event) {
            B.trigger('save-to-storage', event.target.checked, event.target.id);
        },

        renderTabs: function (opts) {
            var tabsInfo = opts.data[this.capitalize(opts.category)].tabs;

            _.each(tabsInfo, this.renderTab.bind(this, opts));
        },

        capitalize: function (str) {
            return str.replace(/^./, str[0].toUpperCase());
        },

        setActiveTab: function (category, tabName) {
            this.$('[id^="directory/' + category + tabName).next().addClass('visible');
        },

        buildSelector: function (tab) {
            return (tab) ? '/' + tab + '"]' : '"]:first';
        },

        render: function (opts) {
            var selectedTab = this.buildSelector(opts.tab),
                category = opts.category,
                tabInfo = opts.data[this.capitalize(category)];

            this.$el.html(app.JST.category(_.extend(tabInfo, { category: category }))).addClass('visible');
            this.renderTabs(opts);
            this.setActiveTab(category, selectedTab);

            return this;
        }

    });

} (window.app, $, Backbone));
;(function (app, $, B) {

    app.views.MainView = B.View.extend({

        el: 'body',

        events: {
            'click .sidebar > li': 'changeActive'
        },

        changeActive: function (event) {
            this.$('.sidebar > li').removeClass('active');
            $(event.currentTarget).addClass('active');
            this.$('main > section').removeClass('visible');
            location.hash += ' ';
        },

        initialize: function (goods, tab) {
            var promise;

            this.model = new app.models.MainModel();

            promise = this.model.fetch().done(this.render.bind(this));
            (goods) && promise.done(this.renderSubView.bind(this, goods, tab));
        },

        setActiveTabs: function (sub, tab) {
            this.$('[for*="directory/' + sub + '/' + tab + '"]')
                .parent()
                .add(this.$('[href$="' + sub + '"]').parent())
                .addClass('active');
            this.$(localStorage.getItem('choosen-topics') + ', ' + '[id*="directory/' + sub + '/' + tab + '"]')
                .attr('checked', true);
        },

        renderSubView: function (subRoute, tab) {
            new app.views.CategoryView({
                el: this.$('section[id^="directory/' + subRoute + '"]'),
                data: this.model.get('data'),
                category: subRoute,
                tab: tab
            });

            this.setActiveTabs(subRoute, tab);
        },

        render: function (data) {
            this.$el.html(app.JST.main(data));

            return this;
        }

    });

} (window.app, $, Backbone));

;(function (app, B) {

    app.routers.Router = B.Router.extend({

        _mainView: null,

        routes: {
            'directory/:goods/:tab': 'renderGoods',
            'directory/:goods': 'renderGoods',
            '': 'renderByDefault'
        },

        renderGoods: function (subRoute, tab) {
            if (this._mainView) {
                this._mainView.renderSubView(subRoute, tab);
            } else {
                this._mainView = new app.views.MainView(subRoute, tab);
            }
        },

        renderByDefault: function () {
            this._mainView = new app.views.MainView('products', 'general');
        }

    });

} (window.app, Backbone));
$(function () {
    app.router = new app.routers.Router();

    Backbone.history.start();
});