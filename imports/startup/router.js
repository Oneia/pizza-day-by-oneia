import { dataGroups, dataEvent } from '../api/data.js';

Router.route('register',{
	path: '/register',
	template: 'register',
	action () {
		checkLogin(Meteor.user(), this)
	}
});


Router.route('login',{
	path: '/login',
	template: 'login',
	action (){
		checkLogin(Meteor.user(), this)
	}
});

Router.route('home',{
	path: '/',
	template: 'home',
	waitOn(){
		return [Meteor.subscribe('users')];
	},
	action (){
		checkLogin(Meteor.user(), this)
	}
})

Router.route('/createGroup',{
	path: '/createGroup',
	name: 'createGroup',
	template: 'createGroup',
	action (){
		checkLogin(Meteor.user(), this)
	}
});

Router.route('/groups', {
  name: 'groups',
  template: 'groups',
  action (){
		checkLogin(Meteor.user(), this)
	}
});


Router.route('/group/:name', {
  name: 'group',
  template: 'group',
  data() { 
    return dataGroups.findOne({name: this.params.name}); 

  },
  action (){
		checkLogin(Meteor.user(), this)
	}
});

Router.route('/group/:name/createEvent', {
  name: 'eventCreate',
  template: 'eventCreate',
  data() { 
    return dataGroups.findOne({name: this.params.name}); 
  },
  action (){
		checkLogin(Meteor.user(), this)
	}
});

Router.route('/events', {
  name: 'eventsBlock',
  template: 'eventsBlock',
  action (){
	checkLogin(Meteor.user(), this)
	}
});

Router.route('/events/:name', {
  name: 'eventPage',
  template: 'eventPage',
  data () { 
    return dataEvent.findOne({name: this.params.name}); 
  },
  action (){
		checkLogin(Meteor.user(), this)
	}
});


Router.configure({
	layoutTemplate: 'masterTemplate',
	notFoundTemplate: 'notForund',
})

function checkLogin(user, self){
	if(user === null){
			self.redirect('/login') 
		} else if( user !== null){
			self.redirect('/')
		}
		self.render();
}