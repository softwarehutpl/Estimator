export enum SEVERITY_LEVEL {
	success = 'success',
	warning = 'warning',
	danger = 'danger',
}

export const getSeverityLevel = (risk: string): string => {
	switch (risk) {
		case 'L':
			return SEVERITY_LEVEL.success;
		case 'M':
			return SEVERITY_LEVEL.warning;
		case 'H':
			return SEVERITY_LEVEL.danger;
		default:
			return '';
	}
};
