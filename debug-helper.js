// n8n工作流调试辅助脚本
// 用于诊断 "propertyValues[itemName] is not iterable" 错误

// 在出现错误的Code节点开头添加这些调试代码：

console.log('=== 调试信息开始 ===');
console.log('输入数据类型:', typeof $input);
console.log('输入数据:', JSON.stringify($input, null, 2));

// 检查 $input.all() 的结构
const allItems = $input.all();
console.log('所有项目数量:', allItems.length);
console.log('第一个项目:', JSON.stringify(allItems[0], null, 2));

// 如果使用了 propertyValues，检查它的结构
if (typeof propertyValues !== 'undefined') {
  console.log('propertyValues 类型:', typeof propertyValues);
  console.log('propertyValues:', JSON.stringify(propertyValues, null, 2));
  
  // 检查每个属性
  for (const key in propertyValues) {
    console.log(`propertyValues[${key}] 类型:`, typeof propertyValues[key]);
    console.log(`propertyValues[${key}] 是否为数组:`, Array.isArray(propertyValues[key]));
    console.log(`propertyValues[${key}] 值:`, propertyValues[key]);
  }
}

console.log('=== 调试信息结束 ===');

// 修复方案1: 确保迭代对象是数组
function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === null || value === undefined) {
    return [];
  }
  if (typeof value === 'string') {
    // 如果是JSON字符串，尝试解析
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [value];
    }
  }
  // 其他类型转换为单元素数组
  return [value];
}

// 修复方案2: 安全的迭代函数
function safeIterate(items, callback) {
  const safeItems = ensureArray(items);
  return safeItems.map(callback);
}

// 修复方案3: 检查并处理 propertyValues
function safePropertyIteration(propertyValues, itemName) {
  if (!propertyValues || !propertyValues[itemName]) {
    console.warn(`propertyValues[${itemName}] 不存在或为空`);
    return [];
  }
  
  return ensureArray(propertyValues[itemName]);
}

// 使用示例:
// 原来的代码:
// for (const item of propertyValues[itemName]) { ... }

// 修复后的代码:
// for (const item of safePropertyIteration(propertyValues, itemName)) { ... }

// 或者:
// const items = ensureArray(propertyValues[itemName]);
// for (const item of items) { ... }