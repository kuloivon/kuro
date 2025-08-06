# 论文写作自动化工作流系统

这是一个基于n8n构建的完整论文写作自动化系统，能够从PDF/Markdown文档中提取信息，生成论文大纲，自动完成分任务写作，进行质量检验，并最终整合成完整的学术论文。

## 🎯 系统特性

### 核心功能
- **智能文档分析**：支持PDF和Markdown文件的内容提取和结构化分析
- **知识库增强**：可选的知识库检索，提供更准确的论文大纲建议
- **自动大纲生成**：基于文档内容和学术规范生成结构化论文大纲
- **分任务并行写作**：将大纲分解为独立任务，支持批量并行处理
- **多轮质量审核**：逻辑检验、语言规范检查、一致性审核
- **智能修订循环**：基于审核反馈自动修订内容，直至达到质量标准
- **全局一致性检查**：确保各章节间逻辑连贯、术语统一
- **多格式输出**：生成Markdown、PDF、DOCX等多种格式的最终论文

### 技术特性
- **模块化架构**：每个功能独立为单独的工作流，便于维护和扩展
- **容错机制**：完善的错误处理和人工干预点
- **进度监控**：实时跟踪写作进度和质量指标
- **质量控制**：多层次的质量检验机制
- **可配置性**：支持多种LLM模型和参数调整

## 📋 系统架构

### 工作流组件

1. **主工作流** (`paper-writing-main-workflow.json`)
   - 文件上传和格式检测
   - PDF/Markdown内容提取
   - 基础信息分析和结构化
   - 生成易读的分析报告

2. **大纲生成工作流** (`paper-outline-generation-workflow.json`)
   - 知识库检索（可选）
   - 基于内容和学术规范生成大纲
   - 大纲质量检查和优化
   - 写作任务分解

3. **写作Agent工作流** (`writing-agent-workflow.json`)
   - 任务队列管理
   - 批量并行写作处理
   - 基础质量预检查
   - 进度跟踪和状态更新

4. **质量检验Agent工作流** (`quality-review-agent-workflow.json`)
   - 全面质量审核（逻辑、语言、结构等）
   - 问题识别和修改建议
   - 多轮修订管理
   - 内容批准流程

5. **最终整合工作流** (`final-assembly-workflow.json`)
   - 已批准内容收集
   - 全局一致性检查
   - 论文整合和格式统一
   - 多格式输出生成

### 数据流向

```
PDF/MD文件 → 主工作流 → 大纲生成 → 写作Agent → 质量检验 → 最终整合 → 输出论文
                ↓           ↓           ↓           ↓           ↓
            分析报告    结构化大纲    章节内容    质量报告    完整论文
```

## 🚀 快速开始

### 1. 环境准备

#### 系统要求
- n8n v1.0+ (推荐最新版本)
- Node.js 18+
- 足够的API调用配额（OpenAI或其他LLM服务）

#### 必需的n8n节点
确保以下节点已安装：
- HTTP Request
- Webhook
- Code
- If
- Switch
- Merge
- Set
- Wait

#### 可选依赖
```bash
# PDF处理
npm install pdf-parse pdf2pic

# Markdown处理  
npm install marked

# 图像处理
npm install sharp jimp

# 数据验证
npm install joi yup
```

### 2. 配置LLM服务

#### OpenAI配置
1. 获取OpenAI API密钥
2. 在n8n中创建HTTP Header Auth凭据
3. 设置Header: `Authorization: Bearer YOUR_API_KEY`

#### 其他LLM服务
系统支持任何兼容OpenAI格式的API，只需修改环境配置中的`llmApiUrl`。

### 3. 导入工作流

#### 方法一：批量导入
```bash
# 使用n8n CLI（如果可用）
n8n import --file paper-writing-main-workflow.json
n8n import --file paper-outline-generation-workflow.json
n8n import --file writing-agent-workflow.json
n8n import --file quality-review-agent-workflow.json
n8n import --file final-assembly-workflow.json
```

#### 方法二：手动导入
1. 登录n8n界面
2. 点击"Import from file"
3. 依次导入所有工作流文件
4. 确保所有节点连接正确

### 4. 配置环境变量

在每个工作流的"环境配置"节点中设置以下参数：

#### 通用配置
```json
{
  "llmApiUrl": "https://api.openai.com/v1/chat/completions",
  "llmModel": "gpt-4",
  "temperature": "0.2"
}
```

#### 工作流间通信
```json
{
  "outlineWorkflowUrl": "http://localhost:5678/webhook/outline-generation",
  "writingWorkflowUrl": "http://localhost:5678/webhook/writing-agent", 
  "reviewWorkflowUrl": "http://localhost:5678/webhook/quality-review",
  "assemblyWorkflowUrl": "http://localhost:5678/webhook/final-assembly"
}
```

#### 可选服务
```json
{
  "knowledgeBaseUrl": "http://localhost:3000/api/knowledge-search",
  "storageApiUrl": "http://localhost:3000/api/content-storage",
  "outputFormatUrl": "http://localhost:3000/api/format-output"
}
```

### 5. 激活工作流

1. 确保所有工作流都已正确配置
2. 按以下顺序激活工作流：
   - 最终整合工作流
   - 质量检验Agent工作流  
   - 写作Agent工作流
   - 大纲生成工作流
   - 主工作流

## 💡 使用指南

### 基本使用流程

1. **上传文档**
   ```bash
   curl -X POST http://localhost:5678/webhook/paper-upload-trigger \
        -F "file=@your-document.pdf" \
        -H "Content-Type: multipart/form-data"
   ```

2. **监控进度**
   - 查看n8n执行日志
   - 观察webhook通知
   - 检查各阶段输出文件

3. **获取结果**
   - 最终论文将以多种格式生成
   - 可通过文件系统或API获取

### 高级配置

#### 调整质量标准
在质量检验工作流中修改：
```json
{
  "qualityTargets": {
    "minimumOverallScore": 7.5,
    "maxCriticalIssues": 0,
    "maxMajorIssues": 1
  }
}
```

#### 配置并发任务数
在写作Agent工作流中设置：
```json
{
  "maxConcurrentTasks": "3"
}
```

#### 修改修订次数限制
```json
{
  "maxRevisionCycles": "3"
}
```

### 人工干预点

系统设计了多个人工干预点，在以下情况下会暂停等待人工确认：

1. **大纲质量不达标**：质量评分低于60%时
2. **内容修订超限**：修订次数达到上限时
3. **全局一致性问题**：发现关键逻辑问题时
4. **格式转换失败**：输出格式生成失败时

## 🔧 故障排除

### 常见问题

#### 1. LLM API调用失败
**症状**：HTTP 401/403错误
**解决方案**：
- 检查API密钥是否正确
- 确认账户有足够配额
- 验证API URL格式

#### 2. 工作流间通信失败
**症状**：Webhook调用超时
**解决方案**：
- 确认所有工作流都已激活
- 检查webhook URL配置
- 验证n8n服务状态

#### 3. PDF解析失败
**症状**：内容提取为空
**解决方案**：
- 确认PDF不是扫描版（需要OCR）
- 检查pdf-parse依赖是否正确安装
- 尝试不同的PDF文件

#### 4. 内存不足
**症状**：大文件处理失败
**解决方案**：
- 增加Node.js内存限制
- 分段处理大文件
- 优化并发任务数

### 日志分析

#### 启用详细日志
```bash
# 设置n8n日志级别
export N8N_LOG_LEVEL=debug
```

#### 关键日志位置
- 工作流执行日志：n8n界面 → Executions
- 系统错误日志：n8n服务器日志
- API调用日志：各HTTP Request节点

## 📊 性能优化

### 系统性能指标

- **处理速度**：平均10-15分钟完成5000字论文
- **并发能力**：支持3-5个任务并行处理
- **准确率**：内容质量评分通常>7.5/10
- **成功率**：>95%的文档可成功处理

### 优化建议

1. **API调用优化**
   - 使用合适的temperature设置
   - 优化prompt长度
   - 实施API调用缓存

2. **并发控制**
   - 根据硬件资源调整并发数
   - 实施负载均衡
   - 监控资源使用

3. **存储优化**
   - 使用外部数据库存储中间结果
   - 实施内容版本管理
   - 定期清理临时文件

## 🔄 扩展开发

### 添加新的文档格式支持

1. 在主工作流中添加新的格式检测
2. 创建对应的内容提取逻辑
3. 更新环境配置

### 集成新的LLM服务

1. 修改API调用格式
2. 适配响应解析逻辑
3. 更新错误处理

### 自定义质量检验规则

1. 修改质量检验Agent的评分逻辑
2. 添加特定领域的检验规则
3. 实施自定义问题分类

## 📝 版本说明

### v1.0 (当前版本)
- ✅ 基础论文写作流程
- ✅ PDF/Markdown支持
- ✅ 质量控制机制
- ✅ 多格式输出
- ✅ 错误处理和恢复

### 规划中的功能
- 🔄 多语言支持
- 🔄 图表自动生成
- 🔄 引用格式智能检查
- 🔄 协作写作支持
- 🔄 模板化论文结构

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出改进建议！

### 报告问题
1. 提供详细的错误描述
2. 包含相关的日志信息
3. 说明复现步骤

### 功能建议
1. 描述具体的使用场景
2. 说明预期的行为
3. 提供实施建议

## 📄 许可证

本项目采用MIT许可证。详见[LICENSE](LICENSE)文件。

## 🙏 致谢

感谢以下开源项目：
- [n8n](https://n8n.io/) - 工作流自动化平台
- [pdf-parse](https://github.com/modesty/pdf-parse) - PDF解析
- [marked](https://github.com/markedjs/marked) - Markdown解析

---

**注意**：使用本系统前请确保遵守相关的学术诚信规范和版权法律。AI生成的内容应当经过人工审核和验证。