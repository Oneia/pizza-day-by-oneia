import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { SSR } from 'meteor/meteorhacks:ssr';

 SSR.compileTemplate( 'htmlEmailUser', Assets.getText( 'MailToUser.html' ) );
 SSR.compileTemplate( 'htmlAuthorEmail', Assets.getText( 'MailToAuthor.html' ) );


var emailDataUser = {
  name: "Doug Funnie",
  favoriteRestaurant: "Honker Burger",
  bestFriend: "Skeeter Valentine",
};

Email.send({
  to: "to.address@email.com",
  from: "from.address@email.com",
  subject: "Example Email",
  html: SSR.render('htmlEmail', emailData),
});