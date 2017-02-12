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
