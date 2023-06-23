
// import {ConfigEnv} from "./config-env"
// class Environment extends ConfigEnv {
//   public production: boolean;
//   public cognito:any;
//   public apiUrl: string;
//
//   constructor() {
//     super();
//     this.production=false;
//     this.apiUrl = '';
//
//     this.cognito={};
//     this.cognito={
//     REGION: "us-west-1",
//     USER_POOL_ID: "eu-west-1_CdKFQKbJ7",
//     APP_CLIENT_ID: "6t34pmlghpdu1blvp45c5bp4mu"
//     }
//   }
// }
// export const environment = new Environment();
//
//
//


// export const environment = {
//   production: false,
//   apiUrl : 'https://uat.api.ankan.fr/',
//   cognito:{
//
//     REGION: "us-west-1",
//     USER_POOL_ID: "eu-west-1_CdKFQKbJ7",
//     APP_CLIENT_ID: "6t34pmlghpdu1blvp45c5bp4mu"
//   }
//
// };

class Environment  {

  public production: boolean;
  constructor() {
    this.production = false;
  }
}

export const environment = new Environment();



//
// export const environment = {
//   production: false,
//   apiUrl : 'https://5mog44qo3i.execute-api.eu-west-1.amazonaws.com/stage',
//   cognito:{
//
//     REGION: "us-west-1",
//     USER_POOL_ID: "eu-west-1_CdKFQKbJ7",
//     APP_CLIENT_ID: "6t34pmlghpdu1blvp45c5bp4mu"
//   }
//
// };
