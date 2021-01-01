export interface Logger {
  (...args: any[]): void;
  // config: (options?: TraceOptions) => void;
}
