import { dataGroups, dataEvent } from '../api/data.js';

Router.route('register',{
	path: '/register',
	template: 'register',
	action(){
		 if( Meteor.user() !== null){
			this.redirect('/')
		}
		this.render();
	}
});


Router.route('login',{
	path: '/login',
	template: 'login',
	action (){
		if( Meteor.user() !== null){
			this.redirect('/')
		}
		this.render();
	}
});

Router.route('home',{
	path: '/',
	template: 'home',
	waitOn(){
		return [Meteor.subscribe('users')];
	}
});

Router.route('/createGroup',{
	path: '/createGroup',
	name: 'createGroup',
	template: 'createGroup'
});

Router.route('/groups', {
	name: 'groups',
	template: 'groups'
});


Router.route('/group/:name', {
	name: 'group',
	template: 'group',
	data() {
		return dataGroups.findOne({name: this.params.name});
	}
});

Router.route('/group/:name/createEvent', {
	name: 'eventCreate',
	template: 'eventCreate',
	data() {
		return dataGroups.findOne({name: this.params.name});
	}
});

Router.route('/events', {
	name: 'eventsBlock',
	template: 'eventsBlock'
});

Router.route('/events/:name', {
	name: 'eventPage',
	template: 'eventPage',
	data () {
		return dataEvent.findOne({name: this.params.name});
	}
});

Router.onBeforeAction( function onBeforeActionRouter () {
	if(Meteor.user() === null){
		this.redirect('/login')
	}
	this.render();
},{except:['register', 'login']});

Router.configure({
	layoutTemplate: 'masterTemplate',
	notFoundTemplate: 'notForund'
});

