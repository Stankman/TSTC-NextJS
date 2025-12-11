export interface KualiAPIResponse {
    count: number;
    res: Array<KualiProgram | KualiSpecialization | unknown>;
}

export interface KualiSpecialization {
    id: string;
    pid: string;
    title: string;
    code: string;
    semesters: KualiSemester[];
    catalogYear: string;
    locations: string[];
    monthsToComplete: number;
    modalities: KualiModality;
    prerequisites: string[];
    totalCredits?: number;
    price?: number;
}

export interface KualiSpecializationRaw {
  id: string;
  pid: string;
  title: string;
  code: string;
  catalogYear: string;
  monthsToComplete: string;
  modality: KualiModality;
  programRequirements: KualiProgramRequirements;
  requisites: KualiRequisitesRaw;
  locations: string[];
  description: string;
  status: string;
}

export interface KualiCourse {
  pid: string;
  title: string;
  description: string;
  code: string;
  number: string;
  labHours: number;
  lectureHours: number;
  totalCredits: number;
}

export interface KualiCourseRaw {
  pid: string;
  title: string;
  description: string;
  subjectCode: string;
  number: string;
  lab: string;
  lecture: string;
  semesterCreditHours: string;
}

export interface KualiLocation {
  id: string;
  name: string;
  code: string;
}

export interface KualiLocationRaw {
  id: string;
  name: string;
  ByOiUw4q_: string;
}

export interface KualiDegreeType {
  id: string;
  name: string;
  [key: string]: unknown;
}

export type KualiModality = Record<string, boolean>;

export interface KualiCourseBlock {
  optional: boolean;
  minimumCredits: number;
  courseIds: string[];
}

export interface KualiSemester {
  label: string;
  blocks: KualiCourseBlock[];
  totalCredits: number;
}

export interface KualiProgramRequirementsRaw {
  mode: string;
  sequenced: boolean;
  groupings?: KualiSemesterRaw[];
}

export interface KualiSemesterRaw {
  id?: string;
  label: string;
  key: string;
  inactive: boolean;
  useTerms?: boolean;
  rules: KualiSemesterRulesRaw;
}

export interface KualiSemesterRulesRaw {
  logic: string;
  groups: unknown[];
  rules: KualiRuleRaw[];
}

export interface KualiRuleRaw {
  alpha: string;
  key: string;
  data: {
    credits?: string;
    courses?: string[];
    text?: string;
  }
}

export interface KualiRequisitesRaw {
  mode: string;
  rules: {
    rules: KualiRuleRaw[];
  }
}