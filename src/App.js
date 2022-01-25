import { Component } from 'react';
import React from 'react';
import './App.css';
import Like from './iconComponents/Like.tsx'
import Car from './iconComponents/Car.tsx'
import Sravnit from './iconComponents/Sravnit.tsx'
import Auth from './iconComponents/Auth.tsx'
import { display } from '@mui/system';
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";


class App extends React.Component {

  _isMounted = false
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      showMore: false,
    }
  }
  componentDidMount(){

      fetch('https://6075786f0baf7c0017fa64ce.mockapi.io/products')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          showMore: false,
          
        })
      });
  }
  
  fetchMoreData = () => {
    fetch('https://6075786f0baf7c0017fa64ce.mockapi.io/products')
      .then(res => res.json())
      .then(json => {
      setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from(json))
        // items: this.state.items.concat(Array.from([{price: 20}]))
      });
      console.log(this.state.items.concat(json))
    }, 10);
  })
  };
  handleClick(){
    this.setState({showMore: true})
  }
  render(){
      let { isLoaded, items } = this.state
      const numberOfItems = this.state.showMore ? items.length : 16
      const carousel = [
        {src: ''}
      ]

      if(!isLoaded){
        return <div><h2 className='Title'>Loading...</h2></div>
      }
      else{
        return (
          // eslint-disable-next-line react/jsx-no-undef
          
          <div>
            <h2 className='Title'>Похожие объявления</h2>
            <div className='App'>
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
              {items.slice(0, numberOfItems).map((item, index )=> (
                // {this.state.items.map((item, i) => (
                  <div  key={index.id}>
                  
                  <div className="Card" >

                    <div className='Card-top'>
                      <h3 className={item.seen?"true":"false"}>Просмотренно</h3>
                      <button><Sravnit/></button>
                      <button><Like/></button>
                    </div>
                    <div  className={item.seen?"bg-orange":"white"}>
                      <div className='down-old'>
                        <p className='oldPrice'>{item.oldPrice} ₽</p>
                        <div className='down-btn'>
                          <button><Car/></button>
                          <button ><Auth className='like'/></button>
                        </div>
                      </div>
                      <h2 className='Price'>{item.price} ₽</h2>
                      <h3>{item.title}</h3>
                      <div className='down-bot'>
                        <p id='max-length' numberOfItems={1}  ellipsizeMode="middle">{item.locality}</p>
                        <p>{item.date}</p> 
                      </div>
                    </div>
                  </div>

                  </div>
              ))}
              </InfiniteScroll>
            </div>
            <div className='showMore'>
              <button className='showMore' onClick={()=> this.handleClick()}>Show more</button>
            </div>
            
          </div>
        );
      }
  }

}
render(<App />, document.getElementById("root"));

export default App;
