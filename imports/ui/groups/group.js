import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router } from 'meteor/iron:router';
import { Tracker } from 'meteor/tracker'

import { dataGroups, throwError, dataMenu } from '../../api/data.js';

import './group.html';

let edit = new ReactiveVar(false);

Template.group.helpers({
	edit () {
		return edit.get();
	},
	getUsers(){
		const currentGroup = Router.current();
		const gName = currentGroup.params.name;
		let usersGroup = dataGroups.findOne({name: gName}).users;
		return Meteor.users.find({username: {$nin: usersGroup}});
	},
	getMenu(){
		return dataMenu.find();
	}
})

Template.group.events({
	'click .table-edit__start' : (e, t) => {
		e.preventDefault();
		edit.set(true);
	},
	'click .btn-add-user': (e,t) =>{
		e.preventDefault();
		const currentGroup = Router.current();
		const gName = currentGroup.params.name;
		groupId = dataGroups.findOne({name: gName})._id;
		const user = $('#sel1 option:selected').val();
		if(user.length !== 0){
			Meteor.call('groupsUsers.update', groupId, user)
		} else throwError('error, sry you cant add empty value');;
	},
	'click .delete': (e,t) =>{
		e.preventDefault();
		const currentGroup = Router.current();
		const gName = currentGroup.params.name;
		groupId = dataGroups.findOne({name: gName})._id;
		const user = $(e.currentTarget).parent().text();
		Meteor.call('groupsUsers.delete', groupId, user)
	},
	'click .table-edit__end': (e,t) =>{
		e.preventDefault();
		const price = $(e.currentTarget).parent().parent().children('.table-price').children().val();
		const name = $(e.currentTarget).parent().parent().children('.table-name').children().val();
		const menuId = $(e.currentTarget).parent().parent().children('.menu-id').text();
		Meteor.call('groupsMenu.update', menuId, name, price,  (err) =>{
			if(err){
				throwError(err.reason);
			} 
			else{ 
				edit.set(false);
			}
		});
	},
	'click .btn-new-event': (e,t) =>{
		e.preventDefault();
		const currentGroup = Router.current();
		const gName = currentGroup.params.name;
		Router.go(`/group/${gName}/createEvent`)
	}
})
