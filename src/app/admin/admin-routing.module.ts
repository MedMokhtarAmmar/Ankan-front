import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AccueilComponent} from './accueil/accueil.component';
import {UsersManagementComponent} from './users-management/users-management.component';
import {CategoriePieceManagementComponent} from "./categorie-piece-management/categorie-piece-management.component";
import {PartnersManagementComponent} from "./partners-management/partners-management.component";
import {ProjectManagementComponent} from "./project-management/project-management.component";
import {PiecesManagementComponent} from "./pieces-management/pieces-management.component";
import {NonConfirmedPartnersComponent} from "./partners-management/non-confirmed-partners/non-confirmed-partners.component";
import {ModelsManagementComponent} from "./models-management/models-management.component";
import {ListOfPiecesComponent} from "./models-management/list-of-pieces/list-of-pieces.component";
import {AuthGuardService} from "../core/services/guards/auth-guard.service";


const routes: Routes = [
  {
    path: '', component: AdminComponent,canActivateChild: [AuthGuardService],
    data: {
      expectedRole: ['ADMIN']
    },
    children: [
      {
        path: '', redirectTo: 'accueil', pathMatch: 'full'
      },
      {
        path: 'accueil', component: AccueilComponent
      },
      {
        path: 'userManagement', component: UsersManagementComponent
      },
      {
        path: 'categorieManagement', component: CategoriePieceManagementComponent
      },
      {
        path: 'partnerManagement', component: PartnersManagementComponent
      },
      {
        path: 'ProjectManagement', component: ProjectManagementComponent
      },
      {
        path: 'PiecesManagement', component: PiecesManagementComponent
      },
      {
        path: 'ModelesManagement', component: ModelsManagementComponent
      },
      {
        path: 'ListeManagement', component: ListOfPiecesComponent
      },
      {
        path: 'NonConfirmedPartners', component: NonConfirmedPartnersComponent
      },
    ],
  },
  {path: '**', redirectTo: '/accueil'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
