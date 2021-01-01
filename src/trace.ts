import { Logger } from './logger';
import { Row } from './row';
import { Domain, root } from './domain';
import { log } from './util';

export interface TraceOptions {
  enabled: boolean;
}

export const defaultOptions: TraceOptions = {
  enabled: true,
};

let globalOptions = {
  ...defaultOptions,
};

export interface Trace {
  // trace is this function signature ...
  (domainName: string): Logger;
  // with these properties ...
  root: Domain;
  domains: () => Domain[];
  domainNames: () => string[];
  config: (options?: TraceOptions) => void;
}

const trace = <Trace>function (domainName: string) {
  if (globalOptions.enabled) {
    const domain = Domain.get(domainName);
    return (...args: any[]) => {
      domain.push(args);
    };
  } else {
    return (...args: any[]) => {
      log('white', 'trace disabled');
    };
  }
};

trace.root = root;

trace.domains = () =>
  trace
    .domainNames()
    .map(domainName => Domain.allDomains.get(domainName) as Domain)
    .sort((a: Domain, b: Domain) => {
      return a.domainName < b.domainName ? -1 : 1;
    });

trace.domainNames = () => [...Domain.allDomains.keys()].sort();

trace.config = (options?: Partial<TraceOptions>) => {
  if (!options) {
    return {
      ...globalOptions,
    };
  } else {
    globalOptions = {
      ...globalOptions,
      ...options,
    };
  }
};

export { trace };
