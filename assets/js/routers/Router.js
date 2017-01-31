;(function (app, $, B) {

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
            this._mainView = new app.views.MainView();
        }

    });

} (window.app, $, Backbone));