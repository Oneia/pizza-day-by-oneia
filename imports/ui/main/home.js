import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import '../groups/group.js';
import '../groups/createGroup.js';
import './home.html';

Template.home.onCreated(()=>{
	var image = $('image');
	image.onerror = function () {
	  this.src = 'images/funnyCat.jpg'; // place your error.png image instead
	};
})

Template.home.helpers({
	myGroups(){
		let nameUser;
		if( Meteor.user().username !== undefined){
		  nameUser =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   nameUser =   Meteor.user().services.google.name 
		}
		return  dataGroups.find({author: nameUser})
	}
})