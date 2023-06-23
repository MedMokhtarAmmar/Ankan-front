import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { UsersManagementComponent } from './users-management/users-management.component';

import { AjoutUtilisateurComponent } from './users-management/ajout-utilisateur/ajout-utilisateur.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ModifierUtilisateurComponent} from './users-management/modifier-utilisateur/modifier-utilisateur.component';
import { ConfirmationComponenetComponent } from './users-management/confirmation-componenet/confirmation-componenet.component';

import {PaginationModule} from 'ngx-bootstrap/pagination';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from "@coreui/angular";
import {TabsModule} from "ngx-bootstrap/tabs";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ChartsModule} from "ng2-charts";
import { CategoriePieceManagementComponent } from './categorie-piece-management/categorie-piece-management.component';
import { AjoutCategorieComponent } from './categorie-piece-management/ajout-categorie/ajout-categorie.component';
import { ModifierCategorieComponent } from './categorie-piece-management/modifier-categorie/modifier-categorie.component';
import { PartnersManagementComponent } from './partners-management/partners-management.component';
import { DetailsPartenaireComponent } from './partners-management/details-partenaire/details-partenaire.component';
import { AjoutPartenaireComponent } from './partners-management/ajout-partenaire/ajout-partenaire.component';
import {ProjectManagementComponent} from "./project-management/project-management.component";
import {AjoutNomCourtierComponent} from "./project-management/ajout-nom-courtier/ajout-nom-courtier.component";
import {AjoutNomUserComponent} from "./project-management/ajout-nom-user/ajout-nom-user.component";
import {CategorieLibelleComponent} from "./project-management/categorie-libelle/categorie-libelle.component";
import {PiecesnumberComponent} from "./project-management/piecesnumber/piecesnumber.component";
import { RequiredPiecesComponent } from './project-management/required-pieces/required-pieces.component';
import {PiecesManagementComponent} from "./pieces-management/pieces-management.component";
import { NonConfirmedPartnersComponent } from './partners-management/non-confirmed-partners/non-confirmed-partners.component';
import { ConfirmationComponentComponent } from './partners-management/non-confirmed-partners/confirmation-component/confirmation-component.component';
import { ModelsManagementComponent } from './models-management/models-management.component';
import {AjoutModeleComponent} from "./models-management/ajout-modele/ajout-modele.component";
import { ListOfPiecesComponent } from './models-management/list-of-pieces/list-of-pieces.component';
import { AjoutListeDesPiecesComponent } from './models-management/ajout-liste-des-pieces/ajout-liste-des-pieces.component';
import {MultiSelectAllModule} from "@syncfusion/ej2-angular-dropdowns";
import { ModifierPartnerComponent } from './partners-management/modifier-partner/modifier-partner.component';
import { ModifierListComponent } from './models-management/modifier-list/modifier-list.component';




@NgModule({
  declarations: [AdminComponent,
    HeaderComponent,
    SidebarComponent,
    AccueilComponent,
    FooterComponent,
    UsersManagementComponent,
    AjoutUtilisateurComponent,
    ModifierUtilisateurComponent,
    ConfirmationComponenetComponent,
    CategoriePieceManagementComponent,
    AjoutCategorieComponent,
    ModifierCategorieComponent,
    PartnersManagementComponent,
    DetailsPartenaireComponent,
    AjoutPartenaireComponent,
    ProjectManagementComponent,
    AjoutNomCourtierComponent,
    AjoutNomUserComponent,
    CategorieLibelleComponent,
    PiecesnumberComponent,
    RequiredPiecesComponent,
    PiecesManagementComponent,
    NonConfirmedPartnersComponent,
    ConfirmationComponentComponent,
    ModelsManagementComponent,
    AjoutModeleComponent,
    ListOfPiecesComponent,
    AjoutListeDesPiecesComponent,
    ModifierPartnerComponent,
    ModifierListComponent,
  ],

  imports: [
    MultiSelectAllModule,
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    AdminRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    PaginationModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class AdminModule { }
