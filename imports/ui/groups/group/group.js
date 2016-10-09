import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { throwError } from '../../../api/data.js';

import './group.html';
import './tableEdit.js';


Template.group.helpers({
	getUsers(){
		return Meteor.users.find({username: {$nin: this.users}});
	}
});

Template.group.events({
	'click .btn-add-user' (e) {
		e.preventDefault();
		const groupId = this._id;
		const user = $('option').filter(':selected').val();
		if(user.length !== 0){
			Meteor.call('groupsUsers.update', groupId, user)
		} else throwError('error, sry you cant add empty value');
	},
	'click .btn-new-event' (e) {
		e.preventDefault();
		const gName = this.name;
		Router.go(`/group/${gName}/createEvent`)
	}
});

Template.usersList.events({
	'click .delete' (e) {
		e.preventDefault();
		const groupId = this.id;
		const user = this.user;
		Meteor.call('groupsUsers.delete', groupId, user)
	}
})
