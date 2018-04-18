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
        content: [
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
                text: report.content,
                style: 'p'
            } ],
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
// playground requires you to assign document definition to a variable called dd

var dd = {
    content : [
        {
            text: 'Ausbildungsnachweis',
            style: 'header'
        },
        
            {
                columns: [
                    'texz', 
                    'text',
                ],
                
                style: 'left'
                    
            },
        
        {
            text: 'Woche vom A bis B',
            style: 'p'
        },
        {
            text: 'Ausbildungsjahr: 1',
            style: 'p'
        },
        {
            text: 'Abteilung: Software Enticklung',
            style: 'p'
        }
        
    ],
    styles : {
        header: {
            bold: true,
            alignment: 'center',
            fontSize: 17
        },
        p: {
            margin: 5
        },
        left: {
            margin: 5,
            alignment: 'left'
        }
    }
};

export default generatePDF;