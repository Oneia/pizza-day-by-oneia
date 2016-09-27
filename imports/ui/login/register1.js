import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './register.html';
import { throwError } from '../../api/data.js';


Template.register.events({
'submit form': (e,t) =>{
	e.preventDefault();
    let email = t.find('#email').value;
    let username = t.find('#username').value;
    let password = t.find('#password').value;
    if(email.match(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/) === null){
    	throwError('The email must be correct')
    }
    else if(password.match(/^[\w_]{6,18}$/) === null){
    	throwError('The password must be between 6 and 18 characters')
    } else {
	    Accounts.createUser({username:username,password:password,email:email},(err) =>{
	        throwError(err.reason);
	    });
	}
}
});