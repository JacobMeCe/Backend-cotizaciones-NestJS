import { Content, ContextPageSize } from "pdfmake/interfaces";

interface HeaderOptions {
    numdepagina?: string;
}

export const footerSection = (
    currentePage: number,
    pageCount: number,
    pageSize: ContextPageSize
): Content => {
    return {
        text: `Página ${currentePage} de ${pageCount}`,
        alignment: 'right',
        margin: [0, 10, 35, 0],
        fontSize: 12,
        bold: true,
    }
}