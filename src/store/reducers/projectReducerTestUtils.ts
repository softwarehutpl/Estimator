const testUtils = {
  stateWithEmptyProject: {
    "projects":
    [
      {"assumptions": [], "effort": 0, "estEns": "", "estStart": "", "estimatedBy": "", "estimationDate": "21.09.2021", "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": 
      {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk":  0, "riskFormula": "", "sectionId": "", "tasks":[]}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk":   0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "",   "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}],
         "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""
        }
      ]},
  stateWithOneProjectAndOneTask: {
  "projects":
  [
    {"assumptions": [], "effort": 0, "estEns": "", "estStart": "", "estimatedBy": "", "estimationDate": "21.09.2021", "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", "projectName": "New Project Title", 
    "rawDevelopmentEffortSum": 
    {"main": {}, "name": "", "parts": []}, 
    "sections": 
    [
      {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
      {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk":  0, "riskFormula": "", "sectionId": "", 
      "tasks": 
      [
        {"comment": {"isImportant": false, "text": ""}, "id": "f819c1a6-5237-44b5-a4fe-623f911c2a8c", "maxMd": 0, "minMd": 0, "name": "New task", "predictedMd": 0, "predictedMdFormula": "", "risk": "L", "role": "BD", "subtasks": [], "type": "task"}
      ]}, 
      {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk":   0, "riskFormula": "", "sectionId": "", "tasks": []}, 
      {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "",   "sectionId": "", "tasks": []}, 
      {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}],
       "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""
      }
    ]},
    stateWithTwoProjects: {
    "projects":
    [
      {"assumptions": [], "effort": 0, "estEns": "", "estStart": "", "estimatedBy": "", "estimationDate": "21.09.2021", "projectId": "1b3cada1-6c61-4974-9886-d3651f76007d", "projectName": "New Project Title", 
      "rawDevelopmentEffortSum": 
      {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk":  0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk":   0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "",   "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}],
          "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""
      },
      {"assumptions": [], "effort": 0, "estEns": "", "estStart": "", "estimatedBy": "", "estimationDate": "21.09.2021", "projectId": "1b3cada1-6c61-4974-9886-d3651f76007e", "projectName": "New Project Title 2", 
      "rawDevelopmentEffortSum": 
      {"main": {}, "name": "", "parts": []}, 
      "sections": 
      [
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Frontend development", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Backend development", "predictedMd": 0, "predictedMdFormula": "", "risk":  0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Mobile development", "predictedMd": 0, "predictedMdFormula": "", "risk":   0, "riskFormula": "", "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Design / UX / UI", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "",   "sectionId": "", "tasks": []}, 
        {"maxMd": 0, "maxMdFormula": "", "minMd": 0, "minMdFormula": "", "name": "Configuration / Setup / Deployment", "predictedMd": 0, "predictedMdFormula": "", "risk": 0, "riskFormula": "", "sectionId": "", "tasks": []}],
          "summary": [], "teamSize": 0, "timeBudget": 0, "verificationDate": "", "verifiedBy": ""
        }
    ]},
  };

  export default testUtils;