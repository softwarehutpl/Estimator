import { Role, Task, Type } from "../../types/Interface";

const initialTask: Task = {
  id: "",
  type: Type.Task,
  name: "",
  role: Role.Empty,
  minMd: 0 || null,
  maxMd: 0 || null,
  predictedMd: 0 || null,
  predictedMdFormula: "",
  risk: "",
  comment: {
    text: "",
    isImportant: false,
  },

  subtasks: [],
};

export default initialTask;
