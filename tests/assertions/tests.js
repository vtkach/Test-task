QUnit.module("MainView.js", {

    before: function () {
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) {
            this.response = xhr;
        };
        sinon.spy(app.views.MainView.prototype, 'render');
        sinon.spy(app.views.MainView.prototype, 'renderSubView');
        this.answer = '{"data":{"Products":{"tabs":["General","Adress","Order"]},"Customers":{"tabs":["General","Adress","Order"]},"Orders":{"tabs":["General","Adress","Order"]},"News":{"tabs":["General","Adress","Order"]}}}';
        this.parsedAnswer = JSON.parse(this.answer);
        this.makeResponse = function () {
            this.xhr.response.respond(200, {
                    "Content-Type": "application/json"
                }, this.answer
            );
        }.bind(this);
    },

    after: function () {
        app.views.MainView.prototype.render.restore();
        app.views.MainView.prototype.renderSubView.restore();
        this.xhr.restore();
    }

});

QUnit.test("mainView.initialize", function (assert) {
    this.view = new app.views.MainView();
    this.makeResponse();

    assert.ok(this.view, "View doesn't exist");
    assert.ok(this.view.render.called, "Render hasn't called");
    assert.ok(
        this.view.render.calledWith(this.parsedAnswer),
        "Called render without needed data"
    );
});

QUnit.test("mainView.initialize with routes", function (assert) {
    var category = 'news', tab = 'address';

    this.view = new app.views.MainView(category, tab);
    this.makeResponse();

    assert.ok(this.view, "View doesn't exist");
    assert.ok(this.view.render.called, "Render hasn't called");

    assert.ok(
        this.view.render.calledWith(this.parsedAnswer),
        "Called render without needed data"
    );
    assert.ok(
        this.view.renderSubView.calledWith(category, tab),
        "Called renderSubView without needed data"
    );
});

QUnit.test("mainView.setActiveTabs", function (assert) {
    var category = 'news', tab = 'address';

    this.view = new app.views.MainView(category, tab);
    this.makeResponse();

    assert.ok(
        this.view.renderSubView.calledWith(category, tab),
        "Called renderSubView without needed data"
    );

    assert.ok(
        this.view.$('[href$="' + category + '"]').parent().hasClass('active'),
        'Category is not in active state'
    );
});