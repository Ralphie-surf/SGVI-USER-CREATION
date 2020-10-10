/**
 * Abstract base type for entities
 */
export interface IBaseAbstract {
    id?: number;
    dateCreated?: Date;
    createdBy?: string;
    dateLastModified?: Date;
    lastModifiedBy?: string;
    lastChangeInfo?: string;
    deletedBy?: string;
}

/**
 * Permission type
 */
export interface IPermission extends IBaseAbstract{
     name?: string
     description?: string
   bulmaProperties?: {primaryColor: string, primaryBackground: string};
}


/**
 * Permission type
 */
export interface IRole extends IBaseAbstract{
    name?: string
    description?: string
  bulmaProperties?: {primaryColor: string, primaryBackground: string};
}


/**
 * Profile type
 */
export interface IProfile extends IBaseAbstract{
     homeAddress?: string
     nationality?: string
     stateOfOrigin?: string
     photoId?: string
    bulmaProperties?: {primaryColor: string, primaryBackground: string};
}

/**
 * User type
 */
export interface IUser extends IBaseAbstract{
     firstName?: string
     middleName?: string
     lastName?: string
     commonName?: string
     gender?: string
     dateOfBirth?: Date
     isActive?: boolean;
     primaryEmailAddress?: string;
     isPrimaryEmailAddressVerified?: boolean;
     passwordSalt?: string;
     passwordHash?: string;
     isPasswordChangeRequired?: boolean;
     resetPasswordToken?: string;
     resetPasswordExpiration?: Date;
     primaryEmailVerificationToken?: string;
     otpEnabled?: boolean
     otpSecret?: string
     profile?: IProfile;
    [key: string]: any
}

/**
 * State variable type
 */
export interface IState {
    users?: IUser[];
    user?: IUser | null; //This can be use for User to edit or User to view, depending on the function being carried out
    onAddUser: boolean;
    onViewUser: boolean;
    onEditUser: boolean;
    userToEdit: IUser| null;
    alert: {
        show: boolean,
        message: string,
        type: any //problem making string compatible with type '"info" | "success" | "link" |
    }
}

/**
 * Action type for Reducer
 */
export interface IAction {
    //Indicate possible reducer action types here as you identify them in your codes
    type: 'FetchDataSuccess' | 'FetchDataFailure' | 'HandleOnAddUser' 
    | 'HandleCancelCreate' | 'BeforeCreateUser' | 'CreateUserSuccess' 
    | 'CreateUserFailure' | 'BeforeDeleteUser' | 'DeleteUserSuccess' 
    | 'DeleteUserFailure'| 'HandleEditUser' | 'HandleCancelUpdate' 
    | 'BeforeUpdateUser' | 'UpdateUserSuccess' | 'UpdateUserFailure' 
    | 'HandleCloseAlert' | 'HandleViewUser' | 'HandleCloseViewUser';
    payload?: {users?: IUser[], usersCount?: number, user?: IUser, error?: Error, 
        id?: number | string}

}

/*
The idea below is to provide room for specifying read
https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
*/
export interface IFindOptions {
    select?: string[];
    relations?: string[];
    skip?: number;
    take?: number;
    cache?: boolean;
    where?: {}[] | {};
    order?: {};

}