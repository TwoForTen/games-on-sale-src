const parseQueryParams = (queryParams) => {
  let paramsArray = [];
  for (let param in queryParams) {
    if (queryParams[param]) {
      paramsArray.push(`${param}=${queryParams[param]}`);
    }
  }
  return paramsArray.join('&');
};

export default parseQueryParams;
