                                                                                                                                import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { throwError } from '../../api/data.js';

import './login.html';


Template.login.events({
    'submit .login-form'(e){
      e.preventDefault();
      const target = e.target;
      const email = target.email.value;
      const password = target.pass.value;
      Meteor.loginWithPassword(email,password,(err) =>{
        throwError(err.reason);
      });
      target.email.value = '';
      target.pass.value = '';
    }, 
    'click #login-buttons-google'(){
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
          }, (err) => {
            if (err)
              throwError(err.reason);
          });
    }   
});