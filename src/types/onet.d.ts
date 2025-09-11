type KualiProgramRaw = {
    id: string;
    title: string;
    pid: string;
    code: string;
}

type KualiSpecializationRaw = {
  id: string;
  pid: string;
  title: string;
  code: string;
  catalogYear: string;
  monthsToComplete: string;
  modality: KualiModalityRaw;
  programRequirements: {
    mode: string;
    sequenced: boolean;
    groupings: {
      id: string;
      label: string;
      key: string;
      inactive: boolean;
      useTerms: boolean;
      rules: {
        rules?: Array<unknown>
      }
    }[]
  };
  requisites: { rules?: { rules?: Array<unknown> } };
  locations: string[];
  description: string;
  status: string;
}

type KualiLocationRaw = {
    id: string;
    name: string;
    ByOiUw4q_: string;
}

type KualiCourseRaw = {
    subjectCode: string;
    title: string;
    number: string;
    semesterCreditHours: number | string;
    lab: number | string;
    lecture: number | string;
    description: string;
}

type KualiModalityRaw = Record<string, boolean>;

interface KualiProgram {
    id: string;
    title: string;
    pid: string;
    code: string;
    specializations?: KualiSpecialization[];
    activeSpecializationsCount: number;
    priceRange?: string;
}

interface KualiSpecialization {
    id: string;
    pid: string;
    title: string;
    code: string;
    catalogYear?: string;
    locations?: string[];
    campuses?: Campus[];
    monthsToComplete?: string;
    semesters?: KualiSemester[];
    totalCredits?: number;
    modalities?: string[];
    prerequisites?: string[];
    price?: number;
}

interface KualiSemester {
    label: string;
    credits: number;
    blocks: KualiCourseBlock[];
}

interface KualiCourseBlock {
    optional: boolean;
    minimumCredits: number;
    courses: KualiCourse[];
    credits: number;
}

interface KualiCourse {
    id: string;
    code: string;
    title: string;
    number: string;
    credits: number;
    lab: number;
    lecture: number;
    description: string;
}