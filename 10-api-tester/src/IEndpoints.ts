import IRequest from './IRequest';

export default interface IEndpoints {
  [name: string]: IRequest;
}
