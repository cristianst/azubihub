import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const generatePDF = ({userName, report}) => {
    // Generate content
    const contentLabel = report.school ? 'Unterichtsthemen' : 'Betriebliche Tätigkeiten';
    const doc = {
        footer: {
            columns: [
              'Left part',
              { text: 'Right part' }
            ]
        },
        content : [
            {
                text: 'Ausbildungsnachweis',
                style: 'header'
            },
            {
                text: `Name: ${userName}`,
                style: 'p'
            },
            {
                text: `Woche vom ${report.startDate} bis ${report.endDate}`,
                style: 'p'
            },
            {
                text: `Ausbildungsjahr: ${report.year}`,
                style: 'p'
            },
            {
                text: `Abteilung: ${report.department}`,
                style: 'p'
            },
            {
                text: contentLabel,
                style: 'contentLabel'
            },
            {
                text: report.content,
                style: 'p'
            }
            
        ],
        styles : {
            header: {
                bold: true,
                margin: [0, 0, 0, 20],
                alignment: 'center',
                fontSize: 20,
                decoration: 'underline'
            },
            p: {
                margin: 10
            },
            contentLabel: {
                margin: [10, 25, 0, 0],
                bold: true,
                decoration: 'underline'
            }
        }
    };
    pdfMake.createPdf(doc).open();
    //console.log(report);
};

export default generatePDF;