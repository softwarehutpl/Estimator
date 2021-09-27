// @ts-nocheck
import ReactExport from "react-data-export";
import { SymbolDisplayPartKind } from "typescript";
import myProject from "./exampleProject";
import { useAppSelector } from "../../store/hooks";
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
    for(i = 10; i < data.length; i++){

      if(data[i]._1 === "") break; // pusta linijka po taskach

      let name = data[i]._1; // nazwa sekcji/taska
      let risk = data[i]._8; // risk - sekcja: number, task: string
      
      if(typeof(risk) == 'number') { //if risk: number => section
        let section = newProject.sections.find(section => section.name === name);
        section.maxMd = data[i]._6;
        section.minMd = data[i]._5;
        section.predictedMd = data[i]._7;
        section.risk = risk*100; // 0.2162 
      }
      else{ // risk: string => task/group/subtask
        
        if(risk === "") { // risk === "" => add group
          let groupTask = createTask(getSectionName(data[i]._4), name, Type.Group);
          newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.push(groupTask);
        }
       
        else {  // risk !== "" => add task/subtask
          if (name.slice(0,4) !== "    ") { // name != "    ...." => task 
            
            let newTask = createTask(getSectionName(data[i]._4), name, Type.Task);
            newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.push(newTask);
          }
          if (name.slice(0,4) === "    ") { // name = "    ...." => subtask 
            console.log("subtask!!!!!!!!1:");
            console.log(name);
            let lastGroupTask = (newProject.sections.find(section => section.name === getSectionName(data[i]._4)).tasks.at(-1));
            console.log("lastGroupTask");
            // console.log(lastGroupTask);
            // let subtaskTask = createTask(getSectionName(data[i]._4), name.trim(), Type.Task);
            // lastGroupTask.subtasks.push(subtaskTask);
            let projectId = newProject.projectId;
            let sectionName = (getSectionName(data[i]._4));
            let taskId = lastGroupTask.id;

            console.log(projectId+" "+sectionName+" "+taskId+" "+name);
            
            // addSubtask({
            //   projectId: projectId,
            //   sectionName: sectionName,
            //   taskId: taskId,
            //   subtaskName: name,
            // });

            let newProjectState = projectReducer(
              newProject,
              addSubtask({
                projectId: projectId,
                sectionName: sectionName,
                taskId: taskId,
                subtaskName: name,
              })
            );

            newProject = newProjectState;

            // newProject = projectReducer(
            //   newProject,
            //   addSubtask({
            //     projectId: projectId,
            //     sectionName: sectionName,
            //     taskId: taskId,
            //     subtaskName: name,
            //   })
            // );



          }          
        }

        
        }
        // -----
      

      
  }

    // console.log("index:");
    // console.log(i);
    // console.log("data.length:");
    // console.log(data.length);

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


      // console.log(d);
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

