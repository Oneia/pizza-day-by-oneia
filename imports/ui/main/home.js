import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import '../groups/group/group.js';
import '../groups/createGroup.js';
import './home.html';


Template.home.helpers({
	groupsYep(){
		let nameUser = Meteor.user().username;
		let groupsMy = dataGroups.find({author: nameUser}).fetch();
		return 0 > groupsMy.length;
	},
	myGroups(){
		let nameUser = Meteor.user().username;
		return  dataGroups.find({author: nameUser});
	}
});
