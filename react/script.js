//TODO: Finish react version

var apiKey = 'pUaGTYo5';
var apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + apiKey;	
//Get info
var getArtData = function() {
	return $.get(apiUrl,{
		dataType: 'jsonp'
	});
};

var Gallery = React.createClass({displayName: "Gallery",
	getInitialState: function() {
		return {
			items: []
		}
	},

	componentDidMount: function() {
		getArtData().then(function(res)  {
			var art = res.artObjects;
			art.map(function(el, i)  {
				this.state.items.push(
					React.createElement("div", {className: "art-item", key: el.id}, 
						React.createElement("img", {src: el.webImage.url}), 
						React.createElement("p", null, el.longTitle)
					)
				);
				if(i === (art.length - 1)) {
					this.setState({
						items : this.state.items
					})
				}
			}.bind(this));
		}.bind(this), function(err) {
			console.log(err);
		});
	},
	render: function() {
		return (
			React.createElement("div", null, this.state.items)
		);
	}
});

var HeaderComponent = React.createClass({displayName: "HeaderComponent",
	getInitialState: function() {
		return {
			searchValue: ''
		}
	},
	searchArt: function(e) {
		e.preventDefault();

	},
	onChange: function(e) {
		this.setState({
			searchValue: e.target.value
		});
	},
	render: function() {
		return (
			React.createElement("header", {className: "main-header"}, 
				React.createElement("h1", null, "Rijks Museum"), 
				React.createElement("div", {className: "search-box"}, 
					React.createElement("input", {type: "text", value: this.state.searchValue, onChange: this.onChange}), 
					React.createElement("input", {type: "submit", value: "search", onClick: this.searchArt})
				)
			)
		);
	}
});

var App = React.createClass({displayName: "App",
	render: function() {
		return (
			React.createElement("main", {className: "main-section"}, 
				React.createElement(HeaderComponent, null), 
				React.createElement("section", {className: "art-work"}, 
					React.createElement(Gallery, null)
				)
			)
		);
	}
});
//Render data
React.render(React.createElement(App, null), document.getElementsByTagName('body')[0]);
