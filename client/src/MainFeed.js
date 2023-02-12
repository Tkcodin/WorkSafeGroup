import React, { useState,useEffect } from 'react';
import MyTag from './components-tom/MyTag/MyTag';
import './MainFeed.css';
import Story from './Story/Story'; 
import NavigationBar from './navigationBar';
import axios from 'axios';
import SignUp from './signUp';

const MainFeed = () => {
  const BigNumber = require('bignumber.js');
  const [searchText, setSearchText] = useState('');
  const [onlyMyTags, setOnlyMyTags] = useState(false);
  const [cards, setCards] = useState([]);
  const [filteredScoredCards, setFilteredScoredCards] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3000/getcontent')
    .then(response => {
      setCards(response.data); 
      console.log(cards);
      setTimeout(() => {
        assignCardsScores();
      }, 1);
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


  function scoreCard(card){
    //adjust story card to show why (lots of likes // lots of comments) it is there



    let cl = card.Likes;
    let date = card.Date;
    let dateComponents = date.split("/");
    let day = window.parseInt(dateComponents[0]);
    let month = window.parseInt(dateComponents[1]);
    let year = dateComponents[2];
    let yearComponents = year.split(", ");
    let yearY = window.parseInt(yearComponents[0]);
    let yearTime = yearComponents[1];
    let yearTimeComponents = yearTime.split(" ");
    let hhmm = yearTimeComponents[0];
    let hhmmComponents = hhmm.split(":");
    let hh = window.parseInt(hhmmComponents[0]);
    let mm = window.parseInt(hhmmComponents[1]);
    let ampm = yearTimeComponents[1];
    if(ampm==="pm" && hh !=12){
      hh = hh +12;
    }
    let dateFormat = new Date(yearY, month -1, day, hh, mm, 0);
    console.log(date + " ===>>> " + yearY + " " + month +" " + day+ " " + hh + " " + mm + " " + 0);
    console.log(dateFormat);
    let then = BigNumber(dateFormat.getTime());
    let now = BigNumber(Date.now());
    let diff = BigNumber(now - then.toNumber()) ;
    let diffHours = Math.floor(BigNumber(diff/(60*60*1000)));
    let tags = card.tags;
    let matchingTagCount = 0;
    let myTags = localStorage.getItem("myTags");
    if(myTags != null && myTags != '{"":""}' && myTags.length>0){
      let myTagsSplit = myTags.split(" ");
      for(let s of myTagsSplit){
        if(tags.includes(s)){
          matchingTagCount++;
        }
      }
    }
    let score = cl + matchingTagCount - diffHours;
    
    console.log(card.Title + " --> likes: " + cl + " tagCount: " + matchingTagCount + " timediffhours: " +diffHours + " score: " + score);
    return score;
  }

  

  function assignCardsScores(){
    //fc being filtered cards
    console.log("cards: " + cards);
    let myFilteredScoredCards = cards.map((card, index) => {
      return [index, card, scoreCard(card)]
    })

    myFilteredScoredCards.sort((a, b) => {
      return b[2] - a[2];
    });

    console.log("filtered: " +myFilteredScoredCards);
    setFilteredScoredCards(myFilteredScoredCards);
    
  }

  // //careful changing this!!!
  // const filteredCards = cards.filter(card => {
  //     let tags = localStorage.getItem("myTags");
  //     // console.log(tags);
  //     if(tags===null || tags==='{"":""}' || !onlyMyTags){
  //       // console.log("bad tags returning empty form");
  //       return card.Title.toLowerCase().includes(searchText.toLowerCase()) ||card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase());
  //     }
  //     else if(tags.includes('violence') && tags.includes('heights')&& onlyMyTags){
  //       return (card.tags.toLowerCase().includes('violence') || card.tags.toLowerCase().includes('heights')) && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
  //     }
  //     else if(tags.includes('violence') && onlyMyTags){
  //       return card.tags.toLowerCase().includes('violence') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
  //     }
  //     else if(tags.includes('heights') && onlyMyTags){
  //       return card.tags.toLowerCase().includes('heights') && (card.Title.toLowerCase().includes(searchText.toLowerCase()) || card.Author.toLowerCase().includes(searchText.toLowerCase()) || card.Description.toLowerCase().includes(searchText.toLowerCase()) || card.tags.toLowerCase().includes(searchText.toLowerCase()));
  //     }
  // });




  const handleCardClick = (cardName) => {
    // code to open a new page with the story name as the page name
    // window.location.href = `/readstory`+;
  }

  return (
    
    <>
    <div className='containerMain'>
      <NavigationBar />
      <div className='searchAndButtonContainer'>
        {(localStorage.getItem('userID') != null) ? <button id='myTagsButton' onClick={(e)=>tagClick(e)}>View Only My Tags</button> : null }
        <div className='searchContainer'>
          <input
            className='searchInput'
            value={searchText}
            onChange={handleSearch}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className='scrollView'>
        {filteredScoredCards.length > 0 ?
          filteredScoredCards.map((card, index) => (
            <div key = {index} className='card'>
              {console.log("card in making story: " + card + " score: " + card[2])}
              <Story selectedUserID = {card[1].UserID} Storyname={card[1].Title} Score={card[2]} Category={card[1].Category} Description={card[1].Description} tagInfo={card[1].tags} objectid = {card[1]._id} Author = {card[1].Author} Image={card[1].Image} Likes={card[1].Likes}/>
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
