export const mergeByIdOrAdd = (list, item) => {
    var itemIndex = list.findIndex(listItems => {
        return (listItem.id==item.id);
    });

    item.modified_at = new Date().getTime();

    if(itemIndex===-1) {
        list.push(item);
    } else {
        list[itemIndex] = Object.assign(list[itemIndex], item);
    }

    return list;
}