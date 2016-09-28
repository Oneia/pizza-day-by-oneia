import { Meteor } from 'meteor/meteor'

import '../imports/api/data.js';


ServiceConfiguration.configurations.remove({
  service: "google"
});

// const services = Meteor.settings.private.oAuth;

// const configure = () => {
//   if ( services ) {
//     for( let service in services ) {
//       ServiceConfiguration.configurations.upsert( { service: service }, {
//         $set: services[ service ]
//       });
//     }
//   }
// };

// Modules.server.configureServices = configure;

// let startup = () => {
//   [...]
//   Modules.server.configureServices();
//   [...]
// };

// var _setBrowserPolicies = () => {
//   [...]
// };

// Modules.server.startup = startup;

ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "484576520293-lm73256me61ka3bd8v4rvo230bnugmr5.apps.googleusercontent.com",
  secret: "lXySqgGoCdM-KFzIOsA_Y-Yg"
});

Meteor.startup(function () {
  process.env.MAIL_URL = 'smtp://postmaster%40sandbox27f4fdf1371744b4a4ceb9b381828c0a.mailgun.org:73eb0bb332cc016492afed8f4664d5e4@smtp.mailgun.org:587';
});


// 484576520293-rfs0pqagafo425ifdnrv43vnpus99ebk.apps.googleusercontent.com

// vYPmdNxjV-ikDUrusX0dwAL1