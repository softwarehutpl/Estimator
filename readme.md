# Actions table documentation

| **Function name** | **Input** | **Output** |
| --- | --- | --- |
| createProject | projectName | project |
| deleteProject | projects, Id | projects |
| updateProject | project | project |
| createTask | projects, projectName, sectionName, taskName | projects |
| deleteTask | projects, Id | projects |
| updateTask | projects, Id, {name,minMd,maxMd,risk } | projects |
| createGroup | projects, projectName, sectionName, groupName | projects |
| deleteGroup | projects, Id | projects |
| updateGroup | projects, Id, {name} | projects) |
| updateComment | projects, Id, {text,isImportant} | projects |
