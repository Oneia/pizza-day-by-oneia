import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './register.html';
import { throwError } from '../../api/data.js';


Template.register.events({
'submit .reg-form'(e) {
	e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const username = target.name.value;
    const password = target.pass.value;
    if(email.match(/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/) === null){
    	throwError('The email must be correct')
    }
    else if(password.match(/^[\w_]{6,18}$/) === null){
    	throwError('The password must be between 6 and 18 characters')
    } else {
	    Accounts.createUser({username:username,password:password,email:email},(err) =>{
	        if(err){
                console.log(err);
            }
	    });
	}
}
});