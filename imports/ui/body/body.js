import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

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
		if(Meteor.user() !== null && Meteor.users.find().fetch().length !== 0){
			return Meteor.users.findOne({_id: Meteor.userId()}).username;
		} else return 'good people';  
	},
	currentDate(){
		return new Date().getFullYear();
	}		
});

Template.masterTemplate.events({
	'click .logout'(e){
		e.preventDefault();
		Meteor.logout();
	}
});

Template.masterTemplate.onCreated(() => {
  Meteor.subscribe('users');
  Meteor.subscribe('groups');
  Meteor.subscribe('menu');
  Meteor.subscribe('events');
});