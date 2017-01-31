;(function (app, B) {

    app.models.MainModel = B.Model.extend({

        url: 'assets/data.json',

        initialize: function () {
            this.listenTo(Backbone, 'save-to-storage', this.savePreferencies);
        },

        savePreferencies: function (isChecked, id) {
            var topics = localStorage.getItem('choosen-topics'),
                splitted = topics && topics.split(', ') || [],
                selector = '#' + id;

            if (isChecked) {
                splitted.push(selector);
                localStorage.setItem('choosen-topics', splitted.join(', '));
            } else {
                localStorage.setItem('choosen-topics', _.without(splitted, selector).join(', '));
            }
        }

    });

} (window.app, Backbone));
