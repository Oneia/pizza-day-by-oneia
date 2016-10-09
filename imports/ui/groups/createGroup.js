import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups, throwError } from '../../api/data.js';

import './createGroup.html';

Template.stepTwo.helpers({
	getUsers(){
		const nameUser = Meteor.user().username;
		return Meteor.users.find({username: {$ne: nameUser}});
	}
});

Template.createGroup.events({
	'click .create-group__users>li' (e)  {
		$(e.currentTarget).toggleClass('checked');
	},
	'submit form' (e) {
		e.preventDefault();
		const nameUser = Meteor.user().username;
		const target = e.target;
		const name = target.name.value;
		if(dataGroups.findOne({name: name}) !== undefined){
			throwError('Sry, the name is already engaged ')
		} else{
		const logo = target.logo.value;
			urlValidateImg(logo).then(
			()=>{
				let users = getChecked('.create-group__users>li');
				users.push(nameUser);
				Meteor.call('groupCreate.insert', name, logo, users, (err)=>{
					if(err){throwError('error');}
					else {Router.go(`/group/${name}`);}

				})
			},
			()=>{
				throwError("Oops, image's link failed")
			}
			)
		}
	}
});


function getChecked(el){
	let arr = $(el);
	let checked = [];
	for(let i =0; i<arr.length; i++){
		if($(arr[i]).hasClass('checked')){
			checked.push($(arr[i]).find('span').text())
		}
	}
	return checked;
}

function urlValidateImg(url){
	//noinspection Eslint,Eslint
	return  new Promise((resolve, reject)=>{
		let img = document.createElement('img');
		$(img).attr('src',url);
		$(img).error(()=> reject('false'));
		$(img).load(()=> resolve('true'));
	});
}
