import { dataGroups, dataEvent } from '../api/data.js';

Router.route('register',{
	path: '/register',
	template: 'register',
	action () {
		if(Meteor.user() !== null){
			this.redirect('/') 
		};
		this.render();
	}
});


Router.route('login',{
	path: '/login',
	template: 'login',
	action (){
		if(Meteor.user() !== null){
			this.redirect('/') 
		};
		this.render();
	}
});

Router.route('home',{
	path: '/',
	template: 'home',
	waitOn(){
		return [Meteor.subscribe('users')];
	},
	action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
})

Router.route('/createGroup',{
	path: '/createGroup',
	name: 'createGroup',
	template: 'createGroup',
	action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/groups', {
  name: 'groups',
  template: 'groups',
  action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});


Router.route('/group/:name', {
  name: 'group',
  template: 'group',
  data() { 
    return dataGroups.findOne({name: this.params.name}); 

  },
  action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/group/:name/createEvent', {
  name: 'eventCreate',
  template: 'eventCreate',
  data() { 
    return dataGroups.findOne({name: this.params.name}); 
  },
  action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/events', {
  name: 'eventsBlock',
  template: 'eventsBlock',
  action (){
	if(Meteor.user() === null){
		this.redirect('/login') 
	};
	this.render();
	}
});

Router.route('/events/:name', {
  name: 'eventPage',
  template: 'eventPage',
  data () { 
    return dataEvent.findOne({name: this.params.name}); 
  },
  action (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

// // Router.onBeforeAction('loading');
// Router.waitOn(()=>{
// 	return [Meteor.subscribe('users')];	
// })

Router.configure({
	layoutTemplate: 'masterTemplate',
	notFoundTemplate: 'notForund',
})
