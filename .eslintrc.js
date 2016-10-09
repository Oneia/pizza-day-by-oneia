module.exports = {
    "scripts": {
    "lint": "eslint .",
    "pretest": "npm run lint --silent"
    },
    "env": {
        "browser": true,
        "meteor": true,
        "es6": true
    },
    "eslintConfig": {
    "parser": "babel-eslint",
    "parserOptions": {
      "allowImportExportEverywhere": true
    },
    "plugins": [
      "meteor"
    ],
    "extends": [
      "airbnb",
      "plugin:meteor/recommended"
    ],
   "settings": {
      "import/resolver": "meteor"
    },
    "rules": {
        "no-console": "off",
        "no-inline-comments": "off"
    }
};

//  "scripts": {
//     "lint": "eslint .",
//     "pretest": "npm run lint --silent"
//   },
//   "eslintConfig": {
//     "parser": "babel-eslint",
//     "parserOptions": {
//       "allowImportExportEverywhere": true
//     },
//     "plugins": [
//       "meteor"
//     ],
//     "extends": [
//       "airbnb",
//       "plugin:meteor/recommended"
//     ],
//     "settings": {
//       "import/resolver": "meteor"
//     },
//     "rules": {}
//   }
// }