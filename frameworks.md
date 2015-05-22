#JS Frameworks
If you have been looking at job listings lately, as I am sure a lot of you have, you will have seen a few terms popping up over and over. 

> Experience with AngularJs

or maybe

> Experience with modern client-side application frameworks (Backbone.js, Ember.js, Angular.js)

##What are these?
After seeing these terms you might have done some searching and ending up at their websites, or someones blog post about them. The are JavaScript libraries that have bean created to help make our lives easier when it comes to writing large complex JS applications.

##Why do we have these

These frameworks/libraries came out of a need for better organization and separation of concerns when it came to writing larger JavaScript applications in the browser. As you have been getting into using jQuery to build more interactive applications you might notice that you end up doing a lot in some functions, when really we should keep things as simple as possible. These libraries try to emulate a design pattern called MVC.

##What is MVC but first What is a Design Pattern?
MVC, or Model View Controller, is a design pattern that was developed back in the 70's for the smalltalk-80 language. A design pattern is a reusable solution that can be used to solve common problems. 

For example, we have been using namespaceing to organize our JS:

	var app = {};
	app.myFunction() {};

The problem this little pattern solves is spaghetti code, before this we would just create functions and call them from anywhere, there was no organization. Using the namespacing pattern, we can easily group things together. If you have a bunch of events we need to fire, we could have a `app.events()` method.

MVC solves the problem of keeping our Model(data) separate from our View and keeping our logic inside a Controller.

A diagram might look something like this:

![MVC Diagram](imgs/mvcbase.png)

The basic idea is that the **View** listens for events on it, when an action is triggered it talks to the **Controller** which then makes changes to the **Model** which then triggers a change in the **View** to reflect the models new information.  

That is a pretty brief example of how they might work. Lets talk a little about the three main JS frameworks that you will see in a posting. And then we will dive into the most popular, AngularJS.

###Backbone
***
![Backbone Logo](imgs/backbone.png)

Backbone is by far the most mature and oldest of the three main frameworks. And because of that reason it is not super talked about these days. In my opinion though, it is a solid library and my favourite. 

It is very small, compared to Angular or Ember. Because of this you have to be in control of a lot of things. We will see that in Angular and Ember they sort of do some *magic* that happens, when we update something they automatically make some change somewhere else. However in Backbone you have to me more concerned with what is happening. It is more of a manual process. If you make a change to some data, you have to set up the next set, does a view get updated? Does it get saved to a database somewhere? 

Backbone is a very small library, you can actually read the whole thing is you wanted [HERE](http://backbonejs.org/docs/backbone.html). Backbone and Underscore(a js library backbone depends on) are both really well documented. Because of this Backbone is often forked and extended into new, fuller featured, versions.

There are many version of it, the two most popular are [MarionetteJs](http://marionettejs.com/) and [AmpersandJS](https://ampersandjs.com/).

Some sample Backbone code would look like this:

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

This is taken from the [Backbone Example application](backbone/index.html)

Some sites in the wild that use Backbone as sites like [Rdio](http://rdio.com),[Trello](http://trello.com) and [Airbnb](https://www.airbnb.ca/)

###Ember
***

![Ember Logo](imgs/ember.png)

Ember is by far the largest and most difficult to get into. The learning curve is pretty steep. The tag line for Ember is *A framework for creating ambitious web applications*. The goal for Ember however is that once you get over that hump, things become very easy you don't have to do much thinking about how something works. Ember is a very opinionated framework, meaning that there is really very few ways to do something in Ember. Angular and Backbone have a bit more freedom as to how you perform a task or name something. In Ember everything is tightly controlled.

For example, if I want to create a route for a homepage, it would be called index. I would have to make an ember controller call `IndexController`:

So it might look something like this:

	App.IndexController = Ember.Controller.extend({
		//Controller code in here
	});

If I wanted a route for that same page I would follow the same patter:

	App.IndexRoute = Ember.Route.extend({
		//Route stuff goes here
	});

Ember has been picking up a lot of steam lately. Unlike Backbone, Ember is in constant development and because of that it is constantly getting better and changing. But because of that it can be hard to follow and keep up with.

I have built an example application [HERE](ember/index.html) using Ember.

Some example applications that have been build using Ember are [Fresh Books](http://www.freshbooks.com/) and [Discourse](http://www.discourse.org/). These are large complex applications that need to be organized well. 

###React
***
![React Logo](imgs/react.png)

React is a newer library from Facebook. The idea of React is to focus on creating fast interactive UI. It focuses on render speed and uses something called JSX as their template.

One thing that was introduced is this concept of the "virtual DOM". Because of this it makes reacts rendering of a page very very fast. 

	var PageTitle = React.createClass({
	  render: function() {
	    return <h1>Hello {this.props.title}<h1>;
	  }
	});
	
	React.render(<PageTitle title="John" />, document.body); 

React Art App example coming soon.

Examples of applications build with React are [Instagram](https://instagram.com/) and more and more UI element from [Facebook](https://facebook.com)



###Angular
***
![Angular Logo](imgs/AngularJS-large.png)

Angular is by far the most popular library at the moment. I think a lot of that has to do with the fact that it is being developed at Google, that is a name people see to like. Much like the other two, Angular follows similar conventions. Unlike Ember however, you have a bit more freedom to work with. 

Angular also has a lot of built in features for you. It has services for making ajax calls, getting animations started quickly, simple stuff like scrolling to an anchor link on your page even. And as discussed early, there is a lot of magic in AngularJS. In Backbone you do a lot of manual work, in Angular things just work for you. This can be a good and a bad thing.

Some example Angular code might look like this:

	app.controller('MainCtrl', function($scope,Art){
		//When the page is loaded get info to fill the page
		Art.getArt().then(function(result) {
			//When the promise is resolved the result is sent 
			//to the callback in the .then() method
			$scope.art = result.artObjects;
		});
		//Search function on our scope
		$scope.search = function() {
			//Get the query from the ng-model
			var query = $scope.searchQuery;
			//Send that query to your .seach() method in the factory
			Art.search(query).then(function(result) {
				//When it resolves we get our art
				$scope.art = result.artObjects;
			});
		};
	});

Unlike Backbone or Ember where you notice we did stuff like `var view = Backbone.View.extend()` or `var IndexControler = Ember.Controller.extend()`. Angular works in this fashion of using methods on the Angular object to create controllers or whatever it is you are creating. 

I have built an example application [HERE](angular/index.html) using Angular.

Example applications using AngularJS: [PS3 Youtube app](http://www.playstation.com/en-us/explore/playstationnetwork/entertainment/youtube/) and [Wanderlust](http://mywanderlust.co/)

##Are they for me? Should I learn them.

Ultimately before jumping into one of these you need to have a firm understanding of JS. Like jQuery these are not new languages, they are just libraries built to provide us with certain functionality. 

[HERE](https://www.youtube.com/watch?v=kwSVWlzEefE) is a short video by Alex McPerson that might help you understand the evolution of the type of JS you are writing. Starting from simple little programs, to plugins, to using objects to organize your code and then getting into some sort of MVC framework like Backbone, Angular or Ember. I highly recommend checking out the video.


####Resources
Backbone:
[Backbone site](http://backbonejs.org/)

Ember:
[Ember getting started](http://emberjs.com/guides/)

AngularJS:
[Shaping up with AngularJS](https://www.codeschool.com/courses/shaping-up-with-angular-js)


##Node
![Node JS Logo](imgs/nodejs.png)

Node is a JavaScript "runtime", or platform for writing server side JavaScript applications. It has become extremely popular as of late. Companies like Walmart have large portions of there systems running on Node servers. When working with Node it is common to work with MongoDB and a Node framework called Express. When you use this with AngularJS this is called the MEAN stack.

###npm
![NPM logo](imgs/npm-logo.svg)

Lets discuss npm for a moment. NPM stands for nifty procrastination machine, or normal people, mmm! or nobody publish monsters. Or what people often refer to it as Node Package Manger. 

NPM lets us download little packages, like gulp, that we can use inside of our node applications or tools. 

##Node Applications
What is an node application? Why use node? Well one good reason is that you know JavaScript already. Also it is pretty light weight and easy to install. If we take a look at the MEAN stack in terms of an application. We would use MongoDB as our database. Express, a Node framework, as our server application framework. Angular as our client side framework and Node as our server.

##MongoDB
![MongoDB Logo](imgs/mongodb.png)

[MongoDB](https://www.mongodb.org/) is a database system commonly refereed to as a NoSql database. The way you store data in it is with documents, these documents look exactly like JSON.
```
	{
		"_id" : ObjectId("555811826c10cdc54e4a61f7"),
		"first" : "Ryan",
		"last" : "Christiani",
		"email" : "ryan@ryanchristiani.com",
		"phone" : 9053307201,
		"address" : "303-291 Avenue Rd",
		"city" : "Toronto",
		"country" : "Canada",
		"postal" : "M4V 2G9",
		"plan" : "nightaccess",
		"stripeToken" : "",
		"status" : "Active",
		"notes" : null,
		"isActive" : true,
		"customerToken" : "*****",
		"subToken" : "****",
		"payments" : [ ],
		"__v" : 0
	}
```
##Express
![Express JS](imgs/express.png)

[Express](http://expressjs.com/) is a application framework for creating Node application. Express lets us create routes based on URL's.

An example of this might look like this:

```
	app.get('/api/alumnis/:id', alumni.getAlumniById);
```

In this example using Express and the `.get()` method we well our application to listen for a get request like `http://localhost/api/alumnis/555811826c10cdc54e4a61f7` and this will retrieve from our database and alumni matching that that ID. Note that the method `alumni.getAlumniById` is something that you have to set up.

```
alumni.getAlumniById = function(req,res) {
	var id = req.params.id;
	models.alumni.find({_id: id}, function(err,doc) {
		if(err) {
			res.send(err);
		}
		else {
			res.send({alumni: doc});
		}
	});
}
```

##Angular
![Angular](imgs/AngularJS-large.png)

We already discussed Angular in depth above, but to re-iterate. Angular is an MV* javascript framework that allows us to organize our applications more and more. There are certain conventions that are set in place to make this organization easy. It also takes care of a lot of things for us, so we can concentrate on writing our application. 











