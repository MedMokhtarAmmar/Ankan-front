import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CourtierRoutingModule} from './courtier-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {AccueilComponent} from "./accueil/accueil.component";
import {ProfilComponent} from "./profil/profil.component";
import {RouterModule} from "@angular/router";
import {CourtierComponent} from "./courtier.component";
import {SidebarCourtierComponent} from './sidebar-courtier/sidebar-courtier.component';
import {HeaderCourtierComponent} from './header-courtier/header-courtier.component';
import {ProjetCourtierComponent} from './projet-courtier/projet-courtier.component';
import {AjoutProjetCourtierComponent} from './ajout-projet-courtier/ajout-projet-courtier.component';
import {ConsultProjetCourtierComponent} from './accueil/consult-projet-courtier/consult-projet-courtier.component';
import { ClientOfProjectComponent } from './accueil/client-of-project/client-of-project.component';
import { MatDialogModule} from "@angular/material/dialog";
import { PiecesManagmentComponent } from './pieces-managment/pieces-managment.component';
import { CreatePieceComponent } from './pieces-managment/create-piece/create-piece.component';
import { ProjetComponent } from './pieces-managment/tableau/projet/projet.component';
import { CategorieComponent } from './pieces-managment/tableau/categorie/categorie.component';
import { UpdatePieceComponent } from './pieces-managment/update-piece/update-piece.component';
import { AfficherDetailsProjetCourtierComponent } from './afficher-details-projet-courtier/afficher-details-projet-courtier.component';
import { AjoutPieceModalComponent } from './afficher-details-projet-courtier/ajout-piece-modal/ajout-piece-modal.component';
import { PieceInfoCourtierComponent } from './pieces-managment/piece-info-courtier/piece-info-courtier.component';
import { DetailsPieceCourtierComponent } from './afficher-details-projet-courtier/details-piece-courtier/details-piece-courtier.component';
import {ConfirmerValidationModalComponent} from "./pieces-managment/confirmer-validation-modal/confirmer-validation-modal.component";
import { PartnerListComponent } from './partner-list/partner-list.component';
import { PartnerDetailsComponent } from './partner-list/partner-details/partner-details.component';
import { SeeAllNotificationCourtierComponent } from './see-all-notification-courtier/see-all-notification-courtier.component';
import { PartnerAddComponent } from './partner-list/partner-add/partner-add.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DocumentInfoCourtierComponent} from "./pieces-managment/document-info/document-info.component";
import { ListPieceManagementComponent } from './list-piece-management/list-piece-management.component';
import { AjouterListeComponent } from './list-piece-management/ajouter-liste/ajouter-liste.component';
import {MultiSelectAllModule} from "@syncfusion/ej2-angular-dropdowns";
import { ModifierListPieceComponent } from './list-piece-management/modifier-list-piece/modifier-list-piece.component';
import {FormsModule} from "@angular/forms";
import { AjouterPersonnePhysiqueComponent } from './afficher-details-projet-courtier/ajouter-personne-physique/ajouter-personne-physique.component';
import { SupprimerClientModalComponent } from './afficher-details-projet-courtier/supprimer-client-modal/supprimer-client-modal.component';



@NgModule({
  declarations: [
    ProfilComponent,
    AccueilComponent,
    CourtierComponent,
    SidebarCourtierComponent,
    HeaderCourtierComponent,
    ProjetCourtierComponent,
    AjoutProjetCourtierComponent,
    ConsultProjetCourtierComponent,
    ClientOfProjectComponent,
    PiecesManagmentComponent,
    CreatePieceComponent,
    ProjetComponent,
    CategorieComponent,
    UpdatePieceComponent,
    AfficherDetailsProjetCourtierComponent,
    AjoutPieceModalComponent,
    PieceInfoCourtierComponent,
    DetailsPieceCourtierComponent,
    ConfirmerValidationModalComponent,
    PartnerListComponent,
    PartnerDetailsComponent,
    SeeAllNotificationCourtierComponent,
    PartnerAddComponent,
    DocumentInfoCourtierComponent,
    ListPieceManagementComponent,
    AjouterListeComponent,
    ModifierListPieceComponent,
    AjouterPersonnePhysiqueComponent,
    SupprimerClientModalComponent




  ],
  exports: [
    AccueilComponent
  ],
  imports: [
    MultiSelectAllModule,
    CommonModule,
    CourtierRoutingModule,
    SharedModule,
    RouterModule,
    MatDialogModule,
    PdfViewerModule,
    NgbModule,
    FormsModule


    ]
})
export class CourtierModule {
}
