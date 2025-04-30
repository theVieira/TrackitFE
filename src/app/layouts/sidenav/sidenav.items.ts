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
    path: '/clients',
  },
  {
    icon: 'person',
    label: 'Técnicos',
    path: '/techs',
  },
];
