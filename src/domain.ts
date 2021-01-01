import { forEach } from './util';
import { Row } from './row';
import { log } from './util';

export const ROOT_DOMAIN_ID = '__root__';

export class Domain {
  domainName: string;
  children: Map<string, Domain> = new Map();
  rows: Row[] = [];

  static allDomains: Map<string, Domain> = new Map();

  static forEach(callback: (domain: Domain) => void) {
    return root.forEach(callback);
  }

  static get(domainName: string, startFromDomain: Domain = root) {
    let domain = startFromDomain;
    forEach(domainName, localName => {
      domain = domain.local(localName);
    });
    return domain;
  }

  constructor(readonly localName: string, readonly parent?: Domain) {
    if (parent) {
      parent.children.set(localName, this);
    }
    this.domainName = parent
      ? `${parent.domainName}.${localName}`.replace(`${ROOT_DOMAIN_ID}.`, '')
      : localName;
    Domain.allDomains.set(this.domainName, this);
    log('green', `"${this.domainName}" created`);
  }

  forEach(callback: (domain: Domain) => void) {
    callback(this);
    for (let [localName, domain] of this.children) {
      domain.forEach(callback);
    }
  }

  local(localName: string) {
    const child = this.children.get(localName);
    if (child) {
      return child;
    } else {
      return new Domain(localName, this);
    }
  }

  push(args: any[]) {
    log('orange', `"${this.domainName}": ${JSON.stringify(args)}`);
    const row = new Row(args);
    this.rows.push(row);
  }
}

export const root = new Domain(ROOT_DOMAIN_ID);
