import logo from './logo.svg';
import './App.css';
import React from 'react';

const App = () => {
	const stories = [
		{
			title: 'React',
			url: 'https://reacrjs.org',
			author: 'Jordan Walke',
			num_comments: 3,
			points: 4,
			objectID: 0,
		},
		{
			title: 'Redux',
			url: 'https://redux.js.org',
			author: ['Dan Abramov','Andrew Clark'],
			num_comments: 2,
			points: 5,
			objectID: 1,
		},
		{
			title: 'babel',
			url: 'https://redux.js.org',
			author: 'maharajan',
			num_comments: 3,
			points: 7,
			objectID: 2,
		}
	];

	// A
	const handleSearch = event => {
		// C
		console.log(event.target.value);
	};

	return (
		<div>
			<h1>My Hacker Stories</h1>

			<Search onSearch={handleSearch} />

			<hr />

			<List list={stories} />
		</div>
	);
}

const Search = props => {
	const [searchTerm, setSearchTerm] = React.useState('');

	const handleChange = event => {
		setSearchTerm(event.target.value);

		// B
		props.onSearch(event);
	};

	return (
		<div>
			<label htmlFor="search">Search: </label>
			<input
				id="search"
				type="text"
				onchange={handleChange}
			/>
			<p>
				Searching for <strong>{searchTerm}</strong>.
			</p>
		</div>
	);
};

const List = props => props.list.map(
	item => (
		<div key={item.objectID}>
			<span>
				<a href={item.url}>{item.title}</a>
			</span>
			<span>{item.author}</span>
			<span>{item.num_comments}</span>
			<span>{item.points}</span>
		</div>
	)
);

export default App;
