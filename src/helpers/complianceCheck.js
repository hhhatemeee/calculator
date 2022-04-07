export default function complianceCheck(localStorage, state) {

  if (typeof localStorage !== typeof state) {
    return false;
  }

  if (localStorage && typeof localStorage === 'object') {
    const keyListLocalStorage = Object.keys(localStorage).sort();
    const keyListObj = Object.keys(state).sort();
    let isEqualityKeys = true;

    if (keyListLocalStorage.length !== keyListObj.length) {
      return false;
    }

    keyListLocalStorage.forEach((name, i) => {
      if (name !== keyListObj[i]) {
        isEqualityKeys = false;
        return;
      }
    });

    if (!isEqualityKeys) {
      return false;
    }

    return keyListLocalStorage.every((key) => complianceCheck(localStorage[key], state[key]));
  }

  return true;
};