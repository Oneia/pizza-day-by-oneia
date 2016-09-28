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
	groupsYep(){
		let nameUser;
		if( Meteor.user().username !== undefined){
		  nameUser =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   nameUser =   Meteor.user().services.google.name 
		}
		let groupsMy = dataGroups.find({author: nameUser}).fetch();
		// console.log(groupsMy.length);
		// console.log('tata');
		if(groupsMy.length > 0){
			return false;
		} else return true;
	},
	myGroups(){
	    let nameUser;
		if( Meteor.user().username !== undefined){
		  nameUser =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   nameUser =   Meteor.user().services.google.name 
		}
		//console.log('tatta');
		return  dataGroups.find({author: nameUser});
	}
})
// Template.groupsListMy.helpers({
	
// })