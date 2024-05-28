import dayjs from 'dayjs/esm';

import { ITopico, NewTopico } from './topico.model';

export const sampleWithRequiredData: ITopico = {
  id: '3578d14a-7972-4d4e-bb27-75c916d305c6',
  titulo: 'knowledgeably tensely',
  createdAt: dayjs('2024-05-28T12:29'),
};

export const sampleWithPartialData: ITopico = {
  id: '9d0cf660-8067-4a0f-99e8-5ace4126a45c',
  titulo: 'if',
  ativo: true,
  createdAt: dayjs('2024-05-27T16:50'),
  deletedAt: dayjs('2024-05-28T06:27'),
};

export const sampleWithFullData: ITopico = {
  id: 'f407f661-b2aa-48e1-a630-e4481ccfe68b',
  titulo: 'supposing till bah',
  conteudo: '../fake-data/blob/hipster.txt',
  ativo: true,
  createdAt: dayjs('2024-05-28T09:04'),
  updatedAt: dayjs('2024-05-28T00:05'),
  deletedAt: dayjs('2024-05-27T17:12'),
};

export const sampleWithNewData: NewTopico = {
  titulo: 'yuck icky',
  createdAt: dayjs('2024-05-28T09:35'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
