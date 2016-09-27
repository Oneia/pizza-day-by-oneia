import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import './groups.html';
Template.groups.onCreated(()=>{
	var image = $('image');
	image.onerror = function () {
	  this.src = 'images/funnyCat.jpg'; // place your error.png image instead
	};
})


Template.groups.helpers({
	myGroups(){
		let name;
		var image = $('image');
	image.onerror = function () {
	  this.src = 'images/funnyCat.jpg'; // place your error.png image instead
	};
		if( Meteor.user().username !== undefined){
		  name =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   name =   Meteor.user().services.google.name 
		}
		return  dataGroups.find({users: name})
	}
})