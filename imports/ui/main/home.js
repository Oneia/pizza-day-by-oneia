import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups } from '../../api/data.js';

import '../groups/group.js';
import '../groups/createGroup.js';
import './home.html';


Template.home.helpers({
	groupsYep(){
		let nameUser = Meteor.user().username
		let groupsMy = dataGroups.find({author: nameUser}).fetch();
		if(groupsMy.length > 0){
			return false;
		} else return true;
	},
	myGroups(){
	    let nameUser = Meteor.user().username
	    return  dataGroups.find({author: nameUser});
	}
})
