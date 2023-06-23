import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {AccueilClientComponent} from './accueil-client/accueil-client.component';
import {ProfilClientComponent} from './profil-client/profil-client.component';
import {SharedModule} from '../../shared/shared.module';
import {ClientComponent} from './client.component';
import {HeaderClientComponent} from './header-client/header-client.component';
import {SidebarClientComponent} from './sidebar-client/sidebar-client.component';
import { AjoutProjetClientComponent } from './ajout-projet-client/ajout-projet-client.component';
import { ConsultProjetClientComponent } from './accueil-client/consult-projet-client/consult-projet-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalJwtComponent } from './accueil-client/modal-jwt/modal-jwt.component';
import { PiecesManagmentComponent } from './pieces-managment/pieces-managment.component';

import {RouterModule} from "@angular/router";
import { CourtierOfProjectComponent } from './accueil-client/courtier-of-project/courtier-of-project.component';
import { AfficherDetailsProjetComponent } from './afficher-details-projet/afficher-details-projet.component';
import { AjoutDocumentComponent } from './afficher-details-projet/ajout-document/ajout-document.component';
import { DetailsPieceComponent } from './afficher-details-projet/details-piece/details-piece.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { PiecesInfoComponent } from './pieces-managment/pieces-info/pieces-info.component';
import { SeeAllNotificationsComponent } from './see-all-notifications/see-all-notifications.component';
import { DocumentInfoComponent } from './pieces-managment/document-info/document-info.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ClientComponent,
    AccueilClientComponent,
    ProfilClientComponent,
    HeaderClientComponent,
    SidebarClientComponent,
    AjoutProjetClientComponent,
    ConsultProjetClientComponent,
    ModalJwtComponent,
    PiecesManagmentComponent ,
    CourtierOfProjectComponent,
    AfficherDetailsProjetComponent,
    AjoutDocumentComponent,
    DetailsPieceComponent,
    PiecesInfoComponent,
    SeeAllNotificationsComponent,
    DocumentInfoComponent,

  ],
    imports: [

        CommonModule,
        ClientRoutingModule,
        SharedModule,
        MatDialogModule,
        RouterModule,
      PdfViewerModule,
      NgbModule

    ],
  exports:[AccueilClientComponent]
})
export class ClientModule {
  constructor() {
  }
}
