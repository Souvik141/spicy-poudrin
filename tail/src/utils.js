/**
 * @description     : Consists utilities for the tail (frontend)
 * @author          : Sav
 * @group           : utilities
 * @lastModifiedOn  : 13-05-2021
 * @lastModifiedBy  : Sav
 * @ModificationLog :
 * @Ver @Date       @Author     @Modification
 * 1.0  13-05-2021  Sav         with { generate token, verify token }
 */

const parseSearch = (searchString) => {
  if (searchString.charAt(0) !== "?") return {};
  searchString = searchString.substr(1, searchString.length);
  const queries = searchString.split("&");
  let query = {};
  queries.forEach(function (item) {
    const index = item.indexOf("=");
    if (index > 0)
      query[item.substr(0, index)] = item.substr(index + 1, item.length);
  });
  return query;
};

const isEmpty = (obj) => {
  if (obj === undefined) return true;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export { parseSearch, isEmpty };
