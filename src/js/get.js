export default function get(props, requiredField, defaultValue) {
  if ((!props && !requiredField)) {
    console.warn('Аргументы не могут быть пустыми');

    return 0;
  }

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

  switch (getTypeProps) {
    case 'object':
      iterating(props);
      break;
    default:
      value = props;
  }

  if (!value) {
    return defaultValue;
  }

  return value;
}
