import { Meteor } from 'meteor/meteor';

import { dataGroups, dataEvent, dataMenu } from '../data.js';

if (Meteor.isServer) {
  Meteor.publish("users", () => {
    return Meteor.users.find({}, {
      fields: {
      'services': 0
      }
    });
  });
  Meteor.publish('menu', function checkUser () {
    if(this.userId !== null) return dataMenu.find();
  });
  Meteor.publish('groups', function checkUser () {
       return dataGroups.find();
  });
  Meteor.publish('events', function checkUser () {
       return dataEvent.find();
  });
  
}