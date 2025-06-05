import { MenuItem } from './sidenav.interface';

export const sidenavItems: MenuItem[] = [
  { icon: 'home', label: 'HOME', path: '/' },
  {
    icon: 'playlist_add_check_icon',
    label: 'TICKETS',
    path: '/ticket',
  },
  {
    icon: 'person',
    label: 'CLIENTS',
    path: '/client',
  },
  {
    icon: 'person',
    label: 'TECHS',
    path: '/tech',
  },
];
