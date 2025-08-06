# n8n工作流错误修复指南

## 错误：`propertyValues[itemName] is not iterable`

### 🔍 问题诊断

这个错误通常出现在以下情况：

1. **数据类型不匹配**：期望数组但得到字符串、对象或null
2. **数据结构异常**：上游节点返回的数据格式不符合预期
3. **变量未定义**：propertyValues或itemName未正确初始化
4. **JSON解析问题**：字符串未正确转换为对象

### 🛠️ 修复方案

#### 方案1：在所有Code节点开头添加安全检查

```javascript
// === 错误预防代码 - 添加到每个Code节点的开头 ===

// 安全的数组确保函数
function ensureArray(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === null || value === undefined) {
    return [];
  }
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

// 安全的对象属性访问
function safeGet(obj, path, defaultValue = []) {
  try {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined || result === null) {
        return defaultValue;
      }
    }
    return ensureArray(result);
  } catch {
    return defaultValue;
  }
}

// 安全的输入数据处理
function safeInputAll() {
  try {
    const input = $input.all();
    return Array.isArray(input) ? input : [input];
  } catch {
    return [];
  }
}

// === 使用修复后的代码 ===

// 原来的代码：
// for (const item of $input.all()) { ... }

// 修复后的代码：
for (const item of safeInputAll()) {
  // 确保item.json存在
  if (!item.json) {
    item.json = {};
  }
  
  // 你的原始逻辑...
}
```

#### 方案2：修复特定工作流中的常见问题

##### 主工作流 - PDF内容提取节点
```javascript
// PDF内容提取 - 修复版本
const pdfParse = require('pdf-parse');
const fs = require('fs');

for (const item of safeInputAll()) {
  try {
    // 确保二进制数据存在
    if (!item.binary?.data) {
      throw new Error('未找到文件数据');
    }
    
    const fileBuffer = Buffer.from(item.binary.data, 'base64');
    const pdfData = await pdfParse(fileBuffer);
    
    // 安全的文本提取
    const extractedText = pdfData.text || '';
    const pageCount = pdfData.numpages || 0;
    
    // 安全的标题提取
    const titleMatch = extractedText.match(/^(.{1,100})/m);
    const title = titleMatch ? titleMatch[1].trim() : '未识别标题';
    
    // 安全的分段处理
    const paragraphs = extractedText
      ? extractedText
          .split('\n\n')
          .filter(p => p && p.trim().length > 50)
          .map(p => p.replace(/\s+/g, ' ').trim())
      : [];
    
    item.json = {
      fileType: 'pdf',
      originalFileName: item.json?.filename || 'unknown.pdf',
      title: title,
      fullText: extractedText,
      paragraphs: paragraphs,
      pageCount: pageCount,
      wordCount: extractedText ? extractedText.split(/\s+/).length : 0,
      extractedAt: new Date().toISOString(),
      processingStage: 'text_extracted'
    };
    
    item.binary.originalFile = item.binary.data;
    
  } catch (error) {
    item.json = {
      error: 'PDF解析失败',
      errorMessage: error.message,
      processingStage: 'extraction_failed'
    };
  }
}

return safeInputAll();
```

##### 写作Agent工作流 - 任务队列初始化节点
```javascript
// 任务队列初始化 - 修复版本
for (const item of safeInputAll()) {
  try {
    const outlineData = item.json?.outlineData || {};
    const writingTasks = ensureArray(outlineData.writingTasks);
    
    // 安全的任务排序
    const sortedTasks = writingTasks.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      const priorityDiff = (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
      if (priorityDiff !== 0) return priorityDiff;
      
      return (a.chapter || 0) - (b.chapter || 0);
    });
    
    // 安全的批次处理
    const maxConcurrent = parseInt($('环境配置')?.item?.json?.maxConcurrentTasks || '3');
    const taskBatches = [];
    
    for (let i = 0; i < sortedTasks.length; i += maxConcurrent) {
      const batch = sortedTasks.slice(i, i + maxConcurrent);
      taskBatches.push({
        batchId: Math.floor(i / maxConcurrent) + 1,
        tasks: batch,
        status: 'pending'
      });
    }
    
    item.json = {
      outlineData: outlineData,
      taskManagement: {
        totalTasks: writingTasks.length,
        totalBatches: taskBatches.length,
        currentBatch: 1,
        completedTasks: 0,
        failedTasks: 0
      },
      taskBatches: taskBatches,
      processingStage: 'task_initialization',
      startedAt: new Date().toISOString()
    };
  } catch (error) {
    item.json = {
      error: '任务初始化失败',
      errorMessage: error.message,
      processingStage: 'initialization_failed'
    };
  }
}

return safeInputAll();
```

#### 方案3：通用错误处理模板

```javascript
// === 通用错误处理模板 ===
// 将此模板添加到所有Code节点的开头

try {
  // 输入数据验证
  const inputItems = safeInputAll();
  
  if (inputItems.length === 0) {
    console.warn('警告：没有输入数据');
    return [{ json: { error: '没有输入数据', processingStage: 'no_input' } }];
  }
  
  // 处理每个输入项
  const results = [];
  
  for (const item of inputItems) {
    try {
      // 确保基本结构存在
      if (!item.json) {
        item.json = {};
      }
      
      // === 在这里添加你的原始处理逻辑 ===
      
      // 示例处理逻辑
      const processedData = {
        ...item.json,
        processedAt: new Date().toISOString(),
        processingStage: 'completed'
      };
      
      results.push({ json: processedData, binary: item.binary });
      
    } catch (itemError) {
      console.error('处理单个项目时出错:', itemError);
      results.push({
        json: {
          error: '项目处理失败',
          errorMessage: itemError.message,
          originalData: item.json,
          processingStage: 'item_failed'
        }
      });
    }
  }
  
  return results;
  
} catch (globalError) {
  console.error('全局错误:', globalError);
  return [{
    json: {
      error: '处理失败',
      errorMessage: globalError.message,
      processingStage: 'global_failed'
    }
  }];
}
```

### 🔧 具体修复步骤

1. **识别出错节点**：
   - 查看n8n执行日志
   - 找到报错的具体节点名称

2. **添加调试代码**：
   ```javascript
   console.log('输入数据:', JSON.stringify($input.all(), null, 2));
   ```

3. **应用安全函数**：
   - 将所有的 `for (const item of $input.all())` 替换为 `for (const item of safeInputAll())`
   - 将所有的数组操作包装在 `ensureArray()` 中

4. **测试验证**：
   - 上传测试文件
   - 观察执行日志
   - 确认错误已解决

### 📋 检查清单

- [ ] 所有Code节点都添加了安全函数
- [ ] 所有数组迭代都使用了安全检查
- [ ] 所有属性访问都添加了可选链操作符(`?.`)
- [ ] 添加了适当的错误处理和日志记录
- [ ] 测试了边界情况（空文件、格式错误等）

### 🚨 预防措施

1. **数据验证**：在每个节点开始时验证输入数据格式
2. **类型检查**：使用 `typeof` 和 `Array.isArray()` 检查数据类型
3. **默认值**：为所有可能为空的变量提供默认值
4. **错误边界**：在关键操作周围添加try-catch块
5. **日志记录**：添加详细的日志以便调试

按照这些修复方案，你的n8n工作流应该能够稳定运行，避免 `propertyValues[itemName] is not iterable` 错误。