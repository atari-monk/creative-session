export interface IUser extends Document {
  email: string;
  displayName: string;
  maxRecords: number;
}
