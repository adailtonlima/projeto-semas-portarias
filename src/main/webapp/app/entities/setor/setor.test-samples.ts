import dayjs from 'dayjs/esm';

import { ISetor, NewSetor } from './setor.model';

export const sampleWithRequiredData: ISetor = {
  id: 840,
  nome: 'crushing',
};

export const sampleWithPartialData: ISetor = {
  id: 11197,
  nome: 'apud repeatedly graceful',
};

export const sampleWithFullData: ISetor = {
  id: 10140,
  nome: 'noisily yieldingly blah',
  sigla: 'athwart phooey homeownership',
  createdAt: dayjs('2024-05-28T05:24'),
  updatedAt: dayjs('2024-05-28T13:49'),
  deletedAt: dayjs('2024-05-27T22:36'),
};

export const sampleWithNewData: NewSetor = {
  nome: 'nonstop',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
