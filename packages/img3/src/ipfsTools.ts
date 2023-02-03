import { defaultGateways } from './defaultGateways';

export const convertIpfsToLink = (
  options: { ipfs: string; gateway: string; timeout?: number },
  callback: (err?: Error, url?: string) => void
) => {
  let { ipfs, gateway, timeout = 2000 } = options;
  const xhr = new XMLHttpRequest();

  // @see https://nft.storage/docs/concepts/gateways/#using-the-gateway
  const url = ipfs.replace('ipfs://', gateway);
  xhr.open('GET', url, true);

  // timeout after 2 seconds aborting the request
  const timer = setTimeout(() => {
    xhr.abort();
    callback(new Error('fetch ipfs ' + url + 'is timeout of 2s'));
  }, timeout);
  xhr.onload = () => {
    if (xhr.status === 200) {
      clearTimeout(timer);
      callback(undefined, xhr.responseURL);
    } else {
      clearTimeout(timer);
      callback(new Error(xhr.statusText));
    }
  };
  xhr.send();

  return {
    abort: () => {
      clearTimeout(timer);
      xhr.abort();
    },
  };
};

// cache in runtime
let fasterGatewayCache = '';

export const getFasterIpfsLink = (options: { ipfs: string; timeout?: number; gateways?: string[] }) => {
  const { ipfs, timeout, gateways = defaultGateways } = options;
  const inGateways = gateways.indexOf(fasterGatewayCache) !== -1;
  let isFasterFetch = fasterGatewayCache !== '';

  return new Promise<string>((resolve, reject) => {
    let tasks: Array<ReturnType<typeof convertIpfsToLink> | null> = [];

    function fetchCallback(opts: { index: number; gateway: string }, err?: Error, url?: string) {
      const { index, gateway } = opts;
      if (err) {
        tasks.splice(index, 1, null);
        if (tasks.every((task) => task === null)) {
          if (isFasterFetch) {
            fasterGatewayCache = '';
            // If faster ipfs fetch failed, try again with default gateway list
            getFasterIpfsLink(options).then(resolve, reject);
          } else {
            reject(err);
          }
        }
      } else {
        tasks.forEach((task, i) => {
          if (i !== index) {
            task && task.abort();
          }
        });
        fasterGatewayCache = gateway;
        resolve(url!);
      }
    }

    const taskGatewayList = fasterGatewayCache && inGateways ? [fasterGatewayCache] : gateways;

    tasks = taskGatewayList.map((gateway, index) => {
      return convertIpfsToLink({ ipfs, gateway, timeout }, (err, url) => {
        fetchCallback({ index, gateway }, err, url);
      });
    });
  });
};
