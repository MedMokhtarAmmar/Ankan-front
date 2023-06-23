import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {CourtierComponent} from './courtier.component';
import {AuthGuardService} from '../../core/services/guards/auth-guard.service';
import {AjoutProjetCourtierComponent} from './ajout-projet-courtier/ajout-projet-courtier.component';
import {PiecesManagmentComponent} from './pieces-managment/pieces-managment.component';
import {CreatePieceComponent} from './pieces-managment/create-piece/create-piece.component';
import {AfficherDetailsProjetCourtierComponent} from "./afficher-details-projet-courtier/afficher-details-projet-courtier.component";
import {PieceInfoCourtierComponent} from "./pieces-managment/piece-info-courtier/piece-info-courtier.component";
import {PartnerListComponent} from "./partner-list/partner-list.component";
import {SeeAllNotificationCourtierComponent} from "./see-all-notification-courtier/see-all-notification-courtier.component";
import {PartnerAddComponent} from "./partner-list/partner-add/partner-add.component";
import {ProfilClientComponent} from "../client/profil-client/profil-client.component";
import {ProfilComponent} from "./profil/profil.component";
import {ListPieceManagementComponent} from "./list-piece-management/list-piece-management.component";
import {AjouterListeComponent} from "./list-piece-management/ajouter-liste/ajouter-liste.component";
import {ModifierListPieceComponent} from "./list-piece-management/modifier-list-piece/modifier-list-piece.component";
import {AjouterPersonnePhysiqueComponent} from "./afficher-details-projet-courtier/ajouter-personne-physique/ajouter-personne-physique.component";


const routes: Routes = [
  {
    path: '', component: CourtierComponent, canActivateChild: [AuthGuardService],
    data: {
      expectedRole: ['ADMIN','COURTIER']
    },
    children: [
      {
        path: '', redirectTo: '/accueil', pathMatch: 'full'
      },
      {
        path: 'accueil', component: AccueilComponent
      },
      {
        path: 'pieces', component: PiecesManagmentComponent
      },

      {
        path: 'partners-list', component: PartnerListComponent
      },

      {
        path: 'createPiece', component: CreatePieceComponent
      }
      ,
      {
        path: 'project-info/:id', component: AfficherDetailsProjetCourtierComponent

      }

      ,
      {
        path: 'piece-info/:id', component: PieceInfoCourtierComponent

      },
      {
        path: 'see-all', component: SeeAllNotificationCourtierComponent

      },
      {
        path: 'partner-add', component: PartnerAddComponent

      },
      {
        path: 'listpieces', component: ListPieceManagementComponent
      },
      {
        path: 'createList', component: AjouterListeComponent
      },
      {
        path: 'list-piece-info/:id', component: ModifierListPieceComponent

      },

      {
        path: 'ajout-personne-physique/:id', component: AjouterPersonnePhysiqueComponent

      }

    ]
  },
  {
    path: 'profil', component: ProfilComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'COURTIER'
    }},
  {
    path: 'creer-projet', component: AjoutProjetCourtierComponent, canActivate: [AuthGuardService], data: {
      expectedRole: 'COURTIER'
    },


  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourtierRoutingModule {
}
