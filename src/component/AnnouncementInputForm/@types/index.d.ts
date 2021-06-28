interface LanguageScoreInput {
  [name: string]: string;
  [score: string]: string;
  [perfectScore: string]: string;
}

interface AnnouncementInputFormProps {
  announcement?: Announcement;
  fieldErrors?: FieldError[];
  onSubmit: (announcement: AnnouncementInput) => void;
}

interface Certificate {
  id: number;
  name: string;
}

interface Department {
  id: number;
  name: string;
}

interface AnnouncementInput {
  companyName: string;
  positionName: string;
  recruitType: string;
  recruitLevel: string;
  workingType: string;
  districtName: string;
  headCount: string;
  certificates: string[];
  departments: string[];
  subjects: string[];
  languageScores: LanguageScoreInput[];
  notes: string[];
  receiptTimestamp: string;
  sequence: string;
  link: string;
  rank: string;
}

interface Selected {
  customOption: boolean;
  label: string;
  id: string;
}