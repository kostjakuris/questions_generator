export interface CreateQuestionFields {
  text: string;
  questionKind: string;
  answerVariant: string;
  questionOptions: any[];
}

export interface EditQuestionFields {
  id: number;
  text: string;
  questionKind: string;
  answerVariant: string;
  questionOptions: any[];
  answers: any[];
}