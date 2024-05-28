import dayjs from 'dayjs/esm';

import { IUsuario, NewUsuario } from './usuario.model';

export const sampleWithRequiredData: IUsuario = {
  id: 680,
  nome: 'long',
};

export const sampleWithPartialData: IUsuario = {
  id: 29094,
  nome: 'jealously childbirth',
  login: 'dear snowplow',
  email: 'JoaoPedro71@yahoo.com',
  updatedAt: dayjs('2024-05-28T13:39'),
};

export const sampleWithFullData: IUsuario = {
  id: 7574,
  nome: 'behaviour',
  login: 'legislation',
  email: 'MariaClara84@live.com',
  cpf: 'impel hence athwart',
  createdAt: dayjs('2024-05-27T19:23'),
  updatedAt: dayjs('2024-05-28T02:35'),
  deletedAt: dayjs('2024-05-28T10:22'),
};

export const sampleWithNewData: NewUsuario = {
  nome: 'indeed',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
