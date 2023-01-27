import React, { useState } from 'react';
import './MainFeed.css';
import Story from './Story/Story'; 

const MainFeed = () => {
  const [searchText, setSearchText] = useState('');
  const [cards, setCards] = useState([
    {id:1, name: "Car", description: "This is the description of Car"}, 
    {id:2, name: "Apple", description: "This is the description of ..."},
    {id:3, name: "...", description: "This is the description of Table"},
    {id:4, name: "Pen", description: "This is the description of Pen"},
    {id:5, name: "Driver", description: "This is the description of Driver"},
    {id:6, name: "Pizza", description: "This is the description of Pizza"},
    {id:7, name: "Computer", description: "This is the description of Computer"},
    {id:8, name: "Ice", description: "This is the description of Ice"},
    {id:9, name: "Test", description: "This is the description of Test"},
    {id:10, name: "Burger", description: "This is the description of Burger"},
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  const filteredCards = cards.filter(card => {
    return card.name.toLowerCase().includes(searchText.toLowerCase()) || card.description.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className='container'>
      <div className='searchContainer'>
        <input
          className='searchInput'
          value={searchText}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>
      <div className='scrollView'>
        {filteredCards.length > 0 ?
          filteredCards.map((card, index) => (
            <div key={index} className='card'>
              <Story Storyname={card.name} Description={card.description} />
            </div>
          )) : 
          <div>No stories found</div>
        }
      </div>
    </div>
  );
};

export default MainFeed;