import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Email } from 'meteor/email'
import { SSR } from 'meteor/meteorhacks:ssr';

import { dataGroups } from '../../api/data.js';
import { dataEvent } from '../../api/data.js';
import { throwError } from '../../api/data.js';

import './event.html';

let nameGroup;
let groupUsers;
let thisEvent;
let group;

Template.eventPage.onCreated(() =>{
	nameEvent = Router.current().params.name;
})

Template.eventPage.helpers({
	menu(){
		thisEvent = dataEvent.findOne({name: nameEvent});
		nameGroup = thisEvent.group;
		group = dataGroups.findOne({name: nameGroup})
		groupMenu = group.menu;
		return groupMenu;
	},
	author(){
		let name;
		if( Meteor.user().username !== undefined){
		  name =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   name =   Meteor.user().services.google.name 
		}
		if(thisEvent.author === name){
			return true
		} else return false
	},
	users(){
		// console.log(Meteor.user().emails[0].address);
		return thisEvent.partisipants
	},
	confirmed(){
		let counter =0;
		let users = thisEvent.partisipants;
		console.log(users);
		let saf = users.length;
		for(let i =0; i< users.length; i++){
			if(users[i].status === true){
				counter++;
			}
		}
		let obj = {
			counter,
			full: saf
		}
		return obj;
	}
})

Template.eventPage.events({
	'click .btn-send': (e,t)=>{
			if(thisEvent.status === 'ordered'){
			Meteor.call('dataEvent.status', thisEvent._id, 'delivering', (err)=>{
			setTimeout(()=>{
				Meteor.call('dataEvent.status', thisEvent._id, 'delivered')
			}, 50000);
		});
		} else{throwError('U cant do It')}	
	},
	'click .event__btn-confirm>button': (e,t) => {
		let name;
		if( Meteor.user().username !== undefined){
		  name =  Meteor.user().username;
		} else if(Meteor.user().services.google.name !== undefined){
		   name =   Meteor.user().services.google.name 
		}
		let as = _.where(thisEvent.partisipants, {name: name})
		console.log()
		 if(as[0].status === true){
		 	throwError('Sorry, u already did it');
		 } else {
		let b = $(".table-event>tbody>tr");
		let total = 0;
		let menu = [];
		
//let name = Meteor.user().username;
		let id = thisEvent._id;
		for(let i =0; i< b.length; i++){
			if($(b[i]).children('.td-btn').children().prop('checked'))
				{
					//console.log('tt');
					let name = $(b[i]).children('.table-event-name').text();
					let price = $(b[i]).children('.table-event-price').text();
					let qty = $(b[i]).children('.table-event-qty').children().val();
					menu.push({name, price, qty});
					let c = _.where(groupMenu, {name: name})
					// if(c[0].coupons > 0){
					// 	total = (total + qty*price)/0.15;
					// } else {
						total = total + qty*price;
					// }
					// console.log(price);
					// console.log(qty)
					
				}
			}
			let emailDataUser = {
			  username: name,
			  menu,
			  totall: total
			};
		Meteor.call('dataEvent.confirm', id, name, menu, total,
			(err)=>{
				if(err){
					throwError(err.result)
				} else {
					let mail;
					if(Meteor.users.findOne({username: name}) === undefined){
						mail = Meteor.users.findOne({'services.google.name': name}).services.google.email;
					}else {
						  mail = Meteor.users.findOne({username: name}).emails[0].address;
					}
					//console.log(mail);
					Meteor.call('sendEmail',
			            mail,
			            'blanar.vanya@gmail.com',
			            `Hello from Piza day!`,
			            'MailToUser.html', emailDataUser, (err)=>{
			            	if(checkEvent()){
			            		let emailDataAuthor = {
			            			username: thisEvent.author,
			            			eventName: thisEvent.name,
			            			eventDate: thisEvent.date,
			            			groupName: thisEvent.group,
			            			Items: letTotalFromAll()
			            		};
			            		let mail;
			            		if(Meteor.users.findOne({username: thisEvent.author}) === undefined){
									mail = Meteor.users.findOne({'services.google.name': thisEvent.author}).services.google.email;
								}else {
									  mail = Meteor.users.findOne({username: thisEvent.author}).emails[0].address;
								}
								//console.log(mail);
			            		Meteor.call('sendEmail',
						            mail,
						            'blanar.vanya@gmail.com',
						            `Hello from Piza day!`,
						            'MailToAuthor.html',emailDataAuthor, (err)=>{
						            	if(err){console.log(err);} else{
						            	Meteor.call('dataEvent.status', thisEvent._id, 'ordered')}
						            }
						            )
			            	}
			            });

				}
			})
	}
}
})
function checkEvent(){
	let users = thisEvent.partisipants;
	console.log(users);
	for(let i =0; i< users.length; i++){
		if(users[i].status === false){
			return false
		} 
	}
	return true;

}
function letTotalFromAll(){
	let users = thisEvent.partisipants;
	let total = 0;
	let menuList = [];
	for(let i =0; i<users.length; i++){
		total +=users[i].totall;
		console.log(users[i].menu);
		for(let j =0; j<users[i].menu.length; j++){
			console.log(users[i].menu[j]);
			menuList.push(users[i].menu[j])
		}
	};
	str ={
		total: total,
		menuList

	}
	return str;
}
