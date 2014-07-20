(function($) {

    var siteTitle = 'Order online @ Gluten-Free with Sarah B';

    var Product = Backbone.Model.extend({
        default: {
            title: 'product title',
            caption: 'product caption',
            price: 0.00,
            images: [],
            quantity: 0
        }
    });

    var ProductList = Backbone.Collection.extend({
        model: Product
    });

    var ProductView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click button.addOne': 'addOne',
            'click button.remove': 'remove'
        },

        initialize: function() {
            _.bindAll(this, 'render', 'addOne', 'remove');
            this.model.bind('change', this.render);
        },

        render: function() {
            $(this.el).html("<li>" + this.model.get('title') + 'amount: ' + this.model.get('quantity') + '<button class="addOne">+</button><button class="remove">-</button></li>');
            return this;
        },

        addOne: function() {
            this.model.set({
                'quantity': this.model.get('quantity') + 1
            });
        },

        remove: function() {
            this.model.set({
                'quantity': this.model.get('quantity') - 1
            });
        }
    });

    // **ListView class**: Our main app view.
    var ListView = Backbone.View.extend({
        el: $('body'), // attaches `this.el` to an existing element.
        events: {
            'click button.newProduct': 'addProduct'
        },
        initialize: function() {
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.collection = new ProductList();
            this.collection.bind('add', this.appendProduct);
            this.render(); // not all views are self-rendering. This one is.
        },
        addProduct: function() {
            var item = new Product();
            item.set({
                title: 'banana bread',
                quantity: 0
            });
            this.collection.add(item);
        },
        appendProduct: function(item) {
            var productView = new ProductView({
                model: item
            });
            $('ul', this.el).append(productView.render().el);
        },
        render: function() {
            var siteTitleSrc = $('#siteTitle').html();
            var template = Handlebars.compile(siteTitleSrc);
            $(this.el).append("<button class='newProduct'>New product</button>");
            $(this.el).append("<ul></ul>");
        }
    });

    // **listView instance**: Instantiate main app view.
    var listView = new ListView();
})(jQuery);
