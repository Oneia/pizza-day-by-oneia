import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { throwError, dataMenu } from '../../../api/data.js';

import './tableEdit.html';

Template.tableEdit.helpers({
	getMenu(){
		return dataMenu.find();
	}
});

Template.menuItems.onCreated(function onCreatedMenu(){
  this.state = new ReactiveVar();
  this.state.set(false);

  this.startEditMenu = () => {
    this.state.set(true);
  };

  this.stopEditMenu  = () => {
  	this.state.set(false);
  };
});

Template.menuItems.helpers({
	edit(){
		const instance = Template.instance();
		return instance.state.get();
	}
});

Template.menuItems.events({
	'click .table-edit__end' (e,t){
		e.preventDefault();
		const instance = Template.instance();
		const name = t.find('.edit-name').value;
		const price = t.find('.edit-price').value;		
		const menuId = t.find('.menu-id').innerText;
		Meteor.call('groupsMenu.update', menuId, name, price,  (err) =>{
			if(err){
				throwError(err.reason);
			} 
			else{ 
				instance.stopEditMenu();
			}
		});
	},
	'click .table-edit__start' (){
		const instance = Template.instance();
		instance.startEditMenu();
	}
});
