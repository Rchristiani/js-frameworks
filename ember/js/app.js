//Create the Ember Application
App = Ember.Application.create();

//Ember has a strict naming convention
//If we are at the home page, this is considered the Index
//Everything must we prefixed as such
App.IndexRoute = Ember.Route.extend({
  model: function() {
  	//Return our initial results as the model property
  	//for the index route
  	return $.ajax({
  		method: "GET",
  		url: 'https://www.rijksmuseum.nl/api/en/collection/',
  		format: 'jsonp',
  		data : {
  			key: 'eO58IERD'
  		},
  	}).then(function(res) {
  		return res.artObjects;
  	});
  }
});

//A controller is used here to handle any actions or changing of data
App.IndexController = Ember.Controller.extend({
	actions: {
		//This is an action to be called from the template
		searchArt: function() {
			var self = this;
			$.ajax({
		  		method: "GET",
		  		url: 'https://www.rijksmuseum.nl/api/en/collection/',
		  		format: 'jsonp',
		  		data : {
		  			key: 'eO58IERD',
		  			//searchQuery comes from our template as we 
		  			//Define it as a value on an input in there
		  			//This automatically gets bound to the controller and route
		  			q: self.searchQuery
		  		},
		  	}).then(function(res) {
		  		//Reset our model with the results
		  		//Data binding will handle the notification to the the template
		  		self.set('model', res.artObjects);
		  	});
		}
	}
});
