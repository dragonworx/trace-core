export const log = (color: string, ...args: any[]) =>
  console.log(`%c${args}`, `color:${color}`);

export const split = (domainName: string) => domainName.split('.');

export const last = (domainName: string) => {
  const parts = split(domainName);
  return parts[parts.length - 1];
};

export const forEach = (
  domainName: string,
  callback: (localName: string) => void,
) => split(domainName).forEach(callback);
