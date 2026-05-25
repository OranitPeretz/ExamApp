class ConfigService {
  constructor() {
    this.config = {
      apiDelay: 500,
      appName: "E-Test Enterprise System",
      version: "2.0.0"
    };
  }

  get(key) {
    return this.config[key];
  }
}

export const configService = new ConfigService();