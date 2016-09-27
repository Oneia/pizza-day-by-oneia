import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { dataGroups } from '../../api/data.js';
import { throwError } from '../../api/data.js';

import './eventCreate.html';
let nameGroup;
Date.prototype.customDate = function () {
	// function b(){
	// 	if(this.getMonth().length === 1){
	// 		return 0;
	// 	} else return ''
	// }
	let l = this.getMonth();
	let b = ()=>{
		console.log(l);
		if(l < 9){
			return '0'
		} else return ''
	}
    return this.getFullYear() + 
    "-" +b()+ (this.getMonth()+1) +
    "-" +  this.getDate();
}
Template.eventCreate.onCreated(() =>{
	nameGroup = Router.current().params.name;
})
Template.eventCreate.helpers({
	today(){
		return (new Date().customDate());
	}
})

Template.eventCreate.events({
	'click .event-create-btn': (e,t) => {
		let name = $('#eventName').val();
		console.log(name.length);
		if(name.length === 0){
			throwError('Name cant be empty');
		} 
		else{
		let date = $('#eventDate').val();
		let groupUsers = dataGroups.findOne({name: nameGroup}).users;
		let eventMembers = [];
		for(let i = 0; i< groupUsers.length; i++){
			let obj = {
				name: groupUsers[i],
				status: false,
				menu : [],
				totall: 0
			};
			eventMembers.push(obj);
		};
		Meteor.call('dataEvent.insert', name, date, nameGroup, eventMembers, (err)=>{
			if(err){
				throwError(err.result)
			} else Router.go(`/events/${name}`)
		});
		}
	}
})