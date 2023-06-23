import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from "./core/services/guards/auth-guard.service";


export const routes: Routes = [
  {path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  {path: 'client',loadChildren: () => import('./protected/client/client.module').then(m => m.ClientModule) , canLoad: [AuthGuardService]},
  {path: 'courtier',loadChildren: () => import('./protected/courtier/courtier.module').then(m => m.CourtierModule) , canLoad: [AuthGuardService]},
  {path: 'admin',loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canLoad: [AuthGuardService]},
  // {
  //   path: 'courtier',
  //   loadChildren: () => import('./protected/courtier/courtier.module').then(m => m.CourtierModule),
  //   canLoad: [AuthGuardService],
  //   data: {
  //     expectedRole: 'COURTIER'
  //   }
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

