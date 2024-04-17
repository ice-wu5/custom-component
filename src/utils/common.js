export const addIsExpand = (arr) => {
  return arr.map(item => {
    // 创建一个新对象，保持原对象的属性不变，并添加 isEdit 属性
    const newItem = { ...item, isExpand: false }
    // 如果当前数组元素有 children 属性且是数组，则递归处理 children 数组元素
    if (item.children && Array.isArray(item.children)) {
      newItem.children = addIsExpand(item.children)
    }
    return newItem
  })
}
