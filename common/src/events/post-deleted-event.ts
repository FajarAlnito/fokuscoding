import { Subjects } from './subjects';

export interface PostDeletedEvent {
	subject: Subjects.PostDeleted;
	data: {
		id: string;
		version: number;
	};
}