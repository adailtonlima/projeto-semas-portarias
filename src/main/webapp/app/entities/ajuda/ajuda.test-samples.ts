import dayjs from 'dayjs/esm';

import { IAjuda, NewAjuda } from './ajuda.model';

export const sampleWithRequiredData: IAjuda = {
  id: 'dabd65af-929d-4bf7-a1b7-edb67192fd27',
  titulo: 'cuddly',
  createdAt: dayjs('2024-05-28T09:48'),
};

export const sampleWithPartialData: IAjuda = {
  id: 'eb410530-df08-461b-987d-75aa7b015dd7',
  titulo: 'mostly under',
  conteudo: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2024-05-27T21:21'),
  updatedAt: dayjs('2024-05-28T04:38'),
  deletedAt: dayjs('2024-05-27T23:05'),
};

export const sampleWithFullData: IAjuda = {
  id: '73ccbc2c-b9c1-49ce-b41f-4faf3e8b6ce7',
  titulo: 'plus',
  conteudo: '../fake-data/blob/hipster.txt',
  ativo: false,
  createdAt: dayjs('2024-05-28T01:43'),
  updatedAt: dayjs('2024-05-28T05:34'),
  deletedAt: dayjs('2024-05-27T17:14'),
};

export const sampleWithNewData: NewAjuda = {
  titulo: 'kindly denominator',
  createdAt: dayjs('2024-05-27T19:09'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
