interface GongdbInputData {
  [key: string]: string | boolean | string[] | boolean[];
  workingType: string;
  recruitType: string;
  districts: string;
  recruitLevel: string;
  rank: string;
  certificates: string;
  companyName: string;
  departments: string;
  languageScore: string;
  perfectLanguageScore: string;
  link: string;
  ncs: string;
  announcementTimestamp: string;
  position: string;
  sequence: string;
  subjects: string;
  announcementEtc: string;
  isEither: boolean;
  memo: string;
}

interface ErrorResponse {
  timestamp: string;
  message: string;
  fieldErrors: FieldError[];
}

interface FieldError {
  field: string;
  value: string;
  reason: string;
}
