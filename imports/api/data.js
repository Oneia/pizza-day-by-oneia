import { Mongo } from 'meteor/mongo';

import './publish/publish.js';
import './methods/methods.js';


export const dataMenu = new Mongo.Collection('menu');
export const dataGroups =  new Mongo.Collection('groups');
export const dataEvent = new Mongo.Collection('events');

export const Errors = new Mongo.Collection(null);
export const throwError = (message)=> {
  Errors.insert({message: message});
};

dataMenu.deny({
  insert() {if(this.userId === null) return true; },
  update() {if(this.userId === null) return true; },
  remove() {if(this.userId === null) return true; }
});

dataGroups.deny({
  insert() {if(this.userId === null) return true; },
  update() {if(this.userId === null) return true; },
  remove() {if(this.userId === null) return true; }
});

dataEvent.deny({
  insert() {if(this.userId === null) return true; },
  update() {if(this.userId === null) return true; },
  remove() {if(this.userId === null) return true; }
});