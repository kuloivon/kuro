// ============================================
// n8n工作流快速错误修复脚本
// 直接复制此代码到出错的Code节点中
// ============================================

// 1. 安全函数定义（必须在代码开头）
function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return [value];
    }
  }
  return [value];
}

function safeInputAll() {
  try {
    const input = $input.all();
    return Array.isArray(input) ? input : [input];
  } catch {
    return [];
  }
}

function safeGet(obj, path, defaultValue = null) {
  try {
    const keys = Array.isArray(path) ? path : path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined || result === null) {
        return defaultValue;
      }
    }
    return result;
  } catch {
    return defaultValue;
  }
}

// 2. 开始安全的主处理逻辑
try {
  console.log('=== 开始处理，输入数据检查 ===');
  
  const inputItems = safeInputAll();
  console.log('输入项目数量:', inputItems.length);
  
  if (inputItems.length === 0) {
    console.warn('警告：没有输入数据');
    return [{ 
      json: { 
        error: '没有输入数据', 
        processingStage: 'no_input',
        timestamp: new Date().toISOString()
      } 
    }];
  }

  const results = [];

  // 3. 安全地处理每个输入项
  for (let i = 0; i < inputItems.length; i++) {
    const item = inputItems[i];
    console.log(`处理第 ${i + 1} 个项目...`);
    
    try {
      // 确保基本结构存在
      if (!item) {
        console.warn(`项目 ${i + 1} 为空，跳过`);
        continue;
      }
      
      if (!item.json) {
        item.json = {};
        console.log(`项目 ${i + 1} 的json属性不存在，已初始化`);
      }

      // ============================================
      // 在这里添加你的原始处理逻辑
      // 用以下模式替换可能出错的代码：
      // ============================================
      
      /* 
      示例替换：
      
      原始代码：
      for (const task of outlineData.writingTasks) { ... }
      
      修复后：
      const writingTasks = ensureArray(safeGet(outlineData, 'writingTasks', []));
      for (const task of writingTasks) { ... }
      
      原始代码：
      item.json.someArray.forEach(...)
      
      修复后：
      const someArray = ensureArray(safeGet(item.json, 'someArray', []));
      someArray.forEach(...)
      */

      // 示例：安全的数据处理
      const processedData = {
        ...item.json,
        processedAt: new Date().toISOString(),
        processingStage: 'completed',
        processingIndex: i + 1
      };

      results.push({ 
        json: processedData, 
        binary: item.binary || {} 
      });
      
      console.log(`项目 ${i + 1} 处理成功`);

    } catch (itemError) {
      console.error(`处理项目 ${i + 1} 时出错:`, itemError.message);
      
      // 添加错误项目到结果中，而不是中断整个流程
      results.push({
        json: {
          error: '项目处理失败',
          errorMessage: itemError.message,
          errorStack: itemError.stack,
          originalData: item?.json || {},
          processingStage: 'item_failed',
          processingIndex: i + 1,
          timestamp: new Date().toISOString()
        },
        binary: item?.binary || {}
      });
    }
  }

  console.log(`=== 处理完成，成功处理 ${results.length} 个项目 ===`);
  return results;

} catch (globalError) {
  console.error('全局处理错误:', globalError.message);
  console.error('错误堆栈:', globalError.stack);
  
  return [{
    json: {
      error: '全局处理失败',
      errorMessage: globalError.message,
      errorStack: globalError.stack,
      processingStage: 'global_failed',
      timestamp: new Date().toISOString(),
      debugInfo: {
        inputType: typeof $input,
        inputData: JSON.stringify($input, null, 2).substring(0, 1000)
      }
    }
  }];
}

// ============================================
// 使用说明：
// 1. 复制上面的整个代码
// 2. 粘贴到出错的Code节点中
// 3. 在"在这里添加你的原始处理逻辑"部分添加你的代码
// 4. 使用提供的安全函数替换可能出错的操作
// 5. 保存并测试工作流
// ============================================