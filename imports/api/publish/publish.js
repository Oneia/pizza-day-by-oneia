import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { dataGroups, dataEvent, dataMenu } from '../data.js';

if (Meteor.isServer) {
  Meteor.publish("users", () => {
    return Meteor.users.find({}, {
      fields: {
      'services': 0,
      },
    })
  });
  Meteor.publish('menu', () => {

      if(this.userId !== null) return dataMenu.find(); 
      
  });
  Meteor.publish('groups', () => {
    
      if(this.userId !== null) return dataGroups.find();
    
  });
  Meteor.publish('events', () => {
    
      if(this.userId !== null) return dataEvent.find();
    
  });
  
}