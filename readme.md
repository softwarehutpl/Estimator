# Actions table documentation

| **Function name** | **Input** 
| --- | --- |
| addProject | { projectName, projectId } |
| delProject | projectID | 
| addTask | { projectId, sectionName, taskName?, type } |
| delTask | { projectId, sectionName, id } | 
| updateTasks | { projectId, sectionName, taskId, taskProps, updatedValue } | 
| addSubask | { projectId, sectionName, taskId, subtaskName } |
| delSubask | { projectId, sectionName, taskId, subtaskId } |
| updateTasks | { projectId, sectionName, taskId, subtaskId, taskProps, updatedValue } | 
| reorder | { projectId, sectionName, startIndex?, endIndex } |
