class LoggerService {
  constructor(context) {
    this.context = context;
  }

  info(message, data = '') {
    console.log(`%c[INFO][${this.context}] ${message}`, "color: #17a2b8", data);
  }

  warn(message, data = '') {
    console.warn(`[WARN][${this.context}] ${message}`, data);
  }

  error(message, data = '') {
    console.error(`[ERROR][${this.context}] ${message}`, data);
  }
}

export default LoggerService;