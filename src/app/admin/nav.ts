import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/accueil/',
    icon: 'icon-speedometer',
  },
  {
    title: true,
    name: 'Menu',
  },
  {
    name: 'Users Management',
    url: ' ',
    icon: 'icon-people',


    children:
      [
        {
          name: 'List of Users',
          url: '/admin/userManagement/',
          icon: 'icon-people'
        }
    ]
  },
  {
    name: 'Categorie Piece',
    icon: 'icon-list',
    url: ' ',
    children:
      [
        {
          name: 'List of Categories',
          url: '/admin/categorieManagement',
          icon: 'icon-list'
        }
      ]
  },
  {
    name: 'Partners Management',
    icon: 'icon-briefcase',
    url: ' ',

    children:
      [
        {
          name: 'List of Partners',
          url: '/admin/partnerManagement',
          icon: 'icon-briefcase'
        },
        {
          name: 'Non Confirmed Partners',
          url: '/admin/NonConfirmedPartners',
          icon: 'icon-briefcase'
        }
      ]
  },
  {
    name: 'Projects Management',
    icon: 'icon-docs',
    url: ' ',

    children:
      [
        {
          name: 'List of Projects',
          url: '/admin/ProjectManagement',
          icon: 'icon-docs'
        }
      ]
  },
  {
    name: 'Models Management',
    icon: 'icon-layers',
    url: ' ',

    children:
      [
        {
          name: 'Models',
          url: '/admin/ModelesManagement',
          icon: 'icon-layers'
        },
        {
          name: 'List of Models',
          url: '/admin/ListeManagement',
          icon: 'icon-layers'
        }

      ]
  },

];
