import React, { useState,useEffect } from 'react';
import MyTag from './components-tom/MyTag/MyTag';
import './MainFeed.css';
import Story from './Story/Story'; 
import NavigationBar from './navigationBar';
import axios from 'axios';
import SignUp from './signUp';

const MainFeed = () => {
  const [searchText, setSearchText] = useState('');
  const [onlyMyTags, setOnlyMyTags] = useState(false);
  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/getcontent')
    .then(response => {setCards(response.data); 
      // console.log(cards)
    })
    .catch(error => console.log(error));
  });

  function tagClick() {
    setOnlyMyTags(!onlyMyTags);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  // function tagAlert(){
  //   window.confirm('You have no tags saved. Edit tags now');
  //   window.location = '/Settings';
  // }

  //careful changing this!!!
  const filteredCards = cards.filter(card => {

      let tags = localStorage.getItem("myTags");
      // console.log(tags);
      if(tags===null || tags==='{"":""}' || !onlyMyTags){
        // console.log("bad tags returning empty form");
        return card.Title.toLowerCase().includes(searchText.toLowerCase()) ||card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase());
      }
      else if(tags.includes('v') && tags.includes('h')&& onlyMyTags){
        return (card.tags.toLowerCase().includes('violence') || card.tags.toLowerCase().includes('heights')) && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
      else if(tags.includes('v') && onlyMyTags){
        return card.tags.toLowerCase().includes('violence') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
      else if(tags.includes('h') && onlyMyTags){
        return card.tags.toLowerCase().includes('heights') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
      // else{
      //   alert('You have no tags saved. Edit tags now');
      //   window.location = '/Settings';
      //   // tagAlert();
      // }

  });

  const handleCardClick = (cardName) => {
    // code to open a new page with the story name as the page name
    // window.location.href = `/readstory`+;
  }

  return (
    <>
    <div className='container'>
      <NavigationBar />
      <div className='searchContainer'>
        <button onClick={(e)=>tagClick(e)}>Only My Tags</button>
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
              <Story Storyname={card.Title} Description={card.Description} tagInfo={card.tags} objectid = {card._id} Author = {card.Author} Image={card.Image} Likes={card.Likes}/>
            </div>
          )) : 
          <div>No stories found</div>
        }
      </div>
    </div>
    
    
    
    </>
  );
};

export default MainFeed;