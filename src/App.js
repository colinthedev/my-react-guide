import './App.css';
import React, { useState } from 'react';

// Using map
const numbers = [1, 4, 9, 16];

const newNumbers = numbers.map(function (number) {
  return number * 2;
});
console.log(newNumbers);

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue]
};

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

  // Set state on searchTerm, setSearchTerm with custom hook
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  // Get the value of search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Check if user input matches stories array
  // toLowerCase() both values
  const searchedStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render
  return (
    <div className="App">
      <Greeting name="Colin" age="28" occupation="Front-end developer" />
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
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

// Filter words array
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
// Destructure props search, onSearch
const InputWithLabel = ({ id, value, type = "text", onInputChange, isFocused, children, }) => {
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
  )
}

// Return new stories array, assign ID
// Destructure list
const List = ({ list }) => (
  <ul>
    {list.map(({objectID, ...item}) => (
      <Item key={objectID} {...item} />
      ))}
  </ul>
);

// Work with stories array
// Destructure item
const Item = ({ title, url, author, num_comments, points }) => (
  <li>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span> {author}</span>
    <span> {num_comments} comments,</span>
    <span> {points} points.</span>
  </li>
);

export default App;
