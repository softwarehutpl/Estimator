import { Role, Task, Type } from "../../types/Interface";

const initialTask: Task = {
  id: 0,
  type: Type.Group,
  name: "",
  role: Role.Empty,
  minMd: 0,
  maxMd: 0,
  predictedMd: 0,
  predictedMdFormula: "",
  risk: "",
  comment: {
    text: "",
    isImportant: false,
  },

  subtasks: [],
};

export default initialTask;
