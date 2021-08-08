import './App.css';
import React, { useState } from 'react';

// Using map
const numbers = [1, 4, 9, 16];

const newNumbers = numbers.map(function (number) {
  return number * 2;
});
console.log(newNumbers);

// App component
const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // Set state on searchTerm, setSearchTerm
  const [searchTerm, setSearchTerm] = React.useState('');

  // Get the value of search input
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // Check if user input matches stories array
  // toLowerCase() both values
  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render
  return (
    <div className="App">
      <Greeting name="Colin" age="28" occupation="Front-end developer" />
      <Search search={searchTerm} onSearch={handleSearch} />
      <hr />
      <List list={searchedStories} />
    </div>
  );
}

const words = [
  'spray',
  'limit',
  'elite',
  'exuberant',
  'destruction',
  'present'
];

const filteredWords = words.filter(function (word) {
  return word.length > 6;
});
console.log(filteredWords);

// Greeting
function Greeting(props) {
  return (
    <h1>
      Hello I'm {props.name}<br></br>
      a {props.age} year old {props.occupation}.
    </h1>
  );
}

// Search bar
const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input
      id="search"
      type="text"
      value={props.search}
      onChange={props.onSearch}
    />
  </div>
);

// Return new stories array, assign ID
const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

// Work with stories array
const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span> {props.item.author}</span>
    <span> {props.item.num_comments} comments,</span>
    <span> {props.item.points} points.</span>
  </li>
);

export default App;
