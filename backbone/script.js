var app = {}
app.apiKey = 'pUaGTYo5';
app.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + app.apiKey;
//Our main view
app.MainView = Backbone.View.extend({
	//The element we want to append everything too
	el: '.main-section',
	//Our template, this is in the head of our html
	//We are use the undercores templating engine
	template: _.template($('#main-template').html()),
	//We set up a simple object for our events
	events: {
		'click input[type="submit"]' : 'searchTerm'
	},
	//In backbone, everytime you call new on an object an
	//Initialize function it run
	initialize: function() {
		//Where we render our template to the DOM
		this.render();
		//We make a new collection
		this.collection = new app.ArtCollection();
		//We listen for a reset event on the collection
		//And when that is triggered we want to render the artwork
		this.listenTo(this.collection,'reset', this.renderArtwork);
		//We then fetch the collection using .fetch and passing reset:true to make sure
		//The reset event is triggered
		this.collection.fetch({reset:true});
	},
	render: function() {	
		//A simple render method, we are just appending our template to the html
		this.$el.append(this.template());
	},
	renderArtwork: function() {	
		//We use underscores .each method to loop through all the collected models
		_.each(this.collection.models, function(model) {
			//For each item we create a new subview
			var artView = new app.ArtWorkView({
				//We pass in the model data in to the view
				model: model
			});
		});
	},
	searchTerm: function() {
		//this function is called when we click submit on the form
		//To make sure we have a reference to our main view we store it in a var
		//called self
		var self = this;
		//We then grab the query from the input
		var query = this.$el.find('input[type="text"]').val();
		//We reset it
		this.$el.find('input[type="text"]').val('');
		//We create a new collection just for searching
		var searchCollection = new app.SearchArtWork();
		//We add a property called searchterm on it to be used in the collection
		//We give this the value of our query
		searchCollection.searchTerm = query;
		//And we call fetch on it.
		searchCollection.fetch({
			//Fetch can take an object, much like $.ajax that has a 
			//Success method on it.
			success: function(res) {
				//In here we empty our initial view
				self.$el.find('.art-work').empty();
				//Set the collection to be our results
				self.collection = res;
				//And then call renderArtwork to put new results on the page.
				self.renderArtwork();
			}	
		})
	}
});

//A simple model is needed to make sure backbone knows
//What to do with our data
app.ArtModel = Backbone.Model.extend({});

//Are initial collection
app.ArtCollection = Backbone.Collection.extend({
	//We assign our model
	//So that when we get a result back, the vales get mapped to our model
	model: app.ArtModel,
	//We set up the url for backbone to call when we call .fetch
	url: app.apiUrl,
	//We have this handy parse method so that we can just return our
	//Array of data nicely.
	parse: function(res) {
		//Returning just the art objects.
		return res.artObjects;
	}
});

//Our simple Art wOrk View
app.ArtWorkView = Backbone.View.extend({
	//Grabbing our template
	template: _.template($('#art-work').html()),
	initialize: function() {
		//Rendering this view
		this.render();
	},
	render: function() {
		//Find the container we want to put our view in
		//And append it
		$('.art-work').append(this.template(this.model.toJSON()));
	}
});

//Our search Collection
app.SearchArtWork = Backbone.Collection.extend({
	//Again setting the model we want
	model: app.ArtModel,
	url: function() {
		//For the url this time we use a function
		//So we can return the proper url
		//Based on the searchTerm
		return app.apiUrl + '&q=' + this.searchTerm
	},
	//Again parsing the results so we can get what we want
	parse: function(res) {
		return res.artObjects;
	}
})

$(function() {
	//Start it all off with the initial main view
	var view = new app.MainView();
});