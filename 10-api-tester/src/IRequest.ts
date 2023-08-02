import { HttpMethod } from './HttpMethod';

export default interface IRequest {
  method: HttpMethod;
  endpoint: string;
}
