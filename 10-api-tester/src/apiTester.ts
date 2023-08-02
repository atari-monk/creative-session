import axios, { AxiosError, AxiosResponse } from 'axios';
import IRouting from './IRouting';
import { first } from './utils';

export const testGet = async (
  key: string,
  routing: IRouting,
  showFirst: boolean = false
): Promise<void> => {
  try {
    const { nr, url } = buildTestData(key, routing);
    console.log(`${nr}. ${key}`);
    console.log('Endpoint:', url);
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log('Response Status:', response.status);
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }
    console.log('Elements Count:', response.data.length);
    if (showFirst) console.log('First element:', first(response.data));
  } catch (error) {
    console.error('AxiosError:', error as AxiosError);
  }
};

const buildTestData = (key: string, routing: IRouting) => {
  const endpoint = routing.endpoints[key];

  if (!endpoint) {
    throw new Error(`Endpoint with key '${key}' not found.`);
  }

  const keys = Object.keys(routing.endpoints);
  const nr = keys.indexOf(key) + 1;

  const url = routing.baseUrl + '/' + endpoint.endpoint;
  return { nr, url };
};

export const testPost = async (
  key: string,
  routing: IRouting,
  postData: any,
  showData: boolean = false
): Promise<void> => {
  try {
    const { nr, url } = buildTestData(key, routing);
    console.log(`${nr}. ${key}`);
    console.log('Endpoint:', url);

    const response: AxiosResponse = await axios.post(url, postData);

    if (response.status === 201) {
      console.log('Response Status:', response.status);
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }

    if (showData) {
      console.log('Inserted:', response.data);
    }
  } catch (error) {
    console.error('AxiosError:', error as AxiosError);
  }
};
