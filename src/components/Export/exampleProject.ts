import { Project, Role, Type } from '../../types/Interface';

const myProject: Project = {
	projectName: "Test project",
	estimatedBy: "Hortensjo Pisuarez",
	estimationDate: "30.11.2020", 
	verifiedBy: "Wieńczysław Należyty",
	verificationDate: "",
	estStart: "01.01.2021", 
	estEns: "01.03.2021", 
	teamSize: 4,
	timeBudget: 160,
	effort: 12,
	sections: [
		{
			sectionId: Role.FD,
			name: 'Frontend development',
			minMd: 19.25,
			minMdFormula: '',
			maxMd: 56.25,
			maxMdFormula: '',
			predictedMd: 46.25,
			predictedMdFormula: '',
			risk: 21.62,
			riskFormula: '',
			tasks: [
				{
					id: "123",
					type: Type.Task,
					name: "Business feature",
					role: Role.FD,
					minMd: 11,
					maxMd: 30.6,
					predictedMd: 25,
					predictedMdFormula: "",
					risk: "H",
					comment: {
						text: "",                            
						isImportant: false
					},
					subtasks: [
						{
							id: "abc",
							type: Type.Task,
							name: "s1",
							role: Role.FD,
							minMd: 12,
							maxMd: 30.5,
							predictedMd: 25,
							predictedMdFormula: "",
							risk: "H",
							comment: {
								text: "Business feature is better described as doing something i.e. logging into a system, printing a report or editing a text ",                            
								isImportant: true
							},
							subtasks: []
						},
						{
							id: "def",
							type: Type.Task,
							name: "s2",
							role: Role.FD,
							minMd: 13.4,
							maxMd: 30,
							predictedMd: 25,
							predictedMdFormula: "",
							risk: "H",
							comment: {
								text: "Business feature is better described as doing something i.e. logging into a system, printing a report or editing a text",                            
								isImportant: false
							},
							subtasks: []
						}
					]
				},
				{
					id: "678",
					type: Type.Task,
					name: "Business feature 3",
					role: Role.FD,
					minMd: 14,
					maxMd: 30,
					predictedMd: 25,
					predictedMdFormula: "",
					risk: "L",
					comment: {
						text: "",                            
						isImportant: false
					},
					subtasks: []
				},
				{
					id: "879",
					type: Type.Task,
					name: "Business feature 4",
					role: Role.FD,
					minMd: 15,
					maxMd: 30,
					predictedMd: 25,
					predictedMdFormula: "",
					risk: "M",
					comment: {
						text: "Business feature is better described as doing something i.e. logging into a system, printing a report or editing a text",                            
						isImportant: false
					},
					subtasks: []
				}				
			]
		},
		{
			sectionId: Role.BD,
			name: 'Backend development',
			minMd: 0,
			minMdFormula: '',
			maxMd: 0,
			maxMdFormula: '',
			predictedMd: 0,
			predictedMdFormula: '',
			risk: 0,
			riskFormula: '',
			tasks: [],
		},
		{
			sectionId: Role.MD,
			name: 'Mobile development',
			minMd: 0,
			minMdFormula: '',
			maxMd: 0,
			maxMdFormula: '',
			predictedMd: 0,
			predictedMdFormula: '',
			risk: 0,
			riskFormula: '',
			tasks: [],
		},
		{
			sectionId: Role.UD,
			name: 'Design / UX / UI',
			minMd: 0,
			minMdFormula: '',
			maxMd: 0,
			maxMdFormula: '',
			predictedMd: 0,
			predictedMdFormula: '',
			risk: 0,
			riskFormula: '',
			tasks: [],
		},
		{
			sectionId: Role.DO,
			name: 'Configuration / Setup / Deployment',
			minMd: 0,
			minMdFormula: '',
			maxMd: 0,
			maxMdFormula: '',
			predictedMd: 0,
			predictedMdFormula: '',
			risk: 0,
			riskFormula: '',
			tasks: [],
		},
	],
	rawDevelopmentEffortSum: {
		name: "Raw development effort sum",
		main: {
			minMd: 39.5,
			minMdFormula: "",
			maxMd: 92.5,
			maxMdFormula: "",
			predictedMd: 76,
			predictedMdFormula: "",
			risk: 21.71,
			riskFormula: ""
		},
		parts: [ 
			{
				name: "Tests and fixes overhead",
				procent: 20,
				role: "QA",
				minMd: 7.5,
				minMdFormula: "",
				maxMd: 18.5,
				maxMdFormula: "",
				predictedMd: 15,
				predictedMdFormula: ""
			},
			{
				name: "Communication and management",
				procent: 10,
				role: "PM",
				minMd: 3.5,
				minMdFormula: "",
				maxMd: 9,
				maxMdFormula: "",
				predictedMd: 7.5,
				predictedMdFormula: ""
			},
			{
				name: "Other risks (i.e. fixed price)",
				procent: 0,
				role: "",
				minMd: 0,
				minMdFormula: "",
				maxMd: 0,
				maxMdFormula: "",
				predictedMd: 0,
				predictedMdFormula: ""
			}
		]
	},
	summary: [
		{
			name: "Total (MD):",
			minMd: 51,
			minMdFormula: "",
			maxMd: 120,
			maxMdFormula: "",
			predictedMd: 99,
			predictedMdFormula: "",
			risk: 21.11,
			riskFormula: ""
		},
		{
			name: "Per Team Member:",
			minMd: 12.75,
			minMdFormula: "",
			maxMd: 30,
			maxMdFormula: "",
			predictedMd: 24.75,
			predictedMdFormula: ""
		},
		{
			name: "Est. Delivery Date:",
			estDeliveryDate: "21.03.2022"
		}
	],
	assumptions: [
		{
			id: 1,
			text: "The features and tasks estimated here might not be complete, they reflect current state of knowledge."
		},
		{
			id: 2,
			text: "Any change in user requirements will invalidate this estimation. In such case the workload must be re-estimated."
		},
		{
			id: 3,
			text: "???"
		}
	],
}

export default myProject;
