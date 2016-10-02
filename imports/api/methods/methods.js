import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { SSR, Template } from 'meteor/meteorhacks:ssr';

import{ dataMenu, dataGroups, dataEvent, throwError} from '../data.js';
import { sendMailNotification } from './sendEmalNotification.js'

Meteor.methods({
  'groupCreate.insert'(name, logo,users){
    check(name, String);
    check(users, Array);
    // let menuData = dataMenu.find({}).fetch();
    // let menu = [];
    // for(let i =0; i< menuData.length; i++){
    //   const name = menuData[i].name;
    //   const price = menuData[i].price;
    //   const id = menuData[i]._id;
    //   menu.push({
    //     name,
    //     price,
    //     id
    //   })
    // }
  const username = Meteor.user().username;
    dataGroups.insert({
      authorId: this.userId,
      author: username,
      createdAt: new Date(),
      name,
      logo,
      users
    })
  },
  'groupsUsers.update'(id,user) {
    check(user, String);
     //const username = Meteor.user().username;
    if(this.userId !== dataGroups.findOne({_id: id}).authorId){
      throwError('Sorry, u cant add users');
    } else {
        dataGroups.update({
        _id: id
        }, {$push: { users: user}});
      }
  },
  'groupsUsers.delete'(id,user){
    check(user, String);
    const username = Meteor.user().username;
    if(username !== dataGroups.findOne({_id: id}).author || user === dataGroups.findOne({_id: id}).author ){
      throwError('Sorry, u cant delete author');
    } else {
        dataGroups.update({
        _id: id
        }, {$pull: { users: user}});
      }
  },
  'groupsMenu.update'(menuId, name, price){
    dataMenu.update({name: menuId}, {
      $set: {
        name,
        price
      }
    })
  },
  // 'groupsMenu.update'(groupId, menuId, name, price, coupons){
  //   // check(name, String);
  //   // check(price, Number);
  //   dataGroups.update({'_id': groupId, 'menu.name': menuId}, {
  //     $set:{
  //       'menu.$': {
  //          name,
  //           price,
  //           coupons
  //       }
  //     }
  //   })
  //  },
   'dataEvent.insert'(name,date, group, partisipants){
   const username = Meteor.user().username;
    if(dataEvent.findOne({name: name}) !== undefined){
      throw new Meteor.Error('Sry, the name is already engaged')
    } else {
        dataEvent.insert({
          author:username,
          name,
          date,
          group,
          created: new Date(),
          status: 'ordering',
          partisipants,
        });
    }
   },
   'dataEvent.confirm'(id, user, menu, totall){
     const thisEvent = dataEvent.findOne({_id: id});
     const username = Meteor.user().username;
     let b = _.where(thisEvent.partisipants, {name: username});
     if(b[0].status === true){
      throwError('Sorry, u already did it');
      } else {
        dataEvent.update({'_id': id, 'partisipants.name': user},{ 
          $set:{
            "partisipants.$":{
              name: user,
              status: true,
              totall,
              menu
            }
          }
        }, (err) => {
          if(err){
            throw new Meteor.Error(err)
          } else{
              sendMailNotification(id, menu, totall);
          }
        })
      }
   },
   'dataEvent.status'(id, status){
    dataEvent.update({'_id': id},{$set: {"status": status}})
   },
  'sendEmail'(to, from, subject, html, data) {
     check([to, from, subject], [String]);
    let htmlUser;
    if (Meteor.isServer) {
      SSR.compileTemplate( 'htmlEmailUser', Assets.getText( html ) );
      htmlUser = SSR.render("htmlEmailUser", data);
    }
    this.unblock();
    Email.send({
      to,
      from,
      subject,
      html: htmlUser
    });
  }
})
