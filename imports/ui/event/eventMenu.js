import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataEvent, throwError, dataMenu } from '../../api/data.js';

import './eventMenu.html';

Template.eventMenu.events({
  'change input'(e,t) {
	e.preventDefault();
  	const name = this.item.name;
  	const price = this.item.price;
  	const qty = t.find('input').value;
  	let arr = this.menuOrder.get();
  	if(this.menuOrder.get().length !== 0){
  		 arr =_.filter(this.menuOrder.get(), (num) =>{
  		return num.name !== name
	  	});
	  	arr.push({
	  		name,
	  		price,
	  		qty
	  	});
  	}
  	else {
  	 	arr.push({
	  		name,
	  		price,
	  		qty
	  	});
  	}
    this.menuOrder.set(arr);
  }
});