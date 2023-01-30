import React, { useState,useEffect } from 'react';
import MyTag from './components-tom/MyTag/MyTag';
import './MainFeed.css';
import Story from './Story/Story'; 
import NavigationBar from './navigationBar';
import axios from 'axios';

const MainFeed = () => {
  const [searchText, setSearchText] = useState('');

  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/getcontent')
    .then(response => {setCards(response.data); console.log(cards)})
    .catch(error => console.log(error));
  });

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  const filteredCards = cards.filter(card => {
    return card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleCardClick = (cardName) => {
    // code to open a new page with the story name as the page name
    // window.location.href = `/readstory`+;
  }

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
            <div key = {index} className='card'>
              <Story Storyname={card.Title} Description={card.Description} tagInfo={card.tags} objectid = {card._id} Author = {card.Author}/>
            </div>
          )) : 
          <div>No stories found</div>
        }
      </div>
    </div>
  );
};

export default MainFeed;