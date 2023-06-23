// import {ConfigEnv} from "./config-env"
//
// class Environment extends ConfigEnv {
//   public production: boolean;
//   // public cognito: any;
//   // public apiUrl: string;
//
//   constructor() {
//     super();
//
//     this.production = false;
//     // this.apiUrl = '';
//     // this.cognito = {
//     //     REGION: "us-west-1",
//     //     USER_POOL_ID: "eu-west-1_CdKFQKbJ7",
//     //     APP_CLIENT_ID: "6t34pmlghpdu1blvp45c5bp4mu"
//     //   }
//   }
// }
//
// export const environment = new Environment();


// export const environment = {
//   production: false,
//  //apiUrl : 'https://dev.api.ankan.fr/',
//    apiUrl : 'http://localhost:8080/',
//
//  cognito:{
//   REGION: "us-west-2",
//   USER_POOL_ID: "eu-west-1_USszTTqhQ",
//   APP_CLIENT_ID: "5kkjhnvplpajv4cqhm7smdhva6"
// }
// };
class Environment {
  public production: boolean;


  constructor() {
    this.production = false;

  }
}

export const environment = new Environment();
