export interface UserGroup {
  id?: string;
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  length: number;
  additionalinfo: any;
  islocked?: any
}

export interface ProviderGroup {
  id?: number;
  fullName?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  county?: string;
  zipcode?: string;
  state?: string;
  phone?: string;
  created?: string;
  createdBy?: string;
  updated?: string;
  updatedBy?: null;
  deleted?: boolean;
  contracted?: boolean;
  speciality?: number;
}
export interface RoleModel {
  id?: string;
  name?: string;
}

export interface LandingPageModel {
  applicationid?: number;
  id?: number;
  name?: string;
  order?: number;
  parentid?: number;
  route?: string;
}
export class UserRoleDto {
  constructor(data?: Partial<UserRoleDto>) {
    Object.assign(this, data);
  }
  id!: number;
  name!: string;
  description!: string | null;
  priority!: number;
  order!: number;
  defaultpage!: UserRolePageDto;
  defaultpageid!: number;
  parentid!: number | null;
  parent!: UserRoleDto | null;
}

export class UserRolePageDto {
  constructor(data?: Partial<UserRolePageDto>) {
    Object.assign(this, data);
  }
  id!: number;
  name!: string;
  route!: string;
  icon!: string | null;
  order!: number;
  ismenu!: boolean;
}
