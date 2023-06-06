import { Environment } from './Environment';

export interface SocketConfig {
  environment: Environment;
  localUri: string;
  prodUri: string;
}
