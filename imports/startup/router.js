import { dataGroups } from '../api/data.js';
import { dataEvent } from '../api/data.js';

Router.route('register',{
	path: '/register',
	template: 'register',
	action: function (){
		if(Meteor.user() !== null){
			this.redirect('/') 
		};
		this.render();
	}
});


Router.route('login',{
	path: '/login',
	template: 'login',
	action: function (){
		if(Meteor.user() !== null){
			this.redirect('/') 
		};
		this.render();
	}
});

Router.route('home',{
	path: '/',
	template: 'home',
	action: function (){
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
	action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/groups', {
  name: 'groups',
  template: 'groups',
  action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});


Router.route('/group/:name', {
  name: 'group',
  template: 'group',
  data: function() { 
  	//console.log(this.params);
  	//console.log(dataGroups.findOne({name: this.params.name}));
    return dataGroups.findOne({name: this.params.name}); 

  },
  action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/group/:name/createEvent', {
  name: 'eventCreate',
  template: 'eventCreate',
  data: function() { 
  	//console.log(this.params);
  	//console.log(dataGroups.findOne({name: this.params.name}));
    return dataGroups.findOne({name: this.params.name}); 

  },
  action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/events', {
  name: 'eventsBlock',
  template: 'eventsBlock',
  action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});

Router.route('/events/:name', {
  name: 'eventPage',
  template: 'eventPage',
  data: function() { 
  	//console.log(this.params);
  	//console.log(dataGroups.findOne({name: this.params.name}));
    return dataEvent.findOne({name: this.params.name}); 

  },
  action: function (){
		if(Meteor.user() === null){
			this.redirect('/login') 
		};
		this.render();
	}
});






Router.onBeforeAction('loading');


Router.configure({
	layoutTemplate: 'masterTemplate',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notForund'
})

// Router.route('/', {name: 'home'});

// Router.route('/register', {name: 'register'});

// Router.route('/дщпшт', {name: 'groupCreate'});

// Router.route('/groups', {name: 'groupList'});

// Router.route('/groups/:_id', {
//   name: 'groupPage',
//   data: function() { 
//     return Groups.findOne(this.params._id); 
//   }
// });

// Router.route('/groups/:_id/pizza-day', {name: 'pizzaDay',
//   data: function() { 
//     return Groups.findOne(this.params._id); 
//   },
// });

// //show pages content only for logged users
// var requireLogin = function() {
//   if (! Meteor.user()) {
//     if (Meteor.loggingIn()) {
//       this.render(this.loadingTemplate);
//     } else {
//       this.render('accessDenied');
//     }
//   } else {
//     this.next();
//   }
// };

// Router.onBeforeAction('loading');
// Router.onBeforeAction(requireLogin, {except: 'home'});