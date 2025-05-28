import { MenuItem } from './sidenav.interface';

export const sidenavItems: MenuItem[] = [
  { icon: 'home', label: 'Home', path: '/' },
  {
    icon: 'playlist_add_check_icon',
    label: 'Tickets',
    path: '/ticket',
  },
  {
    icon: 'person',
    label: 'Clientes',
    path: '/client',
  },
  {
    icon: 'person',
    label: 'Técnicos',
    path: '/tech',
  },
];
