import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './error.html';
import { Errors } from '../../api/data.js';

Template.errorsBlock.helpers({
   errors() {
     return Errors.find();
   }
});