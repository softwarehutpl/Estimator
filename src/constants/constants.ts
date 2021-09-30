import { RiskMultiplicator, Row } from '../types/Interface';

export const rowOrder: Row[] = [
  { name: 'Id', role: 'sectionId' },
  {
    name: 'Group/Task',
    role: 'name',
  },
  {
    name: 'Role',
    role: 'role',
  },
  {
    name: 'Min (MD)',
    role: 'minMd',
  },
  {
    name: 'Max (MD)',
    role: 'maxMd',
  },
  {
    name: 'Predicted (MD)',
    role: 'predictedMd',
  },
  {
    name: 'Risk',
    role: 'risk',
  },
];

export const riskMultiplicator: RiskMultiplicator = {
  L: 1,
  M: 1.25,
  H: 1.5,
};

export const summaryTableRowOrder: Row[] = [
  { name: 'Name', role: 'name' },
  {
    name: 'Min (MD)',
    role: 'minMd',
  },
  {
    name: 'Max (MD)',
    role: 'maxMd',
  },
  {
    name: 'Predicted (MD)',
    role: 'predictedMd',
  },
  {
    name: 'Risk',
    role: 'risk',
  },
];
