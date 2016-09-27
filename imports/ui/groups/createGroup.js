import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Data } from '../../api/data.js';
import { imgUsers } from '../../api/data.js';
import { dataMenu } from '../../api/data.js';
import { dataGroups } from '../../api/data.js';
import { throwError } from '../../api/data.js';

import './createGroup.html';


// Template.stepOne.helpers({
// 	getIco(){
// 		return Data.find({}).fetch();
// 	}
// })
let nameUser;
Template.stepTwo.helpers({
	getUsers(){
		if( Meteor.user().username !== undefined){
		  nameUser =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   nameUser =   Meteor.user().services.google.name 
		}
		return Meteor.users.find({username: {$ne: nameUser}}).fetch();
	},
	getUserss(){
		if( Meteor.user().username !== undefined){
		  nameUser =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   nameUser =   Meteor.user().services.google.name 
		}
		   let arr = Meteor.users.find().fetch();
		   let arrU = [];
		   for (let i = 0; i< arr.length; i++){
		   		arrU.push(arr[i].services.google)
		   }
		   let rej = _.filter(arrU, (num)=>{ return num!== undefined});
		   let nam = _.filter(rej, (num)=>{return num.name !== nameUser})
		    return  nam;
		}
})


Template.createGroup.events({
	'click .create-group__img': (event) =>  {
		$('.create-group__logo>div').removeClass('checked');
		$(event.currentTarget).addClass('checked');
	},
	'click .create-group__menu>tbody>tr': (event) =>  {
		console.log('test');
		$(event.currentTarget).toggleClass('checked');
	},
	'click .create-group__users>li': (event) =>  {
		$(event.currentTarget).toggleClass('checked');
	},
	'submit form': (event) => {
		event.preventDefault();
		let name = $('#nameGroup').val();
		if(dataGroups.findOne({name: name}) !== undefined){
			ThrowError('Sry, the name is already engaged ')
		} else{
		let logo = $('.create-group__logo input').val();
		// console.log(urlValidateImg(logo));;
		urlValidateImg(logo).then(
			result=>{
				let users = getChecked('.create-group__users>li');
				users.push(nameUser)
				// let menu = dataMenu.find();
				Meteor.call('groupCreate.insert', name, logo, users, (err)=>{
					if(err){throwError('error');}
					else {Router.go(`/group/${name}`);}

				})
			},
			error=>{
				throwError("Oops, image's src failed")
			}
			)
		}
		
	}

})

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
	var promise = new Promise((res, rej)=>{
		let img = document.createElement('img');
		//console.log(img);
		$(img).attr('src',url);
		//$('.create-group__logo').append(img);
		$(img).error(()=>{ 
			rej('false');
		});
		$(img).load(()=>{ 
			res('true');
		});
	})
	
	return promise;
}
