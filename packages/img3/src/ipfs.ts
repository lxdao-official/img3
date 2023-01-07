export const convertIpfsToUrl = (
  options: { hash: string; gateway: string; timeout?: number },
  callback: (err?: Error, url?: string) => void
) => {
  let { hash, gateway, timeout = 2000 } = options;
  const xhr = new XMLHttpRequest();
  if (gateway.endsWith('/')) {
    gateway = gateway.slice(0, -1);
  }
  const url = `${gateway}/${hash}`;
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

const defaultGatewayList = [
  'https://nftstorage.link/ipfs/',
  'https://ipfs-gateway.cloud/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://4everland.io/ipfs/',
];

// cache in runtime
let fasterGatewayCache = '';

export const getFasterIpfsUrl = (options: { hash: string; timeout?: number; gateways?: string[] }) => {
  const { hash, timeout, gateways = defaultGatewayList } = options;
  const isFasterFetch = fasterGatewayCache !== '';
  return new Promise<string>((resolve, reject) => {
    let tasks: Array<ReturnType<typeof convertIpfsToUrl>> = [];
    function fetchCallback(opts: { index: number; gateway: string }, err?: Error, url?: string) {
      const { index, gateway } = opts;
      if (err) {
        tasks.splice(index, 1);
        if (tasks.length === 0) {
          if (isFasterFetch) {
            fasterGatewayCache = '';
            // If faster ipfs fetch failed, try again with default gateway list
            getFasterIpfsUrl(options).then(resolve, reject);
          } else {
            reject(err);
          }
        }
      } else {
        tasks.forEach((task, i) => {
          if (i !== index) {
            task.abort();
          }
        });
        fasterGatewayCache = gateway;
        resolve(url!);
      }
    }

    const taskGatewayList = fasterGatewayCache ? [fasterGatewayCache] : gateways;

    tasks = taskGatewayList.map((gateway, index) => {
      return convertIpfsToUrl({ hash, gateway, timeout }, (err, url) => {
        fetchCallback({ index, gateway }, err, url);
      });
    });
  });
};
