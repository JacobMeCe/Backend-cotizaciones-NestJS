import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/common/helpers";

const logo: Content = {
    image: 'src/common/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'left',
    margin: [0, 0, 0, 20],
}

const currentDate: Content = {
    text: DateFormatter.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [20, 40],
    width: 150,
}

interface HeaderOptions {
    title?: string;
    subtitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subtitle, showLogo = true, showDate = true } = options;
    const headerLogo: Content = showLogo ? logo : null;
    const headerDate: Content = showDate ? currentDate : null;
    const headerSubtitle: Content = subtitle ? {
        text: subtitle,
        alignment: 'center',
        margin: [0, 0, 0, 20],
        style: {
            bold: true,
            fontSize: 14,
        },
    } : null;
    const headerTitle: Content = title ? {
        stack: [
            {
                text: title,
                alignment: 'center',
                margin: [0, 20, 0, 0],
                //Top, Right, Bottom, Left
                style: {
                    bold: true,
                    fontSize: 18,

                },
            },
            headerSubtitle
        ],
    } : null;

    return {
        columns: [headerLogo, headerTitle, headerDate],
    }
}