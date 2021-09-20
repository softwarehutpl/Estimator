# Actions table documentation

| **Function name** | **Input** | **Output** |
| --- | --- | --- |
| createProject | projectName | project |
| deleteProject | Id | projects |
| updateProject | project | project |
| createTask | projectName, sectionName, taskName | task |
| deleteTask | Id | projects |
| updateTask | Id, {name,minMd,maxMd,risk } | task |
| createGroup | projectName, sectionName, groupName | task (type: group) |
| deleteGroup | Id | projects |
| updateGroup | Id, {name} | task (type: group) |
| updateComment | Id, {text,isImportant} | task || task (type: group) |
