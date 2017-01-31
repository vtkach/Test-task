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
            Backbone.trigger('save-to-storage', event.target.checked, event.target.id);
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

        render: function (opts) {
            var selectedTab = opts.tab ? '/' + opts.tab + '"]' : '"]:first',
                tabInfo = opts.data[this.capitalize(opts.category)];

            this.$el.html(app.JST.category(_.extend(tabInfo, { category: opts.category }))).addClass('visible');
            this.renderTabs(opts);
            this.setActiveTab(opts.category, selectedTab);

            return this;
        }

    });

} (window.app, $, Backbone));