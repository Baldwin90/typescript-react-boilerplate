interface filterObjectProps {
  sourceObject: Object,
  filter: Object,
};

export const filterObject = ({ sourceObject, filter }: filterObjectProps) => Object
  .keys(filter)
  .reduce((acc: Object, key: string) => {
  acc[key] = sourceObject[key];
  return acc;
}, {});

export default filterObject;
