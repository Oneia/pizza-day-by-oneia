import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';
import { throwError } from '../../api/data.js';


Template.login.events({
    'click #login-button': function(e,t){
        var email = t.find('#login-email').value,
            password = t.find('#login-password').value;
          
        Meteor.loginWithPassword(email,password,function(err){
          throwError(err.reason);
        });
        t.find('#login-email').value = '';
        t.find('#login-password').value = '';
    }, 

    'click #login-buttons-google': (e,t) =>{
          Meteor.loginWithGoogle({
              requestPermissions: ['profile', 'email']
            }, function (err) {
              if (err)
                throwError(err.reason);
            });

    }   
});