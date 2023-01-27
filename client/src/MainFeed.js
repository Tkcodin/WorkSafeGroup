import React, { useState } from 'react';
import './MainFeed.css';
import Story from './Story/Story'; 

const MainFeed = () => {
  const [searchText, setSearchText] = useState('');
  const [cards, setCards] = useState([
    {id:1}, 
    {id:2},
    {id:3},
    {id:4}, 
    {id:5},
    {id:6},
    {id:7},
    {id:8}, 
    {id:9},
    {id:10},
  ]);

  return (
    <div className='container'>
      <div className='searchContainer'>
        <input
          className='searchInput'
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className='scrollView'>
        {cards.map((card, index) => (
          <div key={index} className='card'>
            {card.id === 1 && <Story Storyname="Car" Description="This is the description of Car" />}
            {card.id === 2 && <Story Storyname="Apple" Description="This is the description of ..." />}
            {card.id === 3 && <Story Storyname="Table" Description="This is the description of Table" />}
            {card.id === 4 && <Story Storyname="Pen" Description="This is the description of Pen" />}
            {card.id === 5 && <Story Storyname="Driver" Description="This is the description of Driver" />}
            {card.id === 6 && <Story Storyname="Pizza" Description="This is the description of Pizza" />}
            {card.id === 7 && <Story Storyname="Computer" Description="This is the description of Computer" />}
            {card.id === 8 && <Story Storyname="Ice" Description="This is the description of Ice" />}
            {card.id === 9 && <Story Storyname="Test" Description="This is the description of Test" />}
            {card.id === 10 && <Story Storyname="Burger" Description="This is the description of Burger" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFeed;