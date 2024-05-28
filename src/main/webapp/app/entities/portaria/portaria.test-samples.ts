import dayjs from 'dayjs/esm';

import { IPortaria, NewPortaria } from './portaria.model';

export const sampleWithRequiredData: IPortaria = {
  id: 15529,
  numero: 21792,
};

export const sampleWithPartialData: IPortaria = {
  id: 29338,
  numero: 9464,
  data: dayjs('2024-05-27'),
  ano: 25738,
  justificativaExclusao: 'finally airman spirituality',
  deletedAt: dayjs('2024-05-28T12:39'),
};

export const sampleWithFullData: IPortaria = {
  id: 13482,
  numero: 3453,
  data: dayjs('2024-05-28'),
  dataInicio: dayjs('2024-05-27'),
  dataFim: dayjs('2024-05-28'),
  ano: 4758,
  justificativaExclusao: 'metallurgist modulo',
  createdAt: dayjs('2024-05-27T16:35'),
  updatedAt: dayjs('2024-05-27T16:52'),
  deletedAt: dayjs('2024-05-28T05:32'),
};

export const sampleWithNewData: NewPortaria = {
  numero: 16514,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
