import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import './groups.html';


Template.groups.helpers({
	myGroups(){
		let name;
		if( Meteor.user().username !== undefined){
		  name =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   name =   Meteor.user().services.google.name 
		}
		return  dataGroups.find({users: name})
	}
})