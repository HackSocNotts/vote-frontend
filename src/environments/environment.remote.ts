// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  remote: true,
  firebase: {
    apiKey: 'AIzaSyAV_4AuxEwLcm0EFArLtMO98e94bHshR7I',
    authDomain: 'ballot-app-dev.firebaseapp.com',
    databaseURL: 'https://ballot-app-dev.firebaseio.com',
    projectId: 'ballot-app-dev',
    storageBucket: 'ballot-app-dev.appspot.com',
    messagingSenderId: '1149304273'
  },
  baseUrl: 'https://us-central1-ballot-app-dev.cloudfunctions.net/'
};
