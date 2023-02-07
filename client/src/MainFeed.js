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

  function orderStoryCards(fc){
    //fc being filtered & scored cards
  }

  function scoreCard(card){
    let score = 0;
    let cl = card.Likes;
    let date = card.Date;
    let dateFormat = new Date(date);
    let now = Date.now();
    let tags = card.tags;
    let matchingTagCount = 0;
    let myTags = localStorage.getItem("myTags");
    if(myTags.length>0){
      let myTagsSplit = myTags.split(" ");
      for(let s of myTagsSplit){
        if(tags.includes(s)){
          matchingTagCount++;
        }
      }
    }

    console.log(cl + " " + dateFormat + " " + now + " " + tags + " " + myTags + " " + matchingTagCount);
    return score;
  }

  function assignCardsScores(){
    //fc being filtered cards

    const filteredScoredCards = filteredCards.map((card, index) => {
      return [index, card, scoreCard(card)]
    })
    return filteredScoredCards;
  }

  //careful changing this!!!
  const filteredCards = cards.filter(card => {
      let tags = localStorage.getItem("myTags");
      // console.log(tags);
      if(tags===null || tags==='{"":""}' || !onlyMyTags){
        // console.log("bad tags returning empty form");
        return card.Title.toLowerCase().includes(searchText.toLowerCase()) ||card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase());
      }
      else if(tags.includes('violence') && tags.includes('heights')&& onlyMyTags){
        return (card.tags.toLowerCase().includes('violence') || card.tags.toLowerCase().includes('heights')) && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
      else if(tags.includes('violence') && onlyMyTags){
        return card.tags.toLowerCase().includes('violence') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
      else if(tags.includes('heights') && onlyMyTags){
        return card.tags.toLowerCase().includes('heights') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
      }
  });




  const handleCardClick = (cardName) => {
    // code to open a new page with the story name as the page name
    // window.location.href = `/readstory`+;
  }

  return (
    assignCardsScores(),
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
              <Story selectedUserID = {card.UserID} Storyname={card.Title} Category={card.Category} Description={card.Description} tagInfo={card.tags} objectid = {card._id} Author = {card.Author} Image={card.Image} Likes={card.Likes}/>
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