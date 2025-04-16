import { MenuItem } from './sidenav.component';

export const sidenavItems: MenuItem[] = [
  { icon: 'home', label: 'Home', path: '/' },
  {
    icon: 'playlist_add_check_icon',
    label: 'Tickets',
    path: '/tickets',
  },
  {
    icon: 'person',
    label: 'Clientes',
    children: [
      {
        label: 'Lista',
        icon: 'sort',
        path: '/clients',
      },
      {
        label: 'Novo cliente',
        icon: 'add_circle',
        path: '/create-new-client',
      },
    ],
  },
  {
    icon: 'person',
    label: 'Técnicos',
    children: [
      {
        label: 'Listar',
        icon: 'sort',
        path: '/techs',
      },
      {
        label: 'Novo técnico',
        icon: 'add_circle',
        path: '/create-new-tech',
      },
    ],
  },
];
