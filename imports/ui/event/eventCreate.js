import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { dataGroups, throwError } from '../../api/data.js';

import './eventCreate.html';

Date.prototype.customDate = function () {
	const curentMonth = this.getMonth();
	let checkCurentMonth = ()=>{
		if(curentMonth < 9){
			return '0'
		} else return ''
	}
    return this.getFullYear() + 
    "-" +checkCurentMonth()+ (this.getMonth()+1) +
    "-" +  this.getDate();
}

Template.eventCreate.helpers({
	today(){
		return (new Date().customDate());
	}
})

Template.eventCreate.events({
	'submit .event-create-form'(e) {
		e.preventDefault();
		const nameGroup = Router.current().params.name;
		const target = e.target;
		const name = target.name.value;
		if(name.length === 0){
			throwError('Name cant be empty');
		} 
		else{
		const date = target.date.value;
		const groupUsers = dataGroups.findOne({name: nameGroup}).users;
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