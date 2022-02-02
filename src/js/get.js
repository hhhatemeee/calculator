export default function get(props, requiredField, defaultValue) {
  const getTypeProps = typeof props;

  const processData = Array.isArray(requiredField) ? requiredField : requiredField.split('.');

  let value = '';

  function iterating(obj) {
    const objectKeys = Object.keys(obj);

    objectKeys.forEach((key) => {
      processData.forEach((data, i) => {
        if (key.includes(data)) {
          if (Array.isArray(obj[key])) {
            iterating(obj[key][processData[i + 1]]);
          }

          if (typeof obj[key] === 'object') {
            iterating(obj[key]);
          } else {
            value = (obj[key]);
          }
        }
      });
    });
  }

  if (getTypeProps === 'object') {
    iterating(props);
  }
  if (getTypeProps === 'string' || getTypeProps === 'number' || getTypeProps === 'function') {
    value = props;
  }

  if (!value) return defaultValue;
  return value;
}
