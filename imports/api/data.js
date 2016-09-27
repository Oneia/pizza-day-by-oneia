import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Email } from 'meteor/email';
import { check } from 'meteor/check';
import { SSR, Template } from 'meteor/meteorhacks:ssr';


export const imgUsers = new Mongo.Collection('imagesUsers');
export const dataMenu = new Mongo.Collection('menu');
export const dataDiscount = new Mongo.Collection('discounts');
export const dataGroups =  new Mongo.Collection('groups');
export const dataEvent = new Mongo.Collection('events');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('menu', () => {
    return dataMenu.find();
  });
  Meteor.publish('imagesUsers', () => {
    return imgUsers.find();
  });
  Meteor.publish('discounts', () => {
    return dataDiscount.find();
  });
  Meteor.publish('groups', () => {
    return dataGroups.find();
  });
  Meteor.publish('events', () => {
    return dataEvent.find();
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find();
  });

  SSR.compileTemplate( 'htmlEmailUser', Assets.getText( 'MailToUser.html' ) );
}

 export const Errors = new Mongo.Collection(null);

export const throwError = (message)=> {
  Errors.insert({message: message});
}
// export const sendMail = ()=>{
//  SSR.compileTemplate( 'htmlEmailUser', Assets.getText( 'MailToUser.html' ) );
       
// }

Meteor.methods({
  'groupCreate.insert'(name, logo,users){
    check(name, String);
    check(users, Array);
    let menuData = dataMenu.find({}).fetch();
    let menu = [];
    for(let i =0; i< menuData.length; i++){
      let name = menuData[i].name;
      let price = menuData[i].price;
      let id = menuData[i]._id;
      menu.push({
        name,
        price,
        id
      })
    }
   let nameUser;
    if( Meteor.user().username !== undefined){
      nameUser =  Meteor.user().username;
    } else if(Meteor.user().services.google.name !== undefined){
       nameUser =   Meteor.user().services.google.name 
    }
    dataGroups.insert({
      author: nameUser,
      createdAt: new Date(),
      name,
      logo,
      users,
      menu
    })
  },
  'groupsUsers.update'(id,user) {
    check(user, String);
    let nameUser;
    if( Meteor.user().username !== undefined){
      nameUser =  Meteor.user().username;
    } else if(Meteor.user().services.google.name !== undefined){
       nameUser =   Meteor.user().services.google.name 
    }
    if(nameUser !== dataGroups.findOne({_id: id}).author){
      throwError('Sorry, u cant add users');
    } else {
        dataGroups.update({
        _id: id
        }, {$push: { users: user}});
      }
  },
  'groupsUsers.delete'(id,user){
    check(user, String);
    let nameUser;
    if( Meteor.user().username !== undefined){
      nameUser =  Meteor.user().username;
    } else if(Meteor.user().services.google.name !== undefined){
       nameUser =   Meteor.user().services.google.name 
    }
    if(nameUser !== dataGroups.findOne({_id: id}).author || user === dataGroups.findOne({_id: id}).author ){
      throwError('Sorry, u cant delete author');
    } else {
        dataGroups.update({
        _id: id
        }, {$pull: { users: user}});
      }
  },
  'groupsMenu.update'(groupId, menuId, name, price, coupons){
    // check(name, String);
    // check(price, Number);
    // console.log(groupId, menuId, name, price, coupons);
    // console.log(menuId =='ObjectId("57da81e4ba5230c2188e6e43")')
    dataGroups.update({'_id': groupId, 'menu.name': menuId}, {
      $set:{
        'menu.$': {
           name,
            price,
            coupons
        }
      }
    })
   },
   'dataEvent.insert'(name,date, group, partisipants){
    let nameUser;
    if( Meteor.user().username !== undefined){
      nameUser =  Meteor.user().username;
    } else if(Meteor.user().services.google.name !== undefined){
       nameUser =   Meteor.user().services.google.name 
    }
    if(dataEvent.findOne({name: name}) !== undefined){
      throw new Meteor.Error('Sry, the name is already engaged')
    } else {
        dataEvent.insert({
          author:nameUser,
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
     let thisEvent = dataEvent.findOne({_id: id});
     let nameUser;
      if( Meteor.user().username !== undefined){
        nameUser =  Meteor.user().username;
      } else if(Meteor.user().services.google.name !== undefined){
         nameUser =   Meteor.user().services.google.name 
      }
     let b = _.where(thisEvent.partisipants, {name: nameUser});
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
        })
      }
   },
   'dataEvent.status'(id, status){
    dataEvent.update({'_id': id},{$set: {"status": status}})
   },
  'sendEmail'(to, from, subject, html, data) {
     check([to, from, subject], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    //console.log(SSR);
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
