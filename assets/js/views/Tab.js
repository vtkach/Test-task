;(function (app, B) {

    app.views.TabView = B.View.extend({

        events: {

        },

        initialize: function (options) {
            this.render(options);
        },



        render: function (opts) {
            this.$el.html(app.JST.content(opts));

            return this;
        }

    });

} (window.app, Backbone));