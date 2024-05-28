import dayjs from 'dayjs/esm';

import { IAssunto, NewAssunto } from './assunto.model';

export const sampleWithRequiredData: IAssunto = {
  id: 1666,
  nome: 'for that polenta',
};

export const sampleWithPartialData: IAssunto = {
  id: 13170,
  nome: 'gurgle',
  createdAt: dayjs('2024-05-28T09:03'),
};

export const sampleWithFullData: IAssunto = {
  id: 12595,
  nome: 'produce',
  descricao: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2024-05-28T14:34'),
  updatedAt: dayjs('2024-05-28T03:32'),
  deletedAt: dayjs('2024-05-28T09:45'),
};

export const sampleWithNewData: NewAssunto = {
  nome: 'corporatism',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
