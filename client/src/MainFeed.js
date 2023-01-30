import React, { useState } from 'react';
import MyTag from './components-tom/MyTag/MyTag';
import './MainFeed.css';
import Story from './Story/Story'; 
import NavigationBar from './navigationBar';

const MainFeed = () => {
  const [searchText, setSearchText] = useState('');
  const [cards, setCards] = useState([
    {id:1, name: "Car", description: "This is the description of Car", tagInfo: "red-testtag-blue-testtag2"}, 
    {id:2, name: "Apple", description: "This is the description of ...", tagInfo: "green-testtag44-silver-test2tag2"},
    {id:3, name: "...", description: "This is the description of Table", tagInfo: "red-testtag-blue-testtag2"},
    {id:4, name: "Pen", description: "This is the description of Pen", tagInfo: "red-testtag-blue-testtag2"},
    {id:5, name: "Driver", description: "This is the description of Driver", tagInfo: "red-testtag-blue-testtag2"},
    {id:6, name: "Pizza", description: "This is the description of Pizza", tagInfo: "red-testtag-blue-testtag2"},
    {id:7, name: "Computer", description: "This is the description of Computer", tagInfo: "red-testtag-blue-testtag2"},
    {id:8, name: "Ice", description: "This is the description of Ice", tagInfo: "red-testtag-blue-testtag2"},
    {id:9, name: "Test", description: "This is the description of Test", tagInfo: "red-testtag-blue-testtag2"},
    {id:10, name: "Burger", description: "This is the description of Burger", tagInfo: "red-testtag-blue-testtag2"},
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  const filteredCards = cards.filter(card => {
    return card.name.toLowerCase().includes(searchText.toLowerCase()) || card.description.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className='container'>
      <NavigationBar />
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
              <Story Storyname={card.name} Description={card.description} tagInfo={card.tagInfo}/>
            </div>
          )) : 
          <div>No stories found</div>
        }
      </div>
    </div>
  );
};

export default MainFeed;