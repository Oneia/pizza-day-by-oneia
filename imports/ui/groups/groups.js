import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import './groups.html';


Template.groups.helpers({
	myGroups(){
		let name= Meteor.user().username;
		return  dataGroups.find({users: name})
	}
});