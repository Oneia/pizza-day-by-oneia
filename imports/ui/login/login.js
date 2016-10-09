                                                                                                                                import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { throwError } from '../../api/data.js';

import './login.html';


Template.login.events({
    'submit .login-form'(e){
      e.preventDefault();
      const target = e.target;
      const email = target.email.value;
      const password = target.password.value;
        Meteor.loginWithPassword(email,password,(error) =>{
        throwError(error.reason);
      });
      target.email.value = '';
      target.password.value = '';
    }, 
    'click #login-buttons-google'(){
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
          }, (error) => {
            if (error)
              throwError(error.reason);
          });
    }   
});