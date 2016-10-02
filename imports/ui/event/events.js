import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataEvent } from '../../api/data.js';

import './events.html';

Template.eventsBlock.helpers({
	myEvents(){
		const userName =  Meteor.user().username;	
		return  dataEvent.find({'partisipants.name': userName})
	}
})