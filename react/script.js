//TODO: Finish react version

var apiKey = 'eO58IERD';
var apiUrl = 'https://www.rijksmuseum.nl/api/en/collection/?key=' + apiKey;	
//Get info
var Gallery = React.createClass({
	items: function() {
		return $.get()....
	},
	render: (
		<ul>
			{{items}}
		</ul>	
	)
})
//Render data
React.render(<Gallery/>, document.getElementsByClassName('main-section'));
