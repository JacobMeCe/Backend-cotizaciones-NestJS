export class DateFormatter {

    static formatter = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    static getDDMMMMYYYY(date: Date): string {
        return this.formatter.format(date);
    }
}
