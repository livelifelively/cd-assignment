/* eslint-disable @typescript-eslint/no-explicit-any */

// LOGGER
const separator =
  '====================================================================================================================================================';
const Logger = {
  info: (idString: string, data: any) => {
    console.log(idString, JSON.stringify(data));
    console.log(separator);
  },
  warn: (idString: string, data: any) => {
    console.warn(idString, JSON.stringify(data));
    console.log(separator);
  },
  debug: (idString: string, data: any) => {
    console.debug(idString, JSON.stringify(data));
    console.log(separator);
  },
  error: (idString: string, data: any) => {
    console.error(idString, JSON.stringify(data));
    console.log(separator);
  },
};

export default Logger;
