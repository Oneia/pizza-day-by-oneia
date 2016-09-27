import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../errors/error.js';
import '../login/login.js';
import '../login/register1.js';
import '../main/home.js';
import '../default/404.js';
import '../default/loading.js';
import '../event/event.js';
import '../event/eventCreate.js';
import '../groups/groups.js';
import '../event/events.js';
import './body.html';

Template.masterTemplate.helpers({
	currentUser(){
		if(Meteor.user() !== null){
			  if( Meteor.user().username !== undefined){
				  return Meteor.user().username;
				} else if(Meteor.user().services.google.name !== undefined){
				   return  Meteor.user().services.google.name 
				}
		} else return 'good people';
		  
	},
	currentDate(){
		return new Date().getFullYear();
	},
	// newGroup(){
	// 	return 1;
	// },
	// newEvent(){
	// 	return 1;
	// }
});

Template.masterTemplate.events({
	'click .logout': (e,t) =>{
		e.preventDefault();

		Meteor.logout();
	}
})

Template.masterTemplate.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('menu');
  Meteor.subscribe('images');
  Meteor.subscribe('imagesUsers');
  Meteor.subscribe('discounts');
  Meteor.subscribe('groups');
  Meteor.subscribe('events');
  Meteor.subscribe('users');
  Meteor.subscribe('userData');
});
