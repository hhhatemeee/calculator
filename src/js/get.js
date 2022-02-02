export default function get(props, requiredField, defaultValue) {
  const getTypeProps = typeof props;

  const processData = Array.isArray(requiredField) ? requiredField : requiredField.split('.');

  processData.forEach((data, i) => {
    if (data.includes('.')) {
      processData.splice(i, 1, data.split('.'));
    }
  });

  // console.log(processData);

  let value = '';
  const valueArr = [];
  let numberArr = 0;

  function iterating(obj) {
    const objectKeys = Object.keys(obj);

    objectKeys.forEach((key) => {
      processData.forEach((data, i) => {
        if (Array.isArray(data)) {
          data.forEach((arr, index) => {
            if (key.includes(arr)) {
              if (Array.isArray(obj[key])) {
                iterating(obj[key][data[index + 1]]);
                return;
              }

              if (typeof obj[key] === 'object') {
                iterating(obj[key]);
              } else {
                valueArr.push(obj[key]);
              }
            }
          });

          return;
        }

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
  console.log(valueArr);

  if (getTypeProps === 'object') {
    iterating(props);
  }

  if (!value && !valueArr) return defaultValue;
  return valueArr;
}

/*
export default function get(props, requiredField, defaultValue) {
  const getTypeProps = typeof props;

  const processData = requiredField.split('.');
  let currentState = { checked: processData[0], isFound: true };

  if (getTypeProps === 'object') {
    const object = Object.entries(props);

    processData.some((prop, i) => {
      console.log(currentState);
      currentState.checked = prop;
      console.log(1, currentState);
      if (currentState.isFound) {
        object.some((obj) => {
          // console.log(obj);
          if (obj[i].includes(prop)) {
            console.log(obj[1][prop]);
            console.log(prop, obj);
            currentState.isFound = true;
            return true;
          }
          console.log(123);
          currentState.isFound = false;
        });
        return;
      }
      if (i === processData.length - 1 && currentState.isFound) {
        console.log(currentState);
        return;
      }
      currentState.isFound = false;
    });
  }

  return defaultValue;
}
*/