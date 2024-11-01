import dotenv from "dotenv";

dotenv.config();

interface IEnvironmentVariables {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface IConfiguration {
  NODE_ENV: string;
  PORT: number;
}

class EnvironmentConfiguration {
	private config: IConfiguration;

	constructor() {
		this.config = this.loadEnvironmentConfiguration();
		this.config = this.validateEnvironmentConfiguration(this.config);
	}

	private loadEnvironmentConfiguration(): IEnvironmentVariables {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    };
  }

  private validateEnvironmentConfiguration(
    config: IEnvironmentVariables,
  ): IConfiguration {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }

    return config as IConfiguration;
  }

  public get configuration(): IConfiguration {
    return this.config;
  }
}

const envConfig = new EnvironmentConfiguration();
export const environmentConfiguration = envConfig.configuration;
