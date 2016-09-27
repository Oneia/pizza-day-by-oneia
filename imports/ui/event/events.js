import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataEvent } from '../../api/data.js';

import './events.html';
let userName;

Template.eventsBlock.helpers({
	myEvents(){
		 if( Meteor.user().username !== undefined){
				  userName =  Meteor.user().username;
				} else if(Meteor.user().services.google.name !== undefined){
				   userName =   Meteor.user().services.google.name 
				}
		return  dataEvent.find({'partisipants.name': userName})
	}
})