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
