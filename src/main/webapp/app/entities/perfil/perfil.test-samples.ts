import { IPerfil, NewPerfil } from './perfil.model';

export const sampleWithRequiredData: IPerfil = {
  id: 17418,
  nome: 'or',
};

export const sampleWithPartialData: IPerfil = {
  id: 12828,
  nome: 'with over which',
};

export const sampleWithFullData: IPerfil = {
  id: 15969,
  nome: 'chime',
  descricao: 'modulo since unfolded',
};

export const sampleWithNewData: NewPerfil = {
  nome: 'liquefy hence athwart',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
