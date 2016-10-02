import { Meteor } from 'meteor/meteor';

import { dataGroups, dataEvent, throwError } from '../data.js';


export const sendMailNotification = (eventId, menuToUser, totalUser) =>{
	const thisEvent = dataEvent.findOne({_id: eventId});
	const username = Meteor.user().username;
	const emailDataUser = {
			  username,
			  menu: menuToUser,
			  totall: totalUser
			};
	const mail = Meteor.users.findOne({username: username}).emails[0].address;
	Meteor.call('sendEmail',
	    mail,
	    'blanar.vanya@gmail.com',
	    `Hello from Piza day!`,
	    'MailToUser.html', emailDataUser, (err)=>{	
	      if(!thisEvent.partisipants.some(checkEvent)){
	        let emailDataAuthor = {
	          username: thisEvent.author,
	          eventName: thisEvent.name,
	          eventDate: thisEvent.date,
	          groupName: thisEvent.group,
	          Items: letTotalFromAll()
	        };
	        const mail = Meteor.users.findOne({username: thisEvent.author}).emails[0].address;
	        Meteor.call('sendEmail',
	          mail,
	          'blanar.vanya@gmail.com',
	          `Hello from Piza day!`,
	          'MailToAuthor.html',emailDataAuthor, (err)=>{
	            if(err){console.log(err)} else{
	            Meteor.call('dataEvent.status', eventId, 'ordered')}
	          }
	          )
	      }
	    });
	
	function checkEvent (element){
		return element.status === false;
	}
	// function checkEvent(){
	// const users = thisEvent.partisipants;
	// for(let i =0; i< users.length; i++){
	// 	if(users[i].status === false){
	// 		return false
	// 	} 
	// }
	// return true;

	// }
	function letTotalFromAll(){
		const users = thisEvent.partisipants;
		let total = 0;
		let menuList = [];
		for(let i =0; i<users.length; i++){
			total +=users[i].totall;
			for(let j =0; j<users[i].menu.length; j++){
				menuList.push(users[i].menu[j])
			}
		};
		message ={
			total,
			menuList

		}
		return message;
	}

}