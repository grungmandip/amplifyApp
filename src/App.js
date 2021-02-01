import logo from './logo.svg';
import './App.css';
import React from 'react';

const useSemiPersistentState = (key, initialState) => {
	const [value, setValue] = React.useState(
		localStorage.getItem(key) || initialState
	);

	React.useEffect(() => {
		localStorage.setItem(key, value);
	}, [value, key]);

	return [value, setValue];
};

const initialStories = [
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
		title: 'Babel',
		url: 'https://redux.js.org',
		author: 'maharajan',
		num_comments: 3,
		points: 7,
		objectID: 2,
	},
	{
		title: 'Maharajan',
		url: 'https://redux.js.org',
		author: 'maharajan',
		num_comments: 4,
		points: 9,
		objectID: 3,
	},
	{
		title: 'guppy',
		url: 'https://guppy.co.jp',
		author: 'guppy',
		num_comments: 5,
		points: 10,
		objectID: 4,
	}
];

const getAsyncStroies = () =>
	new Promise(resolve =>
		setTimeout(
			() => resolve({data: {stories: initialStories}}),
			2000
		)
	);

const App = () => {

	const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

	const [stories, setStories] = React.useState([]);

	const [isLoading, setIsLoading] = React.useState(false);
	const [isError, setIsError] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);

		getAsyncStroies().then(result => {
			setStories(result.data.stories);
			setIsLoading(false);
		}).catch(() => setIsError(true));
	}, []);

	const handleRemoveStory = item => {
		const newStories = stories.filter(
			story => item.objectID !== story.objectID
		);

		setStories(newStories);
	};
	
	// A
	const handleSearch = event => {
		// C
		setSearchTerm(event.target.value);
		//console.log(event.target.value);
	};

	const searchedStories = stories.filter(story => 
		story.title
		.toLowerCase()
		.includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h1>Learning React</h1>

			<InputWithLabel
				id="search"
				value={searchTerm}
				isFocused
				onInputChange={handleSearch}
			>
				<strong>Search:</strong>
			</InputWithLabel>
			
			<p>
				Searching for <strong>{searchTerm}</strong>.
			</p>

			<hr />

			{isError && <p>Something went wrong ...</p>}
			Search Result
			{isLoading ? (
				<p>Loading ...</p>
			) : (
				<List list={searchedStories} onRemoveItem={handleRemoveStory} />
			)}
			&nbsp;
			<List list={stories} />
		</div>
	);
}

const InputWithLabel = ({id, value, type='text', onInputChange, isFocused, children,}) => {
	const inputRef = React.useRef();

	React.useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	return (
		<>
			<label htmlFor={id}>{children}</label>
			&nbsp;
			<input
				ref={inputRef}
				id={id}
				type={type}
				value={value}
				autoFocus={isFocused}
				onChange={onInputChange}
			/>
		</>
	);
};

const List = ({list, onRemoveItem}) => 
	list.map(item => (
		<Item
			key={item.objectId}
			item={item}
			onRemoveItem={onRemoveItem}
		/>
	));
	
const Item = ({item, onRemoveItem}) => (
	<div>
		<span>
			<a href={item.url}>{item.title}</a>
		</span>
		<span>{item.author}</span>
		<span>{item.num_comments}</span>
		<span>{item.points}</span>
		<span>
			<button type="button" onClick={() => {onRemoveItem(item)}}>
				Dismiss
			</button>
		</span>
	</div>
);

export default App;
