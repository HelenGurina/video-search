//Get react and react-dom for access in this file
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyCYp5hnXGA1CNP-P3XDSNI0NODGlca0C7g';

// Create a new component with html
 class App extends Component {
 	constructor(props) {
 		super(props);

 		this.state = { 
 			videos: [],
 			selectedVideo: null 
 		};

 		this.videoSearch('jackson hole');
 	}

 	videoSearch(term) {
 		YTSearch({key: API_KEY, term: term}, (videos) => {
 			this.setState({ 
 				videos: videos, 
 				selectedVideo: videos[0]
 			});
 		});
 	}

 	render () {
 		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 900);

 		return (
 		<div>
 			<SearchBar onSearchTermChange={videoSearch}/>
 			<VideoDetail video={this.state.selectedVideo} />
 			<VideoList 
 				onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
 				videos={this.state.videos} 	/>
 		</div>
 		);
 	}
 }
 
// Then put it in the DOM
ReactDOM.render(<App />, document.querySelector('.container'));