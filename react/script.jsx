//TODO: Finish react version

var apiKey = 'pUaGTYo5';
var apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + apiKey;	
//Get info
var getArtData = function() {
	return $.get(apiUrl,{
		dataType: 'jsonp'
	});
};

var Gallery = React.createClass({
	getInitialState: function() {
		return {
			items: []
		}
	},

	componentDidMount: function() {
		getArtData().then((res) => {
			var art = res.artObjects;
			art.map((el, i) => {
				this.state.items.push(
					<div className="art-item" key={el.id}>
						<img src={el.webImage.url} />
						<p>{el.longTitle}</p>
					</div>
				);
				if(i === (art.length - 1)) {
					this.setState({
						items : this.state.items
					})
				}
			});
		}, function(err) {
			console.log(err);
		});
	},
	render: function() {
		return (
			<div>{this.state.items}</div>
		);
	}
});

var HeaderComponent = React.createClass({
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
			<header className="main-header">
				<h1>Rijks Museum</h1>
				<div className="search-box">
					<input type="text" value={this.state.searchValue} onChange={this.onChange}/>
					<input type="submit" value="search" onClick={this.searchArt} />
				</div>
			</header>
		);
	}
});

var App = React.createClass({
	render: function() {
		return (
			<main className="main-section">
				<HeaderComponent/>
				<section className="art-work">
					<Gallery/>
				</section>
			</main>
		);
	}
});
//Render data
React.render(<App/>, document.getElementsByTagName('body')[0]);
