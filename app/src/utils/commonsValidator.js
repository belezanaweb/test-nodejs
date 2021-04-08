/**
 * Function that verify if some attribute is null
 * @param {Object} attr
 * @return {unknown}
 */
export const isNull = (attr) => {
  return attr == undefined || attr == "" || attr == null;
};
