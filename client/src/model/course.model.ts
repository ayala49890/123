export class Course {
    id: number;
    name: string;
    description:string;
    categoryId: number;
    amount: number;
    beginDate: Date;
    syllabus: string[];
    learningType: LearningType;
    lecturerId: number;
    image: string;
}

export enum LearningType {
  Frontal = 1,
  Digital = 2
}
