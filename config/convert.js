function convert(config) {
  const result = {};
  Object.keys(config).forEach((name) => {
    let value = config[name];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      value = convert(value);
    }

    if (typeof value === 'string' && value.indexOf('$') > -1) {
      const key = value.replace(/\$/g, '');

      if (process.env[key]) {
        value = process.env[key];

        if (value === 'true') value = true;
        if (value === 'false') value = false;
      } else {
        value = undefined;
      }
    }

    result[name] = value;
  });

  return result;
}

module.exports = convert;
