export function mockFetch(jest: any, status: number, response: any) {
  const xhrMockObj = {
    open: jest.fn(),
    send: jest.fn(),
    abort: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status,
    ...response,
  };

  const xhrMockClass = () => xhrMockObj;

  // @ts-ignore
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  setTimeout(() => {
    xhrMockObj.onload();
  }, 0);
}
