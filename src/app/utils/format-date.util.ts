import { format as dateFormat } from 'date-fns';

export class FormatDate {
  format(date: Date) {
    return dateFormat(date, 'dd/MM/yyyy hh:mm');
  }

  formatAtFormat(date: Date, format: string) {
    return dateFormat(date, format);
  }
}
