//TODO: Finish react version

var apiKey = 'pUaGTYo5';
var apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + apiKey;	
//Get info
var getArtData = function(query) {
	var query = query === undefined ? '' : query;
	return $.get(apiUrl + '&q=' + query,{
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
			this.createItems(art);
		}, function(err) {
			console.log(err);
		});
	},

	componentWillReceiveProps: function(obj) {
		this.createItems(obj.data);
	},

	createItems: function(art) {
		this.state.items = [];
		art.map((el, i) => {
			if(el.webImage !== null) {
				this.state.items.push(
					<div className="art-item" key={el.id}>
						<img src={el.webImage.url} />
						<p>{el.longTitle}</p>
					</div>
				);
			}
			if(i === (art.length - 1)) {
				this.setState({
					items : this.state.items
				})
			}
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
		getArtData(this.state.searchValue).then(res => {
			this.props.onSearch(res.artObjects);
			this.setState({
				searchValue: ''
			});
		});
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
					<form onSubmit={this.searchArt}>
						<input type="text" value={this.state.searchValue} onChange={this.onChange}/>
						<input type="submit" value="search" />
					</form>
				</div>
			</header>
		);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return {
			data: []
		};
	},
	searchHandler: function(data) {
		this.setState({
			data: data
		});
	},
	render: function() {

		return (
			<main className="main-section">
				<HeaderComponent onSearch={this.searchHandler}/>
				<section className="art-work">
					<Gallery data={this.state.data}/>
				</section>
			</main>
		);
	}
});
//Render data
React.render(<App/>, document.getElementsByTagName('body')[0]);
