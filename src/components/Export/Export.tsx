// @ts-nocheck
import ReactExport from "react-data-export";
import { useAppSelector } from "../../store/hooks";
import initialProject from "../../store/initials/initialProject";
import exampleProject from "./exampleProject";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface Props {}

// const multiDataSet = [
//   {
//     columns: [
//       { title: "Headings", width: { wpx: 80 } }, //pixels width
//       { title: "Text Style", width: { wch: 40 } }, //char width
//       { title: "Colors", width: { wpx: 90 } },
//     ],
//     data: [
//       [
//         { value: "H1", style: { font: { sz: "24", bold: true } } },
//         { value: "Bold", style: { font: { bold: true } } },
//         {
//           value: "Red",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
//           },
//         },
//       ],
//       [
//         { value: "H2", style: { font: { sz: "18", bold: true } } },
//         { value: "underline", style: { font: { underline: true } } },
//         {
//           value: "Blue",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } },
//           },
//         },
//       ],
//       [
//         { value: "H3", style: { font: { sz: "14", bold: true } } },
//         { value: "italic", style: { font: { italic: true } } },
//         {
//           value: "Green",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } },
//           },
//         },
//       ],
//       [
//         { value: "H4", style: { font: { sz: "12", bold: true } } },
//         { value: "strike", style: { font: { strike: true } } },
//         {
//           value: "Orange",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } },
//           },
//         },
//       ],
//       [
//         { value: "H5", style: { font: { sz: "10.5", bold: true } } },
//         { value: "outline", style: { font: { outline: true } } },
//         {
//           value: "Yellow",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FF000000" } },
//           },
//         },
//       ],
//       [
//         { value: "H6", style: { font: { sz: "7.5", bold: true } } },
//         { value: "shadow", style: { font: { shadow: true } } },
//         {
//           value: "Light Blue",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } },
//           },
//         },
//       ],
//     ],
//   },
// ];


// const multiDataSet2 = [
//   {
//     columns: [
//       { title: "A", width: { wpx: 30 } },
//       { title: "B", width: { wpx: 81 } },
//       { title: "C", width: { wpx: 142 } },
//       { title: "D", width: { wpx: 35 } },
//       { title: "E", width: { wpx: 85 } },
//       { title: "F", width: { wpx: 81 } },
//       { title: "G", width: { wpx: 81 } },
//       { title: "H", width: { wpx: 81 } },
//       { title: "I", width: { wpx: 51 } },
//     ],
//     data: [
//       [        
//         { value: initialProject.sections[3].name, style: { font: { sz: "24", bold: true} } },
//         { value: "Bold", style: { font: { bold: true } } },
//         {
//           value: "Red",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
//           },
//         },
//       ],
//       [
//         { value: "H1", style: { font: { sz: "24", bold: true} } },
//         { value: "Bold", style: { font: { bold: true } } },
//         {
//           value: "Red",
//           style: {
//             fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } },
//           },
//         },

//       ],
//     ],
//   },
// ];

// const myData = [ 
//   {last_name: "somebody last name", name: "somebody name"},
//   {last_name: "somebody last name", name: "somebody name"},
// ]


// const Export = (props: Props) => {

//   // const project: Project = useAppSelector((state) =>
// 	// 	state.projects.projects.find((project: Project) => project.projectId === projectId)
// 	// );
//   console.log(initialProject.sections[2])
//   return (
//     <>
//     <div>
//     <ExcelFile element={<button>Export</button>}>
//         <ExcelSheet dataSet={multiDataSet} name="Organization" />
//       </ExcelFile>

//       <p>{multiDataSet[0].columns[0].title}</p>
//     </div>
    
      
//     </>
//   );
// };




export default function Export() {

  let fullDataArray = [
    [ //2
      { value: "" },
    ],
    [ //3 zmergowane cells wszystkie w tym rzedzie
      { value: "Project Workload Estimation", style: { font: { sz: "14", bold: true } } },
    ],
    [ //4
      { value: ""},
    ],
    [ //5
      { value: "" },
      { value: "Project name:" },
      { value: "Test project" },
      { value: "" },
      { value: "Est. Start:" },
      { value: "1.01.2021" },
      { value: "Est. End:" },
      { value: "1.03.2021" },
    ],
    [ //6
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "" },
      { value: "Team size (FTEs):" },
      { value: "4" },
      { value: "Time Budget:" },
      { value: "160 MD" },
    ],
    [ //7
      { value: ""},
    ],
    [ //8
      { value: "" },
      { value: "Estimated by:" },
      { value: "Hortensjo Pisuarez" },
      { value: "" },
      { value: "Date:" },
      { value: "30.11.2020" },
      { value: "Effort:" },
      { value: "12h" },
    ],
    [ //9
      { value: "" },
      { value: "Verified by:" },
      { value: "Wieńczysław Należyty" },
      { value: "" },
      { value: "Date:" },
      { value: "" },
    ],
    [ //10
      { value: ""},
    ],
    [ //11
      { value: ""},
      { value: "Group / Task	"},
      { value: ""},
      { value: ""},
      { value: "Role"},
      { value: "Min (MD)"},
      { value: "Max (MD)"},
      { value: "Predicted (MD)"},
      { value: "Risk"},
    ],
    [ //12 
      { value: ""},

      // formula test
      // { value: "12"},
      // { value: "13"},
      // { value: "=B12+C12"},
    ]
  ];

  function getSectionSymbol(sectionName: string) {
    switch (sectionName) {
      case "Frontend development":
        return "F";
      case "Backend development":
        return "B";  
      case "Mobile development":
        return "M";  
      case "Design / UX / UI":
        return "U";  
      case "Configuration / Setup / Deployment":
        return "C";  
      default:
        return "";
    }
  }

  function changeDotIntoComma(changingNumber) {
    const stringNumber = changingNumber.toString();
    const stringNumberWithComma = stringNumber.replace(".", ",");
    // stringNumberWithComma.concat('\\'); // add new line
    return stringNumberWithComma;
  }

  // sections
  exampleProject.sections.forEach(function(section) {
    let sectionName = section.name;
    let emptyCell = {value: ""};
    let newArray = [];
    let sectionSymbol = getSectionSymbol(sectionName);

    // moze zostac zmienione na formuly
    let minMd = changeDotIntoComma(section.minMd);
    let maxMd = changeDotIntoComma(section.maxMd);
    let predictedMd = changeDotIntoComma(section.predictedMd);
    let risk = changeDotIntoComma(section.risk);
    
    newArray.push({value:sectionSymbol}); // A
    newArray.push({value:sectionName}); // B
    newArray.push(emptyCell); // C
    newArray.push(emptyCell); // D
    newArray.push(emptyCell); // E
    newArray.push({value:minMd}); // F
    newArray.push({value:maxMd}); // G
    newArray.push({value:predictedMd}); // H
    newArray.push({value:risk}); // I

    fullDataArray.push(newArray);

    // tasks
    section.tasks.forEach(function(task) {
      let taskName = task.name;
      newArray = [];
      let taskSymbol = task.role;  
      let minMd = changeDotIntoComma(task.minMd);
      let maxMd = changeDotIntoComma(task.maxMd);
      let predictedMd = changeDotIntoComma(task.predictedMd);
      let risk = task.risk;

      let commentText = task.comment.text;
      let commentIsImportant = task.comment.isImportant;
      
      newArray.push({value:"nr"}); // A
      newArray.push({value:taskName}); // B
      newArray.push(emptyCell); // C
      newArray.push(emptyCell); // D
      newArray.push({value:taskSymbol}); // E
      newArray.push({value:minMd}); // F
      newArray.push({value:maxMd}); // G
      newArray.push({value:predictedMd}); // H
      newArray.push({value:risk}); // I
  
      fullDataArray.push(newArray);
      
      // add row with comment      
      if (commentText) {
        newArray = [];
        newArray.push(emptyCell);
        newArray.push({value:commentText}); //style isImportant
        fullDataArray.push(newArray);
      }

      // subtasks
      task.subtasks.forEach(function(subtask) {
        let taskName = subtask.name;
        newArray = [];
        let taskSymbol = subtask.role;  
        let minMd = changeDotIntoComma(subtask.minMd);
        let maxMd = changeDotIntoComma(subtask.maxMd);
        let predictedMd = changeDotIntoComma(subtask.predictedMd);
        let risk = subtask.risk;
  
        let commentText = subtask.comment.text;
        let commentIsImportant = subtask.comment.isImportant;
        
        newArray.push({value:"nr"}); // A
        newArray.push({value:taskName}); // B
        newArray.push(emptyCell); // C
        newArray.push(emptyCell); // D
        newArray.push({value:taskSymbol}); // E
        newArray.push({value:minMd}); // F
        newArray.push({value:maxMd}); // G
        newArray.push({value:predictedMd}); // H
        newArray.push({value:risk}); // I
    
        fullDataArray.push(newArray);
        
        // add row with comment      
        if (commentText) {
          newArray = [];
          newArray.push(emptyCell);
          newArray.push({value:commentText}); //style isImportant
          fullDataArray.push(newArray);
        }
        
      });

    });
    
  });


  const multiDataSet = [
    {
      columns: [
          { title: "Logo software hut", width: { wpx: 30 } }, // A
          { title: "", width: { wpx: 81 } }, //B
          { title: "", width: { wpx: 142 } }, //C
          { title: "", width: { wpx: 35 } }, //D
          { title: "", width: { wpx: 85 } }, //E
          { title: "", width: { wpx: 81 } }, //F
          { title: "", width: { wpx: 81 } }, //G
          { title: "", width: { wpx: 81 } }, //H
          { title: "", width: { wpx: 51 } }, //I
        ],
      data: fullDataArray      
    }
  ];

  const wowstring = fullDataArray.toString();

  return (
    <div className="App">
      <ExcelFile element={<button>Download Data With Styles</button>}>
        <ExcelSheet dataSet={multiDataSet} name="Organization" />
      </ExcelFile>
      <p>
{wowstring}
      </p>
    </div>
  );
};
