export class User{
  constructor(
              public password: string,
              public email: string,
              public firstName?: string,
              public lastName?: string,
              public _id? : any){}
}
