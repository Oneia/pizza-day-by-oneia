import { Meteor } from 'meteor/meteor'

import '../imports/api/data.js';


ServiceConfiguration.configurations.remove({
  service: "google"
});


ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: Meteor.settings.google.clientId,
  secret: Meteor.settings.google.secret
});

Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://postmaster%40sandbox27f4fdf1371744b4a4ceb9b381828c0a.mailgun.org:73eb0bb332cc016492afed8f4664d5e4@smtp.mailgun.org:587';
});

Accounts.onCreateUser((options, user) => {
  if (user.services.google){
    user.username = user.services.google.name;
    user.emails = [];
    user.emails.push({address: user.services.google.email});
  }
  return user;
});

// 484576520293-rfs0pqagafo425ifdnrv43vnpus99ebk.apps.googleusercontent.com

// vYPmdNxjV-ikDUrusX0dwAL1

//last working
//484576520293-lm73256me61ka3bd8v4rvo230bnugmr5.apps.googleusercontent.com
//lXySqgGoCdM-KFzIOsA_Y-Yg