import { IAppConfig } from './IAppConfig';

const defaultConfig: IAppConfig = {
  factoryVersion: 'v1',
};

export async function fetchConfig(): Promise<IAppConfig> {
  try {
    const response = await fetch('config.json');
    if (!response.ok) {
      throw new Error('Failed to fetch config file.');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load config file. Using default configuration.');
    return defaultConfig;
  }
}

export async function updateFactoryVersion(version: string): Promise<void> {
  try {
    const config = await fetchConfig();
    config.factoryVersion = version;

    const response = await fetch('config.json', {
      method: 'PUT',
      body: JSON.stringify(config),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update config file.');
    }

    console.log('Configuration updated successfully.');
  } catch (error) {
    console.error('Failed to update config file:', error);
  }
}
