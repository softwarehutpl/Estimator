// @ts-nocheck
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

import initialProject from "../../store/initials/initialProject";
import { Type, Role } from "../../types/Interface";
import createTask from "../../store/actions/createTask";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { importProject } from "../../store/reducers/projectReducer";
import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { getProjectsDataSelector } from "../../store/selectors/selectors";

export const Import: FC<Props> = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const [project, setProject] = useState(null);
  const projectsData = useAppSelector(getProjectsDataSelector());
  const projectData = projectsData.find(
    (data) => data.projectId === projectId ?? data.projectName
  );
  // console.log(projectName.projectName);

  // let project = {};
  function getSectionName(sectionId) {
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

  function convertJsonToProjectStructure(data) {
    const newProject = JSON.parse(JSON.stringify(initialProject));

    newProject.projectName = projectData.projectName;
    newProject.projectId = projectId;
    newProject.estimatedBy = data[5]._2;
    newProject.estimationDate = data[5]._5;
    newProject.verifiedBy = data[6]._2;
    newProject.verificationDate = data[6]._5;
    newProject.estStart = data[2]._5;
    newProject.estEns = data[2]._7;
    newProject.teamSize = data[3]._5;
    newProject.timeBudget = parseInt(
      data[3]._7.substring(0, data[3]._7.length - 3)
    ); //"160 MD" => 160
    newProject.effort = parseInt(
      data[5]._7.substring(0, data[5]._7.length - 1)
    ); //"12h" => 12

    let i;
    for (i = 10; i < data.length; i++) {
      if (data[i]._1 === "") break; // pusta linijka po taskach

      let risk = data[i]._8; // risk - sekcja: number, task: string

      if (typeof risk == "number") {
        //if risk: number => section
        let name = data[i]._1; // nazwa sekcji
        let section = newProject.sections.find(
          (section) => section.name === name
        );
        const newSection = Object.assign({ ...section });
        newSection.maxMd = data[i]._6;
        newSection.minMd = data[i]._5;
        newSection.predictedMd = data[i]._7;
        newSection.risk = risk * 100; // 0.2162  => 21.62
        section = newSection;
      } else {
        // risk: string => task/group/subtask or comment

        if ((risk === "" || risk === undefined) && data[i]._4 !== undefined) {
          // (risk === "" => add group
          let name = data[i]._1; // nazwa taska
          let groupTask = createTask(
            getSectionName(data[i]._4),
            name,
            Type.Group
          );
          newProject.sections
            .find((section) => section.name === getSectionName(data[i]._4))
            .tasks.push(groupTask);
        } else {
          // risk !== "" => add task/subtask

          let name = data[i]._1; // nazwa taska
          if (data[i]._1.slice(0, 4) !== "    " && data[i]._4 !== undefined) {
            // name != "    ...." => task
            let newTask = createTask(
              getSectionName(data[i]._4),
              name,
              Type.Task
            );
            newTask.minMd = data[i]._5;
            newTask.maxMd = data[i]._6;
            newTask.predictedMd = data[i]._7;
            newTask.risk = data[i]._8;

            // add comment to task
            let commentIndex = i + 1;

            if (
              data[commentIndex]._1 !== "" &&
              data[commentIndex]._7 === "" &&
              data[commentIndex]._4 === undefined
            ) {
              newTask.comment = {
                text: data[commentIndex]._1,
                isImportant: false,
              };
              newProject.sections
                .find((section) => section.name === getSectionName(data[i]._4))
                .tasks.push(newTask);
              i++;
            } else {
              newTask.comment.text = "";
              newProject.sections
                .find((section) => section.name === getSectionName(data[i]._4))
                .tasks.push(newTask);
            }
          }

          if (data[i]._1.slice(0, 4) === "    " && data[i]._4 !== undefined) {
            // name = "    ...." => subtask
            // let name = data[i]._1; // nazwa taska
            let j = i;

            let subtasks = [];
            while (data[j]._1.slice(0, 4) === "    ") {
              let newSubtask = createTask(
                getSectionName(data[j]._4),
                data[j]._1.trim(),
                Type.Task
              );
              newSubtask.minMd = data[j]._5;
              newSubtask.maxMd = data[j]._6;
              newSubtask.predictedMd = data[j]._7;
              newSubtask.risk = data[j]._8;

              // add comment to task
              let subtaskCommentIndex = j + 1;

              if (
                data[subtaskCommentIndex]._1 !== "" &&
                data[subtaskCommentIndex]._7 === "" &&
                data[subtaskCommentIndex]._4 === undefined
              ) {
                newSubtask.comment = {
                  text: data[subtaskCommentIndex]._1,
                  isImportant: false,
                };
                j++;
              } else {
                newSubtask.comment.text = "";
              }

              // creating subtasks list
              subtasks.push(newSubtask);
              j++;
            }
            i = j;
            let lastGroupTask = newProject.sections
              .find((section) => section.name === getSectionName(data[i]._4))
              .tasks.at(-1);
            let taskId = lastGroupTask.id;
            let group = newProject.sections
              .find((section) => section.name === getSectionName(data[i]._4))
              .tasks.find((task) => task.id === taskId);
            // adding subtasks to group
            group.subtasks = subtasks;
            subtasks = [];
            i--;
          }
        }
      }
    }

    i++; // wskazuje na index "raw development...""

    newProject.rawDevelopmentEffortSum.name = data[i]._1;
    newProject.rawDevelopmentEffortSum.main.minMd = data[i]._5;
    newProject.rawDevelopmentEffortSum.main.maxMd = data[i]._6;
    newProject.rawDevelopmentEffortSum.main.predictedMd = data[i]._7;
    newProject.rawDevelopmentEffortSum.main.risk = data[i]._8 * 100;

    i++; // wskazuje na index "raw development... . parts"
    let partsIndex = 0;
    for (i; i < data.length; i++) {
      if (data[i]._1 === "") break; // pusta linijka po "raw development... . parts"

      newProject.rawDevelopmentEffortSum.parts[partsIndex].name = data[i]._1;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].procent = data[i]._3;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].role = data[i]._4;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].minMd = data[i]._5;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].maxMd = data[i]._6;
      newProject.rawDevelopmentEffortSum.parts[partsIndex].predictedMd =
        data[i]._7;

      partsIndex++;
    }

    i++; // i wskazuje na index Total(MD)
    newProject.summary[0].minMd = data[i]._5; // Total(MD) min
    newProject.summary[0].maxMd = data[i]._6; // Total(MD) max
    newProject.summary[0].predictedMd = data[i]._7; // Total(MD) predicted
    newProject.summary[0].risk = data[i]._8 * 100; // Total(MD) risk

    i++; // i wskazuje na index Per Team Member
    newProject.summary[1].minMd = data[i]._5; // Per Team Member min
    newProject.summary[1].maxMd = data[i]._6; // Per Team Member max
    newProject.summary[1].predictedMd = data[i]._7; // Per Team Member predicted

    i++; // i wskazuje na index Est. Delivery Date:
    newProject.summary[2].estDeliveryDate = data[i]._5; // estDeliveryDate

    if (i !== data.length - 2) {
      i = i + 2;
      let assumptionIndex = 1;
      for (i; i <= data.length - 1; i++) {
        // adding important assumptions
        newProject.assumptions.push({ id: assumptionIndex, text: data[i]._1 });
        assumptionIndex++;
      }
    }
    setProject(newProject);
  }

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((d) => {
        convertJsonToProjectStructure(d);
      })
      .catch((e) => console.warn(e));
  };

  useEffect(() => {
    if (!project) {
      return;
    }
    dispatch(
      importProject({
        importedProject: project,
        projectId: projectId,
      })
    );
  }, [dispatch, project]);

  if (project) {
    return <Redirect to={`/project/${project.projectId}`} />;
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
    </div>
  );
};

export default Import;
