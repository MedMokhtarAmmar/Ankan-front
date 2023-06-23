import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientComponent} from "./client.component";
import {AuthGuardService} from "../../core/services/guards/auth-guard.service";
import {AccueilClientComponent} from "./accueil-client/accueil-client.component";
import {ProfilClientComponent} from "./profil-client/profil-client.component";
import {AjoutProjetClientComponent} from "./ajout-projet-client/ajout-projet-client.component";
import {PiecesManagmentComponent} from "./pieces-managment/pieces-managment.component";
import {AfficherDetailsProjetComponent} from "./afficher-details-projet/afficher-details-projet.component";
import {PiecesInfoComponent} from "./pieces-managment/pieces-info/pieces-info.component";
import {SeeAllNotificationsComponent} from "./see-all-notifications/see-all-notifications.component";
import {DocumentInfoComponent} from "./pieces-managment/document-info/document-info.component";


export const routes: Routes = [
    {
      path: '', component: ClientComponent, canLoad: [AuthGuardService],
      data: {
        expectedRole: ['CLIENT','COURTIER','ADMIN']
      },
      children: [
        {
          path: '', redirectTo: '/accueil', pathMatch: 'full'
        },
        {
          path: 'accueil', component: AccueilClientComponent
        },
        {
          path: 'pieces', component: PiecesManagmentComponent
        }
        ,
        {
          path: 'project-info/:id', component: AfficherDetailsProjetComponent

        }
        ,
        {
          path: 'piece-info/:id', component: PiecesInfoComponent

        }  ,
        {
          path: 'see-all', component: SeeAllNotificationsComponent

        },
        {
          path: 'document-info/:id', component: DocumentInfoComponent

        }
      ]
    },

    {
      path: 'profil', component: ProfilClientComponent, canActivate: [AuthGuardService], data: {
        expectedRole: 'CLIENT'
      },

    },
    {
      path: 'creer-projet', component: AjoutProjetClientComponent, canActivate: [AuthGuardService], data: {
        expectedRole: 'CLIENT'
      },

    },
     {path: '**', redirectTo: '/accueil'}

  ]
;


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
