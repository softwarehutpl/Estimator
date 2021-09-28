// @ts-nocheck
import ReactExport from "react-data-export";
import { SymbolDisplayPartKind } from "typescript";
import myProject from "./exampleProject";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProjectSelector } from "../../store/selectors/selectors";
import * as XLSX from "xlsx";
import { resolveCname } from "dns";
import { error } from "console";
import { v4 as uuidv4 } from "uuid";

import initialProject from "../../store/initials/initialProject";
import { addTask, addSubtask } from "../../store/reducers/projectReducer";
import { taskPropsContstants } from "../../store/actions/updateTask";
import { Type, Role } from "../../types/Interface";
import createTask from "../../store/actions/createTask";
import projectReducer from "../../store/reducers/projectReducer";


// const Export: FC<Props> = ({ projectId, project }) => {

//   const projectToExport = useAppSelector(
//     getProjectSelector("75fc9f66-d4f6-4304-b98c-46841b301d44")
//   ); //=> PUSH PROJECT ID!

//   console.log(projectToExport);

//   return (
//     <div className="App">
      
//     </div>
//   );
// };

function Import() {

  const dispatch = useAppDispatch();

  function getSectionName(sectionId){
    switch (sectionId) {
      case Role.FD:
        return "Frontend development";
      case Role.BD:
        return "Backend development";  
      case Role.MD:
        return "Mobile development";  
      case Role.UD:
        return "Design / UX / UI";  
      case Role.DO:
        return "Configuration / Setup / Deployment";  
      default:
        return "";
    }
  }

  function convertJsonToProjectStructure(data){
    let newProject = Object.assign({}, initialProject);
    
    newProject.projectName = data[2]._2;
    newProject.projectId = uuidv4();
    newProject.estimatedBy = data[5]._2;
    newProject.estimationDate = data[5]._5;
    newProject.verifiedBy = data[6]._2;
    newProject.verificationDate = data[6]._5;
    newProject.estStart = data[2]._5;
    newProject.estEns = data[2]._7;
    newProject.teamSize = data[3]._5;
    newProject.timeBudget = parseInt((data[3]._7).substring(0, (data[3]._7).length - 3)); //"160 MD" => 160
    newProject.effort= parseInt((data[5]._7).substring(0, (data[5]._7).length - 1)); //"12h" => 12

    let i;
    for(i = 10; i < data.length; i++) {

      if(data[i]._1 === "") break; // pusta linijka po taskach

      let risk = data[i]._8; // risk - sekcja: number, task: string
      
      if(typeof(risk) == 'number') { //if risk: number => section
        let name = data[i]._1; // nazwa sekcji
        let section = newProject.sections.find(section => section.name === name);
        section.maxMd = data[i]._6;
        section.minMd = data[i]._5;
        section.predictedMd = data[i]._7;
        section.risk = risk*100; // 0.2162 
      }
      else{ // risk: string => task/group/subtask

        if(risk === "" || risk == undefined) { // risk === "" => add group
          let name = data[i]._1; // nazwa taska
          let groupTask = createTask(getSectionName(data[i]._4), name, Type.Group);
          newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.push(groupTask);
        }
       
        else {  // risk !== "" => add task/subtask

          let name = data[i]._1; // nazwa taska
          if (name.slice(0,4) !== "    ") { // name != "    ...." => task             
            let newTask = createTask(getSectionName(data[i]._4), name, Type.Task);
            newTask.minMd = data[i]._5;
            newTask.maxMd = data[i]._6;
            newTask.predictedMd = data[i]._7;
            newTask.risk = data[i]._8;
            newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.push(newTask);
            
          }

          if (name.slice(0,4) === "    ") { // name = "    ...." => subtask
            let j = i;
            let subtasks = [];
            while(data[j]._1.slice(0,4) === "    ")
            {
              let newSubtask = createTask(getSectionName(data[j]._4), data[j]._1.trim(), Type.Task);
              newSubtask.minMd = data[j]._5;
              newSubtask.maxMd = data[j]._6;
              newSubtask.predictedMd = data[j]._7;
              newSubtask.risk = data[j]._8;

              // creating subtasks list
              subtasks.push(newSubtask);  
              j++;
            }
            i = j;
            let lastGroupTask = (newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.at(-1));
            let taskId = lastGroupTask.id;
            let group = newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.find(task => task.id === taskId);
            // adding subtasks to group
            group.subtasks = subtasks;
            subtasks = [];
            --i;
          }
        }
      }   
    }
    
    i++; // wskazuje na index "raw development..."" 

    newProject.rawDevelopmentEffortSum.name = data[i]._1;
    newProject.rawDevelopmentEffortSum.main.minMd = data[i]._5;
    newProject.rawDevelopmentEffortSum.main.maxMd = data[i]._6;
    newProject.rawDevelopmentEffortSum.main.predictedMd = data[i]._7;
    newProject.rawDevelopmentEffortSum.main.risk = data[i]._8*100;

    i++; // wskazuje na index "raw development... . parts"
    let partsIndex = 0;
    for(i; i < data.length; i++) {

      if(data[i]._1 === "") break; // pusta linijka po "raw development... . parts"

      newProject.rawDevelopmentEffortSum.parts[partsIndex].name = data[i]._1;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].procent = data[i]._3;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].role = data[i]._4;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].minMd = data[i]._5;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].maxMd = data[i]._6;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].predictedMd = data[i]._7;

      partsIndex++;
    }
    
    i++; // i wskazuje na index Total(MD)
    newProject.summary[0].minMd = data[i]._5; // Total(MD) min
    newProject.summary[0].maxMd = data[i]._6; // Total(MD) max
    newProject.summary[0].predictedMd = data[i]._7; // Total(MD) predicted
    newProject.summary[0].risk = data[i]._8*100; // Total(MD) risk

    i++; // i wskazuje na index Per Team Member
    newProject.summary[1].minMd = data[i]._5; // Per Team Member min
    newProject.summary[1].maxMd = data[i]._6; // Per Team Member max
    newProject.summary[1].predictedMd = data[i]._7; // Per Team Member predicted

    i++; // i wskazuje na index Est. Delivery Date:
    newProject.summary[2].estDeliveryDate = data[i]._5; // estDeliveryDate

    if(i !== data.length-2){
      i = i+2;
      let assumptionIndex = 1;
      for(i; i<= data.length-1; i++){
        // adding important assumptions
        newProject.assumptions.push({id:assumptionIndex, text:data[i]._1});
        assumptionIndex++;
      }
    }

    
    
    console.log("data:");
    console.log(data);
    console.log("new project:");
    console.log(newProject);
  };

  const readExcel=(file)=>{

    const promise = new Promise((resolve, reject)=>{
      
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload=(e)=>{
        const bufferArray=e.target.result;

        const wb = XLSX.read(bufferArray,{type:'buffer'});

        const wsname=wb.SheetNames[0];

        const ws=wb.Sheets[wsname];

        const data = (XLSX.utils.sheet_to_json(ws));

        resolve(data);
      };

      fileReader.onerror = (error)=>{
        reject(error);
      };
    });

    promise.then((d)=>{
      convertJsonToProjectStructure(d);
    })

  };


  return (
    <div>
      <p>import</p>
      <input type="file" onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }
      } />
    </div>
  );
};

export default Import;

