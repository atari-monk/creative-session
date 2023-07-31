import ISharedProps from './ISharedProps';

export default interface ILoginGoogleProps extends ISharedProps {
  setMessage: (message: string) => void;
}
