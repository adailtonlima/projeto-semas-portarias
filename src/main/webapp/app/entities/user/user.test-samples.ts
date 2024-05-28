import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 19241,
  login: 'J6',
};

export const sampleWithPartialData: IUser = {
  id: 23966,
  login: '&?A@G6ZUBe\\[fh8O1t',
};

export const sampleWithFullData: IUser = {
  id: 101,
  login: 'o@nMdRB',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
