import { iTheme } from '@widgets/interfaces/theme.interface';

// default theme -> index 0
export const THEMES_CONST: iTheme[] = [
  { name: 'Azure Blue', filename: 'azure-blue.css', type: 'light' },
  {
    name: 'Deep Purple',
    filename: 'deeppurple-amber.css',
    type: 'light',
  },
  { name: 'Indigo', filename: 'indigo-pink.css', type: 'light' },
  { name: 'Pink Gray', filename: 'pink-bluegrey.css', type: 'dark' },
  { name: 'Purple Gray', filename: 'purple-green.css', type: 'dark' },
  { name: 'Dark Cyan', filename: 'cyan-orange.css', type: 'dark' },
];
