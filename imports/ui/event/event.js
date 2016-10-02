import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups, dataEvent, throwError } from '../../api/data.js';

import './event.html';
import './eventMenu.js';



Template.eventPage.helpers({
	author(){
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		let nameUser = Meteor.user().username;
		if(thisEvent.author === nameUser){
			return true
		} else return false
	},
	users(){
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		return thisEvent.partisipants
	},
	confirmed(){
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		let counter =0;
		let users = thisEvent.partisipants;
		let totalUsers = users.length;
		for(let i =0; i< totalUsers; i++){
			if(users[i].status === true){
				counter++;
			}
		}
		let objConfirmingUsers = {
			counter,
			totalUsers
		}
		return objConfirmingUsers;
	},
	currentUserStatus(){
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		const nameUser = Meteor.user().username;
		const users = thisEvent.partisipants;
		let currentUser = _.findWhere(thisEvent.partisipants, {name : nameUser})
		return currentUser.status
	},                                
	eventStatus(){
	    const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		if(thisEvent.status === 'delivered'){
			return false;
		} else return true
	}
})

Template.eventPage.events({
	'click .btn-send': (e,t)=>{
		const nameEvent = Router.current().params.name;
		const thisEvent = dataEvent.findOne({name: nameEvent});
		if(thisEvent.status === 'ordered'){
			Meteor.call('dataEvent.status', thisEvent._id, 'delivering', (err)=>{if(err) {console.log(err)}
			 else {Meteor.call('dataEvent.status', thisEvent._id, 'delivered')}
		});
		} else{throwError('All members must  confirm order.')}	
	}
})


