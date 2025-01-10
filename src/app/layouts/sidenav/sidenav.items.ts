import { MenuItem } from './sidenav.component';

export const sidenavItems: MenuItem[] = [
  { icon: 'home', label: 'Home', path: '/' },
  {
    icon: 'playlist_add_check_icon',
    label: 'Tickets',
    children: [
      { icon: 'sort', label: 'Lista', path: '/tickets' },
      {
        icon: 'add_circle',
        label: 'Novo ticket',
        path: '/create-new-ticket',
      },
    ],
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
];
