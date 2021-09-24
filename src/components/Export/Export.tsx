// @ts-nocheck
import ReactExport from "react-data-export";
import { SymbolDisplayPartKind } from "typescript";
import myProject from "./exampleProject";

const greyBackgroundColor: ReactExport.ExcelStyle = {fill: { patternType: "solid", fgColor: { rgb: "dddddd" }}};

const vertAlignCenter: ReactExport.ExcelStyle = {alignment: { vertical: "center"}};

const projectKeyStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8"
  },
  alignment: {
    horizontal: "right"
  }
}

const projectValueCenterStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10",
    bold: true
  },
  alignment: {
    horizontal: "center"
  }
}

const projectValueStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10",
    bold: true
  },
  alignment: {
    vertical: "left"
  }
}

const projectValueCenterSmallStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8",
    bold: true
  },
  alignment: {
    horizontal: "center"
  }
}

const tableHeaderStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8"
  },
  alignment: {
    horizontal: "left"
  }
}

const borderTopStyle: ReactExport.ExcelStyle = {
  border: {
    top: {
      style: "thin",
      color: { rgb: "000000"}
    }    
  }
}

const tableHeaderCenterStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8"
  },
  alignment: {
    horizontal: "center"
  }
}

const sectionTitleStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10",
    bold: true
  },
  alignment: {
    horizontal: "left"
  }
}

const sectionValuesStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10",
    bold: true
  },
  alignment: {
    horizontal: "center"
  }
}

const sectionProcentStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10",
    bold: true
  },
  alignment: {
    horizontal: "center"
  },
  numFmt: "0.00%;\\(0.00%\\);\\-;@"
}

const taskValuesStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8"
  },
  alignment: {
    horizontal: "center"
  }
}

const taskNameStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8"
  },
  alignment: {
    horizontal: "left"
  }
}

const commentStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8",
    italic: true,
    color: { rgb: "666666" }
  },
  alignment: {
    horizontal: "left"
  }
}

const importantCommentStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8",
    italic: true,
    color: { rgb: "c9211e" }
  },
  alignment: {
    horizontal: "left"
  }
}

const sectionTitleSmallStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "8",
    bold: true
  },
  alignment: {
    horizontal: "left"
  }
}

const totalTitleStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10"
  },
  alignment: {
    horizontal: "right"
  }
}

const totalValuesStyle: ReactExport.ExcelStyle = {
  font: {
    sz: "10"
  },
  alignment: {
    horizontal: "center"
  }
}

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

interface Props {}

export default function Export() {
  
  function createDataSetToExport(project) {
    const exampleProject = project;
    let fullDataArray = [
      [ //1
        // { value: "|", style: {font: {sz:"25", color: { rgb: "FFFFFF" }}} }, // height like font 25
        { value: "SoftwareHut", style: {font: {sz:"25", name:"Montserrat", bold: true, color: { rgb: "4e4e4e" } }} }, // height like font 25
      ],
      [ //2      
        {}   
      ],
      [ //3 
        {},
        {},
        { value: "               Project Workload Estimation", style: { font: { sz: "18", bold: true } } },
      ],
      [ //4
        {}
      ],
      [ //5
        { value: "" },
        { value: "Project name:", style: projectKeyStyle },
        { value: "Test project", style: projectValueStyle },
        { value: "" },
        { value: "Est. Start:", style: projectKeyStyle },
        { value: exampleProject.estStart, style: projectValueCenterStyle },
        { value: "Est. End:", style: projectKeyStyle },
        { value: exampleProject.estEns, style: projectValueCenterStyle },
      ],
      [ //6
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "" },
        { value: "Team size (FTEs):", style: projectKeyStyle },
        { value: exampleProject.teamSize, style: projectValueCenterStyle },
        { value: "Time Budget:", style: projectKeyStyle },
        { value: exampleProject.timeBudget?.toString()+" MD", style: projectValueCenterStyle },
      ],
      [ //7
        { value: ""},
      ],
      [ //8
        { value: "" },
        { value: "Estimated by:", style: projectKeyStyle },
        { value: exampleProject.estimatedBy, style: projectValueStyle },
        { value: "" },
        { value: "Date:", style: projectKeyStyle },
        { value: exampleProject.estimationDate, style: projectValueCenterStyle },
        { value: "Effort:", style: projectKeyStyle },
        { value: exampleProject.effort?.toString()+"h", style: projectValueCenterStyle },
      ],
      [ //9
        { value: "|", style: {font: {sz:"18", color: { rgb: "FFFFFF" }}} }, // height like font 18
        { value: "Verified by:", style: projectKeyStyle},
        { value: exampleProject.verifiedBy, style: projectValueStyle },
        { value: "" },
        { value: "Date:", style: projectKeyStyle },
        { value: exampleProject.verificationDate, style: projectValueCenterStyle },
      ],
      [ //10
        { value: ""},
      ],
      [ //11
        { value: "", style: tableHeaderStyle},
        { value: "Group / Task	", style: tableHeaderStyle},
        { value: "", style: tableHeaderStyle},
        { value: "", style: tableHeaderStyle},
        { value: "Role", style: tableHeaderCenterStyle},
        { value: "Min (MD)", style: tableHeaderCenterStyle},
        { value: "Max (MD)", style: tableHeaderCenterStyle},
        // { value: "Predicted (MD)", style: tableHeaderCenterStyle},
        { value: "Predicted (MD)", style: Object.assign({}, tableHeaderCenterStyle, greyBackgroundColor)},      
        { value: "Risk", style: tableHeaderCenterStyle},
      ],
      [ //12 
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: borderTopStyle},
        { value: "", style: Object.assign({}, borderTopStyle, greyBackgroundColor)}, //H
        { value: "", style: borderTopStyle},

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
    
    // sections
    exampleProject.sections.forEach(function(section) {
      let sectionName = section.name;        
      let sectionSymbol = getSectionSymbol(sectionName);
      let newArray = [];

      // moze zostac zmienione na formuly
      let minMd = section.minMd;
      let maxMd = section.maxMd;
      let predictedMd = section.predictedMd;
      let risk = section.risk/100;
      // let risk = section.risk.toString().replace('.',',');
      
      newArray.push({value:sectionSymbol, style:sectionValuesStyle}); // A
      newArray.push({value:sectionName, style:sectionTitleStyle}); // B
      newArray.push({}); // C
      newArray.push({}); // D
      newArray.push({}); // E
      newArray.push({value:minMd, style:sectionValuesStyle}); // F
      newArray.push({value:maxMd, style:sectionValuesStyle}); // G
      newArray.push({value:predictedMd, style: Object.assign({}, sectionValuesStyle, greyBackgroundColor)}); // H
      newArray.push({value:risk, style:sectionProcentStyle}); // I

      fullDataArray.push(newArray);
      let taskNumber = 0;

      // tasks
      section.tasks.forEach(function(task) {
        let taskName = task.name;
        let newArray = [];
        let taskSymbol = task.role;  
        let minMd = task.minMd;
        let maxMd = task.maxMd;
        let predictedMd = task.predictedMd;
        let risk = task.risk;
        taskNumber++;

        let commentText = task.comment.text;
        let commentIsImportant = task.comment.isImportant;
        
        newArray.push({value: taskNumber, style: taskValuesStyle}); // A
        newArray.push({value: taskName, style: taskNameStyle}); // B
        newArray.push({}); // C
        newArray.push({}); // D
        newArray.push({value: taskSymbol, style: taskValuesStyle}); // E
        newArray.push({value: minMd, style: taskValuesStyle}); // F
        newArray.push({value: maxMd, style: taskValuesStyle}); // G
        newArray.push({value: predictedMd, style: Object.assign({}, taskValuesStyle, greyBackgroundColor)}); // H
        newArray.push({value: risk, style: taskValuesStyle}); // I
    
        fullDataArray.push(newArray);
        
        // add row with comment      
        if (commentText) {
          newArray = [];
          newArray.push({}); // A
          
          commentIsImportant ? newArray.push({value:commentText, style: importantCommentStyle}) : newArray.push({value:commentText, style: commentStyle}); // B
          
          newArray.push({}); //C
          newArray.push({}); //D
          newArray.push({}); //E
          newArray.push({}); //F
          newArray.push({}); //G
          newArray.push({value:"", style: greyBackgroundColor}); //H
          
          fullDataArray.push(newArray);
          newArray = [];
        }

        let subtaskNumber = 0;

        // subtasks
        task.subtasks.forEach(function(subtask) {
          let taskName = '    '+subtask.name;
          let newArray = [];
          let taskSymbol = subtask.role;  
          let minMd = subtask.minMd;
          let maxMd = subtask.maxMd;
          let predictedMd = subtask.predictedMd;
          let risk = subtask.risk;
          subtaskNumber++;

          let nr = taskNumber.toString()+'.'+subtaskNumber.toString();
    
          let commentText = subtask.comment.text;
          let commentIsImportant = subtask.comment.isImportant;

          newArray.push({value: nr, style: taskValuesStyle}); // A
          newArray.push({value: taskName, style: taskNameStyle}); // B
          newArray.push({}); // C
          newArray.push({}); // D
          newArray.push({value: taskSymbol, style: taskValuesStyle}); // E
          newArray.push({value: minMd, style: taskValuesStyle}); // F
          newArray.push({value: maxMd, style: taskValuesStyle}); // G
          newArray.push({value: predictedMd, style: Object.assign({}, taskValuesStyle, greyBackgroundColor)}); // H
          newArray.push({value: risk, style: taskValuesStyle}); // I
      
          fullDataArray.push(newArray);
          
          // add row with comment      
          if (commentText) {
            newArray = [];
            newArray.push({});
            
            commentIsImportant ? newArray.push({value:commentText, style: importantCommentStyle}) : newArray.push({value:commentText, style: commentStyle}); 
            
            newArray.push({}); //C
            newArray.push({}); //D
            newArray.push({}); //E
            newArray.push({}); //F
            newArray.push({}); //G
            newArray.push({value:"", style: greyBackgroundColor}); //H
            
            fullDataArray.push(newArray);
            newArray = [];
          }
          
        });

      });
      
    });

    //row beetween 'tasks' and 'raw development...'
    fullDataArray.push([ 
      { value: "",},
      { value: "",},
      { value: "",},
      { value: "",},
      { value: "",},
      { value: "",},
      { value: "",},
      { value: "", style: greyBackgroundColor},
    ]); // style with border top for A:H colums

    // raw development
    let rdName = exampleProject.rawDevelopmentEffortSum?.name;
    let rdMin = exampleProject.rawDevelopmentEffortSum?.main.minMd;
    let rdMax = exampleProject.rawDevelopmentEffortSum?.main.maxMd;
    let rdPredicted = exampleProject.rawDevelopmentEffortSum?.main.predictedMd;
    let rdRisk = exampleProject.rawDevelopmentEffortSum?.main.risk/100;

    let newArray = [];
    newArray.push({});
    newArray.push({value: rdName, style: sectionTitleStyle});
    newArray.push({});
    newArray.push({});
    newArray.push({});
    newArray.push({value: rdMin, style: sectionValuesStyle});
    newArray.push({value: rdMax, style: sectionValuesStyle});
    newArray.push({value: rdPredicted, style: Object.assign({}, sectionValuesStyle, greyBackgroundColor)});
    newArray.push({value: rdRisk, style: sectionProcentStyle});

    fullDataArray.push(newArray);

    // raw development parts
    exampleProject.rawDevelopmentEffortSum?.parts.forEach(function(part) {
      let rdName = part.name;
      let rdProcent = part.procent;
      let rdRole = part.role;
      let rdMin = part.minMd;
      let rdMax = part.maxMd;
      let rdPredicted = part.predictedMd;

      let newArray = [];
      
      newArray.push({}); // A
      newArray.push({value:rdName, style: sectionTitleSmallStyle}); // B
      newArray.push({}); // C
      newArray.push({value:rdProcent, style: taskValuesStyle}); // D
      newArray.push({value:rdRole, style: taskValuesStyle}); // E
      newArray.push({value:rdMin, style: taskValuesStyle}); // F
      newArray.push({value:rdMax, style: taskValuesStyle}); // G
      newArray.push({value:rdPredicted, style: Object.assign({}, taskValuesStyle, greyBackgroundColor)}); // H

      fullDataArray.push(newArray);    
    });

    // row beetween 'raw dev...' and summary
    fullDataArray.push([ 
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: borderTopStyle},
      { value: "", style: Object.assign({}, borderTopStyle, greyBackgroundColor)},
    ]); // style with border top for A:H colums
    
    
    // summary

    // summary - total
    newArray = [];
    let totalName = exampleProject.summary[0].name;
    let totalMin = exampleProject.summary[0].minMd;
    let totalMax = exampleProject.summary[0].maxMd;
    let totalPredicted = exampleProject.summary[0].predictedMd;
    let totalRisk = exampleProject.summary[0].risk/100;
    newArray.push({}); // A
    newArray.push({}); // B
    newArray.push({}); // C
    newArray.push({}); // D
    newArray.push({value:totalName, style: totalTitleStyle}); // E
    newArray.push({value:totalMin, style: totalValuesStyle}); // F
    newArray.push({value:totalMax, style: totalValuesStyle}); // G
    newArray.push({value:totalPredicted, style: Object.assign({}, sectionValuesStyle, greyBackgroundColor)}); // H
    newArray.push({value:totalRisk, style: sectionProcentStyle}); // I
    fullDataArray.push(newArray);

    // summary - per member
    newArray = [];
    let perMemberName = exampleProject.summary[1].name;
    let perMemberMin = exampleProject.summary[1].minMd;
    let perMemberMax = exampleProject.summary[1].maxMd;
    let perMemberPredicted = exampleProject.summary[1].predictedMd;
    newArray.push({}); // A
    newArray.push({}); // B
    newArray.push({}); // C
    newArray.push({}); // D
    newArray.push({value:perMemberName, style: projectKeyStyle}); // E
    newArray.push({value:perMemberMin, style: taskValuesStyle}); // F
    newArray.push({value:perMemberMax, style: taskValuesStyle}); // G
    newArray.push({value:perMemberPredicted, style: Object.assign({}, taskValuesStyle, greyBackgroundColor)}); // H
    fullDataArray.push(newArray);

    // summary - delivery date
    newArray = [];
    let estDeliveryDateName = exampleProject.summary[2].name;
    let estDeliveryDateDate = exampleProject.summary[2].estDeliveryDate;
    newArray.push({}); // A
    newArray.push({}); // B
    newArray.push({}); // C
    newArray.push({}); // D
    newArray.push({value:estDeliveryDateName, style: projectKeyStyle}); // E
    newArray.push({value:estDeliveryDateDate, style: projectValueCenterSmallStyle}); // F
    fullDataArray.push(newArray);

    // row beetween summary and assumptions
    fullDataArray.push([{}]);
    fullDataArray.push([
      {},
      {value:"Important assumptions:", style: sectionTitleSmallStyle}
      ]);

    // assumptions
    exampleProject.assumptions.forEach(function(item) {
      let id = item.id;
      let text = item.text;

      let newArray = [];    
      newArray.push({value:id, style: projectKeyStyle}); // A
      newArray.push({value:text, style: taskNameStyle}); // B
      fullDataArray.push(newArray);    
    });

    const multiDataSet = [
      {
        columns: [
          //px width
            { title: "", width: { wpx: 30*0.87 } }, // A
            { title: "", width: { wpx: 81*0.87 } }, //B
            { title: "", width: { wpx: 142*0.87 } }, //C
            { title: "", width: { wpx: 35*0.87 } }, //D
            { title: "", width: { wpx: 85*0.87 } }, //E
            { title: "", width: { wpx: 81*0.87 } }, //F
            { title: "", width: { wpx: 81*0.87 } }, //G
            { title: "", width: { wpx: 81*0.87 } }, //H
            { title: "", width: { wpx: 51*0.87 } }, //I
          ],
        data: fullDataArray      
      }
    ];

    return multiDataSet;

  };

  const dataSetToExport = createDataSetToExport(myProject);

  return (
    <div className="App">
      <ExcelFile element={<button>Download Data</button>}>
        <ExcelSheet dataSet={dataSetToExport} name="Organization" />
      </ExcelFile>
    </div>
  );
};
