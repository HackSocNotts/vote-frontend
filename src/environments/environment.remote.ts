// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  remote: true,
  firebase: {
    apiKey: 'AIzaSyCGz8pjgAp-lwG37Fxp1ihQt6kgruOIGRQ',
    authDomain: 'hacksoc-vote.firebaseapp.com',
    databaseURL: 'https://hacksoc-vote.firebaseio.com',
    projectId: 'hacksoc-vote',
    storageBucket: 'hacksoc-vote.appspot.com',
    messagingSenderId: '1076031256727'
  },
  baseUrl: 'https://us-central1-hacksoc-vote.cloudfunctions.net/'
};
