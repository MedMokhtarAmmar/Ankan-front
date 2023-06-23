import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoadStylesAndScripts{

  public loadExternalStyles(styleUrl: string) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement('link');
      styleElement.href = styleUrl;
      styleElement.onload = resolve;
      document.head.appendChild(styleElement);
    });
  }
  public loadExternalScript(scriptUrl:string){
    return new Promise(resolve => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
