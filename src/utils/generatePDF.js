import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = ({userName, report}) => {
    // Generate content
    const contentLabel = report.school ? 'Unterichtsthemen:' : 'Betriebliche Tätigkeiten:';
    const parsedContent = report.content.replace(/\n/ig, '\n');
    if(userName === 'Cristian Jazhiel Sanchez' ){
        userName  = 'Cristian Sanchez';
    }
    const doc = {
        footer: {
            columns: [
                { 
                    text: '____________________\nAuszubildender',
                    alignment: 'center',
                    margin: -35
                },
                { 
                    text: '____________________\nAusbilder',
                    alignment: 'center',
                    margin: -35
                },
                { 
                    text: '_______________________\nGesetzlicher Vertreter',
                    alignment: 'center',
                    style: 'footercolumn',
                    margin: -35
                }
            ]
        },
        content: [
            {
                text: 'Generated with azubiHUB - Made by @cristianst',
                style: 'credits'
            },
            {
                text: 'Ausbildungsnachweis',
                style: 'header'
            },
            {
                columns: [
                    {
                        width: 120,
                        text: 'Name:',
                        bold: true
                    },
                    {
                        text: userName
                    }
                ],
                style: 'p'       
            },       
            {
                columns: [
                    {
                        width: 120,
                        text: 'Woche: ',
                        bold: true
                    },
                    {
                        text: `vom ${report.startDate} bis ${report.endDate}`
                    }
                ],
                style: 'p'       
            },        
            {
                columns: [
                    {
                        width: 120,
                        text: 'Ausbildungsjahr: ',
                        bold: true
                    },
                    {
                        text: report.year
                    }
                ],
                style: 'p'       
            },       
            {
                columns: [
                    {
                        width: 120,
                        text: 'Abteilung: ',
                        bold: true
                    },
                    {
                        text: report.department
                    }
                ],
                style: 'p'       
            },      
            {
                text: contentLabel,
                style: 'contentLabel'
            },
            {
                text: parsedContent,
                style: 'p'
            },
            // {
            //     text: 'Credits',
            //     style: 'credits',
            // }
            ],
        styles : {
            header: {
                bold: true,
                margin: [0, 30, 0, 20],
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
            },
            credits: {
                italic: true,
                fontSize: 8,
                alignment: 'center',
                margin: [0, -22, 0, 0]
            }
        }
    }
    
    pdfMake.createPdf(doc).open()

};

export default generatePDF;