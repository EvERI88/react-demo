import React from "react";
import { Component } from 'react';
import './App.css';
import Like from './iconComponents/Like.tsx'
import Car from './iconComponents/Car.tsx'
import Sravnit from './iconComponents/Sravnit.tsx'
import Auth from './iconComponents/Auth.tsx'
import { display } from '@mui/system';
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";


class Card extends Comment{

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
			  showMore: false
			})
		  });
	  }
	  	render() {
			return(
				<div>
					{ this.items.map(item => (
					<div  key={item}>
					  <Car/>
					</div>
					))}
				</div>
				
			)
	  	}	
				
}

export default Card;
