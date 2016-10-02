import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups, dataEvent, throwError, dataMenu } from '../../api/data.js';

import './eventMenu.html';


Template.tableMenu.helpers({
	menu(){
		return  dataMenu.find();
	}
})

Template.tableMenu.events({
	'click .event__btn-confirm>button': (e,t) => {
		e.preventDefault();
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		const username = Meteor.user().username;
		let checkConfirm = _.where(thisEvent.partisipants, {name: username})
		if(checkConfirm[0].status === true){
		 	throwError('Sorry, u already did it');
		} else {
		const MBody = t.find(".table-event>tbody");
		const trMenu = $(MBody).children();
		let total = 0;
		let menu = [];
		const id = thisEvent._id;
		for(let i =0; i< trMenu.length; i++){
			let name = $(trMenu[i]).children('.table-event-name').text();
			let price = $(trMenu[i]).children('.table-event-price').text();
			let qty = parseInt($(trMenu[i]).children('.table-event-qty').children().val());
			if(qty > 0){
					menu.push({name, price, qty});
					total = total + qty*price;	
				}
			}
		Meteor.call('dataEvent.confirm', id, username, menu, total,
			(err)=>{
				if(err){
					throwError(err)}
			})
	}
}
})