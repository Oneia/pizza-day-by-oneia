import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { dataMenu, dataEvent, throwError } from '../../api/data.js';

import './event.html';
import './eventMenu.js';

Template.eventPage.onCreated(function parentOnCreated() {
  this.menuOrder = new ReactiveVar([]);
});

Template.eventPage.helpers({
	author(){
		return this.author === Meteor.user().username;
	},
	menuHandler(){
		return Template.instance().menuOrder;
	},
	getMenu(){
		return dataMenu.find();
	},
	confirmed(){
		let counter =0;
		let users = this.partisipants;
		let totalUsers = users.length;
		for(let i =0; i< totalUsers; i++){
			if(users[i].status === true){
				counter++;
			}
		}
		return  {
			counter,
			totalUsers
		};
	},
	currentUserStatus(){
		const nameUser = Meteor.user().username;
		let currentUser = _.findWhere(this.partisipants, {name : nameUser});
		return currentUser.status;
	},                                
	eventStatus(){
		return this.status !== 'delivered';
	}
});

Template.eventPage.events({
	'click .btn-send' () {
		if(this.status === 'ordered'){
			Meteor.call('dataEvent.status', this._id, 'delivering', (err)=>{if(err) {throwError(err);}
			else {Meteor.call('dataEvent.status', this._id, 'delivered');}
		});
		} else{throwError('All members must  confirm order.');}
	},
	'click .event__btn-confirm>button'(e){
		e.preventDefault();
		const username = Meteor.user().username;
		let checkConfirm = _.where(this.partisipants, {name: username});
		if(checkConfirm[0].status === true){throwError('Sorry, u already did it');
		} else {
		let menu = Template.instance().menuOrder.get();
		let total = () =>{
				let total = 0;
				for(let i = 0; i<menu.length; i++){
					total +=menu[i].price*menu[i].qty;
				}	
				return total;
		};
		Meteor.call('dataEvent.confirm', this._id, username, menu, total(),
				(err)=>{if(err) throwError(err);}
			);
		}
	}
});


