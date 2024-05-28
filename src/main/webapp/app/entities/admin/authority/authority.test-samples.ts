import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '2070d3e7-d98d-4f95-8ed0-1aa52ee4606e',
};

export const sampleWithPartialData: IAuthority = {
  name: '820d6a9e-545c-4a78-94a5-e8d598ce9be8',
};

export const sampleWithFullData: IAuthority = {
  name: '2d2eefd1-2bf3-4e4e-866f-b0b81f686e73',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
