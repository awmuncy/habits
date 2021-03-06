export const mergeByIdOrAdd = (list, item) => {
  let itemIndex = list.findIndex(listItem => {
    return listItem.id === item.id;
  });

  item.modified_at = new Date().getTime();

  if (itemIndex === -1) {
    list.push(item);
  } else {
    list[itemIndex] = Object.assign(list[itemIndex], item);
  }

  return list;
};


function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export function dynamicSortMultiple() {
  /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
  let props = arguments;
  return function(obj1, obj2) {
    let i = 0, result = 0, numberOfProperties = props.length;
    /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
    while (result === 0 && i < numberOfProperties) {
      result = dynamicSort(props[i])(obj1, obj2);
      i++;
    }
    return result;
  };
};
