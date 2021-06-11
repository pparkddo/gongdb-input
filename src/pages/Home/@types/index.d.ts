interface Announcement {
  id: number;
  company: {companyId: number, companyName: string};
  position: {positionId: number, positionName: string};
  certificates: string[];
  departments: string[];
  subjects: {subjectId: number, subjectName: string}[];
  languageScores: {languageId: number, languageName: string, score: string, perfectScore: string}[];
  notes: string[];
  recruitType: string;
  recruitLevel: string;
  workingType: string;
  districtName: string;
  headCount: number;
  receiptTimestamp: string;
  sequence: string;
  link: string;
  rank: string;
}