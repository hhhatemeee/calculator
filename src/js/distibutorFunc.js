export default function distributor(props, requiredData, from) {
  const getTypeProps = typeof props;

  const processedData = Array.isArray(requiredData) ? requiredData : requiredData.replace(/\s/g, '').split(',');

  if (getTypeProps === 'object') {
    const data = Object.entries(props);

    data.forEach((prop) => {
      if (processedData.includes(prop[0])) {
        from[prop[0]] = prop[1];
      }
    });

    return;
  }

  if (getTypeProps === 'string') {
    from[processedData[0]] = props;
  }

  if (getTypeProps === 'number') {
    from[processedData[0]] = props;
  }
}
