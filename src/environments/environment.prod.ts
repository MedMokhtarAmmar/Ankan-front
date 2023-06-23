
// import {ConfigEnv} from "./config-env"
// class Environment extends ConfigEnv {
//   public production: boolean;
//   public cognito:any;
//   public apiUrl: string;
//
//   constructor() {
//     super();
//     this.production=true;
//     this.cognito={};
//     this.apiUrl = 'api.ankan.fr';
//
//     this.cognito={
//       REGION: "us-west-2",
//       USER_POOL_ID: "eu-west-1_USszTTqhQ",
//       APP_CLIENT_ID: "5kkjhnvplpajv4cqhm7smdhva6"
//     }
//   }
// }
// export const environment = new Environment();










//
// export const environment = {
//   apiUrl : 'https://api.ankan.fr/',
//   production: true,
//   cognito:{
//     REGION: "us-west-2",
//     USER_POOL_ID: "eu-west-1_USszTTqhQ",
//     APP_CLIENT_ID: "5kkjhnvplpajv4cqhm7smdhva6"
//   }
// };
class Environment  {

  public production: boolean;
  constructor() {
    this.production = true;
  }
}

export const environment = new Environment();
