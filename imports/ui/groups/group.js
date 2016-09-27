import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router } from 'meteor/iron:router';
import { Tracker } from 'meteor/tracker'

import { dataGroups } from '../../api/data.js';
import { dataMenu } from '../../api/data.js';
import { throwError } from '../../api/data.js';


import './group.html';
let b = new ReactiveVar(false);
let usersArr = new ReactiveVar([]);
let title;
let groupId;
let gName;


Template.group.rendered = ()=> {
 	console.log($('.bebe').attr('src'));
		$( '.bebe' ).error(()=>{
			$( this ).attr( "src", "images/pizza-ico.png" )
		})
};
// function authorGroup(group,id){
// 	return Meteor.user().username === group.findOne({_id: id}).author;
// }

Template.group.onCreated(() => {
	let cot = Router.current();
	gName = cot.params.name;
		var image = $('img');
		console.log($('.bebe').attr('src'));
		$( '.bebe' ).attr( "src", "images/funnyCat.jp")
		// image.error(()=>{
		// 	$( this ).attr( "src", "images/funnyCat.jp" )
		// })
})

Template.group.helpers({
	edit () {
		var image = $('img');
		// console.log($('.bebe').attr('src'));
		// $( '.bebe' ).attr( "src", "images/pizza-ico.png")
		$( '.bebe' ).error(()=>{
			$( this ).attr( "src", "../images/funnyCat.jpg" )
		})
		// title = $('.container-group__title span').text();
		// groupId = dataGroups.findOne({name: gName})._id;
		return b.get();
	},
	getUsers(){
		let usersGroup = dataGroups.findOne({name: gName}).users;
		//console.log(usersGroup)
		//let author = dataGroups.findOne({name: title}).author;
		return Meteor.users.find({username: {$nin: usersGroup}});
	}
})

Template.group.events({
	'click .table-edit__start' : (e, t) => {
		e.preventDefault();
		b.set(true);
	},
	'click .btn-add-user': (e,t) =>{
		e.preventDefault();
		groupId = dataGroups.findOne({name: gName})._id;
		let user = $('#sel1 option:selected').val();
		if(user.length !== 0){
			Meteor.call('groupsUsers.update', groupId, user)
		} else throwError('error, sry you cant add empty value');;
	},
	'click .delete': (e,t) =>{
		e.preventDefault();
		groupId = dataGroups.findOne({name: gName})._id;
		let user = $(e.currentTarget).parent().text();
		Meteor.call('groupsUsers.delete', groupId, user)
	},
	'click .table-edit__end': (e,t) =>{
		e.preventDefault();
		groupId = dataGroups.findOne({name: gName})._id;
		let price = $(e.currentTarget).parent().parent().children('.table-price').children().val();
		let name = $(e.currentTarget).parent().parent().children('.table-name').children().val();
		let coupons = $(e.currentTarget).parent().parent().children('.dc-coupons').children().val();
		let menuId = $(e.currentTarget).parent().parent().children('.menu-id').text();
		Meteor.call('groupsMenu.update', groupId, menuId, name, price, coupons, function(err){
			if(err){
				throwError(err.reason);
			} 
			else{ 
				b.set(false);
			}
		});
	},
	'click .btn-new-event': (e,t) =>{
		e.preventDefault();
		Router.go(`/group/${gName}/createEvent`)
	}
})

// console.log(dataGroups.findOne({_id: groupId}).users);