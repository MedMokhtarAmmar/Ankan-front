declare var window: any;

export class ConfigEnv {
  public get environment() {
    return window.config;
  }
}
