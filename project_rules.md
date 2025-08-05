# Project Rules for n8n Document Workflow Development

## Core Development Principles

### 1. Workflow Design Philosophy
- **Information Accuracy First**: Every workflow must prioritize data integrity and verification
- **Human-in-the-Loop Ready**: Design workflows with optional human validation points for critical decisions
- **Modular Architecture**: Build reusable components for common document processing tasks
- **Error Resilience**: Implement comprehensive error handling and fallback mechanisms

### 2. Communication Efficiency
- **Batch Confirmations**: Group related questions into single interactions
- **Flexible Solutions**: Provide multiple viable options rather than seeking single perfect answers
- **Context Preservation**: Maintain conversation state across workflow development sessions
- **Minimal Round-trips**: Aim to resolve issues with comprehensive initial responses

## Technical Standards

### 3. File Processing Architecture

#### PDF Document Handling with Dual-LLM Architecture
```
PDF Input → Text Extraction → Image Extraction → Task Classification
├── Simple Extraction Tasks → Standard LLM Pool
│   ├── Basic Text Cleanup
│   ├── Format Standardization  
│   ├── Initial Categorization
│   └── Template Population
├── Complex Analysis Tasks → Premium LLM
│   ├── Cross-Reference Analysis
│   ├── Quality Assessment
│   ├── Strategic Synthesis
│   └── Final Validation
└── Images → Vision Pipeline → Tier-Appropriate Analysis
    ├── Basic Description → Standard LLM
    └── Complex Interpretation → Premium LLM
```

#### Markdown Processing with Intelligent Task Routing
```
MD Input → Content Parsing → Asset Discovery → Task Classification Router
├── Routine Processing → Standard LLM Pipeline
│   ├── Text Content Extraction
│   ├── Format Conversion
│   ├── Basic Validation
│   └── Template Filling
├── Complex Analysis → Premium LLM Pipeline  
│   ├── Cross-Document Comparison
│   ├── Quality Critical Decisions
│   ├── Nuanced Interpretation
│   └── Strategic Recommendations
└── Mixed Content Processing
    ├── Images → Vision Pipeline → Tier Classification
    ├── References/Links → Standard LLM Validation
    └── Context Integration → Premium LLM Synthesis
```

### 4. Dual-LLM Architecture and Task Classification

#### LLM Tier Configuration

##### Premium LLM (High-Performance, Cost-Sensitive)
```json
{
  "premiumLLM": {
    "model": "advanced_model_identifier",
    "characteristics": {
      "reasoning": "complex_analysis_capable",
      "context_window": "large_context_support",
      "accuracy": "high_precision_output",
      "cost": "usage_based_billing"
    },
    "configuration": {
      "temperature": 0.1,
      "maxTokens": "dynamic_optimization",
      "responseFormat": "structured_json",
      "systemPrompt": "detailed_context_injection"
    },
    "usage_optimization": {
      "callMinimization": true,
      "batchProcessing": "when_possible",
      "caching": "aggressive_caching",
      "preprocessing": "essential_content_only"
    }
  }
}
```

##### Standard LLM (Efficient, Cost-Effective)
```json
{
  "standardLLM": {
    "model": "standard_model_identifier",
    "characteristics": {
      "reasoning": "straightforward_tasks",
      "context_window": "moderate_context",
      "accuracy": "sufficient_for_simple_tasks",
      "cost": "free_or_low_cost"
    },
    "configuration": {
      "temperature": 0.2,
      "maxTokens": "task_appropriate",
      "responseFormat": "structured_json",
      "systemPrompt": "focused_task_context"
    },
    "usage_strategy": {
      "highVolume": true,
      "preprocessing": "standard_preparation",
      "parallelization": "extensive_parallel_use"
    }
  }
}
```

#### Task Classification Framework

##### Complexity Assessment Matrix
```json
{
  "taskClassification": {
    "premium_tier_tasks": {
      "criteria": [
        "complex_reasoning_required",
        "cross_document_analysis",
        "nuanced_interpretation",
        "quality_critical_decisions",
        "ambiguity_resolution",
        "strategic_synthesis"
      ],
      "examples": [
        "comprehensive_document_comparison",
        "complex_information_validation",
        "final_quality_assessment",
        "contradiction_resolution",
        "strategic_recommendation_generation"
      ]
    },
    "standard_tier_tasks": {
      "criteria": [
        "straightforward_extraction",
        "format_conversion",
        "simple_classification",
        "basic_validation",
        "routine_processing",
        "template_population"
      ],
      "examples": [
        "text_extraction_from_pdf",
        "basic_formatting_cleanup",
        "simple_data_validation",
        "routine_categorization",
        "standard_template_filling",
        "basic_summarization"
      ]
    }
  }
}
```

##### Automatic Task Router Configuration
```javascript
// Task Classification and Routing Logic
function classifyTask(taskData) {
  const complexityIndicators = {
    crossReferenceRequired: taskData.sourceCount > 1,
    ambiguityPresent: taskData.uncertaintyMarkers?.length > 0,
    qualityCritical: taskData.stakes === 'high',
    reasoningDepth: taskData.analysisType === 'complex',
    contextDependency: taskData.contextRequirement === 'extensive',
    synthesisRequired: taskData.outputType === 'strategic'
  };
  
  const complexityScore = Object.values(complexityIndicators)
    .filter(Boolean).length;
  
  return {
    tier: complexityScore >= 3 ? 'premium' : 'standard',
    reasoning: complexityIndicators,
    confidence: complexityScore >= 5 ? 'high' : 
                complexityScore >= 2 ? 'medium' : 'low'
  };
}
```

#### Task Decomposition Strategies

##### Complex Task Breakdown Pattern
```
Original Complex Task
├── Information Extraction (Standard LLM)
│   ├── Text extraction from sources
│   ├── Basic data validation
│   └── Initial categorization
├── Preprocessing (Standard LLM)
│   ├── Format standardization
│   ├── Content organization
│   └── Reference preparation
└── Analysis & Synthesis (Premium LLM)
    ├── Cross-reference analysis
    ├── Quality assessment
    ├── Strategic synthesis
    └── Final recommendations
```

##### Decomposition Implementation
```json
{
  "taskDecomposition": {
    "preprocessing_phase": {
      "llm_tier": "standard",
      "tasks": [
        "content_extraction",
        "basic_cleanup",
        "format_standardization",
        "initial_categorization"
      ],
      "output_preparation": "structured_data_for_premium_analysis"
    },
    "analysis_phase": {
      "llm_tier": "premium",
      "tasks": [
        "complex_reasoning",
        "cross_document_analysis",
        "quality_validation",
        "synthesis_generation"
      ],
      "input_optimization": "preprocessed_and_focused_content"
    },
    "post_processing": {
      "llm_tier": "standard",
      "tasks": [
        "format_finalization",
        "template_population",
        "routine_validation",
        "output_formatting"
      ]
    }
  }
}
```

#### Cost-Optimized Workflow Design

##### Premium LLM Call Optimization
- **Content Preprocessing**: Use Standard LLM to clean and prepare content
- **Context Distillation**: Extract only essential information for Premium analysis
- **Batch Processing**: Combine multiple simple analyses into single Premium calls
- **Result Caching**: Cache Premium LLM results for similar future tasks
- **Iterative Refinement**: Use Standard LLM for draft iterations, Premium for final polish

##### Standard LLM Maximization
- **High-Volume Processing**: Handle bulk extraction and formatting tasks
- **Parallel Execution**: Run multiple Standard LLM tasks simultaneously
- **Iterative Processing**: Use for multiple draft iterations before Premium review
- **Template-Based Tasks**: Handle routine, template-driven operations

#### Image Processing Strategy
- **Separate Vision Pipeline**: Use dedicated multimodal models for image analysis since main LLMs are text-only
- **Image Preprocessing**: Resize/optimize images for optimal vision model performance
- **Dual-Tier Image Analysis**:
  - **Standard Tier**: Basic image description and text extraction
  - **Premium Tier**: Complex visual analysis and contextual interpretation
- **Vision-to-Text Bridge**: Convert visual information to structured text descriptions for main LLM consumption

### 5. Workflow Component Standards

#### Required Modules for Document Workflows
1. **Input Validation Node**
   - File type verification
   - Size limits enforcement
   - Security scanning

2. **Content Extraction Pipeline**
   - PDF text extraction (OCR fallback)
   - Image extraction and cataloging
   - Metadata preservation

3. **Quality Assurance Gates**
   - Content completeness checks
   - Information accuracy validation
   - Cross-reference verification

4. **Human Review Integration**
   - Configurable approval points
   - Review queue management
   - Feedback incorporation mechanisms

5. **Output Standardization**
   - Consistent formatting
   - Version control integration
   - Change tracking

## Development Workflow

### 6. Rapid Development Process

#### Initial Setup Checklist
- [ ] Define document types and expected inputs
- [ ] Identify critical accuracy requirements
- [ ] Determine human review points
- [ ] Map information flow dependencies
- [ ] Establish output format requirements

#### Iterative Development Cycle
1. **Prototype Core Flow** (30% functionality)
2. **Add Error Handling** (60% functionality)
3. **Integrate Quality Gates** (80% functionality)
4. **Optimize Performance** (95% functionality)
5. **User Acceptance Testing** (100% functionality)

### 7. Context Engineering and Memory Management

#### Structured Input/Output Framework for LLM Modules

##### Universal LLM Node Input Structure
```json
{
  "system_context": {
    "role": "document_analyst|quality_checker|content_reviewer",
    "task_type": "extraction|comparison|validation|synthesis",
    "workflow_stage": "initial|intermediate|final",
    "session_id": "unique_session_identifier"
  },
  "memory_context": {
    "short_term": {
      "current_document": {
        "type": "pdf|markdown|mixed",
        "metadata": {},
        "previous_extractions": []
      },
      "immediate_history": "last_3_interactions",
      "current_findings": []
    },
    "long_term": {
      "workflow_patterns": "learned_document_structures",
      "quality_standards": "established_validation_criteria",
      "user_preferences": "customization_settings",
      "error_patterns": "common_issues_and_solutions"
    }
  },
  "task_specification": {
    "primary_objective": "clear_task_description",
    "output_format": "structured_format_requirements",
    "quality_criteria": "validation_requirements",
    "constraints": "limitations_and_boundaries"
  },
  "content_payload": "actual_content_to_process"
}
```

##### Standard LLM Output Structure
```json
{
  "response_metadata": {
    "task_completed": true|false,
    "confidence_level": 0.0-1.0,
    "processing_time": "timestamp",
    "session_id": "matching_input_session"
  },
  "memory_updates": {
    "short_term_additions": {
      "key_findings": [],
      "identified_patterns": [],
      "quality_issues": []
    },
    "long_term_learning": {
      "pattern_updates": [],
      "preference_refinements": [],
      "error_corrections": []
    }
  },
  "primary_output": {
    "structured_result": "main_task_output",
    "supporting_evidence": [],
    "uncertainty_indicators": []
  },
  "next_step_guidance": {
    "recommended_actions": [],
    "required_validations": [],
    "human_review_triggers": []
  }
}
```

#### Context-Aware Prompt Engineering

##### Document Processing Prompt Template
```
# SYSTEM CONTEXT
Role: {system_context.role}
Task: {system_context.task_type} 
Workflow Stage: {system_context.workflow_stage}
Session: {system_context.session_id}

# MEMORY INTEGRATION
## Short-term Context:
- Current Document Type: {memory_context.short_term.current_document.type}
- Previous Findings: {memory_context.short_term.previous_extractions}
- Immediate History: {memory_context.short_term.immediate_history}

## Long-term Patterns:
- Established Quality Standards: {memory_context.long_term.quality_standards}
- Known Error Patterns: {memory_context.long_term.error_patterns}
- User Preferences: {memory_context.long_term.user_preferences}

# TASK SPECIFICATION
Objective: {task_specification.primary_objective}
Required Output Format: {task_specification.output_format}
Quality Criteria: {task_specification.quality_criteria}
Constraints: {task_specification.constraints}

# CONTENT TO PROCESS
{content_payload}

# RESPONSE REQUIREMENTS
1. Maintain consistency with established patterns from long-term memory
2. Update short-term context with new findings
3. Identify any deviations from quality standards
4. Provide confidence assessment for all conclusions
5. Flag items requiring human review based on established criteria
6. Structure output according to the specified JSON format

# OUTPUT STRUCTURE ENFORCEMENT
Respond ONLY in the specified JSON format. Ensure all metadata fields are populated.
```

#### Memory Management Strategies

##### Short-term Memory (Session-based)
- **Current Document State**: Track processing progress and intermediate results
- **Immediate History**: Maintain last 3-5 interactions for context continuity
- **Active Findings**: Accumulate discoveries within current workflow session
- **Quality Flags**: Track validation issues and resolution status

##### Long-term Memory (Persistent)
- **Document Patterns**: Learn common structures and layouts across document types
- **Quality Baselines**: Establish and refine accuracy standards over time
- **User Behavior**: Adapt to user preferences and feedback patterns
- **Error Intelligence**: Build knowledge base of common issues and solutions

#### Information Comparison Workflows with Context
```
Source Document A → Context-Aware Extraction → Memory-Enhanced Comparison
                  ↓                            ↗                      ↘
              Memory Update              Structured Analysis → Quality Validation
                  ↓                            ↗                      ↘
Source Document B → Context-Aware Extraction →                Generate Report
                  ↓                                                    ↓
              Memory Update ← Pattern Learning ← Human Review (Optional)
```

#### Context Continuity Patterns

##### Multi-Document Processing
```json
{
  "workflow_memory": {
    "document_series": [
      {
        "doc_id": "unique_identifier",
        "processing_timestamp": "ISO_datetime",
        "key_findings": [],
        "cross_references": []
      }
    ],
    "comparison_results": [],
    "accumulated_insights": []
  }
}
```

##### Iterative Refinement Protocol
1. **Initial Processing**: Establish baseline context and quality standards
2. **Pattern Recognition**: Identify recurring themes and structures
3. **Quality Calibration**: Adjust validation criteria based on feedback
4. **Context Optimization**: Refine prompt templates for improved accuracy
5. **Memory Consolidation**: Merge short-term findings into long-term knowledge

### 8. Quality Assurance Framework

#### Automated Validation
- **Fact Checking**: Cross-reference claims against reliable sources
- **Consistency Verification**: Ensure internal document coherence
- **Format Compliance**: Validate output against style guidelines
- **Completeness Assessment**: Verify all required sections are present

#### Human-in-the-Loop Triggers
- **High Stakes Decisions**: Financial, legal, or safety-critical content
- **Conflicting Information**: When sources provide contradictory data
- **Low Confidence Scores**: When AI analysis uncertainty is high
- **User-Defined Criteria**: Custom business rules for review requirements

## Implementation Guidelines

### 9. Node Configuration Standards

#### LLM Node Context Engineering Configuration

##### Context Management Node Setup
```json
{
  "contextManager": {
    "memoryStorage": {
      "shortTerm": {
        "provider": "workflow_variables|external_db",
        "retention": "session_based",
        "maxSize": "10MB",
        "structure": "structured_json"
      },
      "longTerm": {
        "provider": "database|file_system",
        "retention": "persistent",
        "indexing": "searchable",
        "backup": "automated"
      }
    },
    "sessionManagement": {
      "idGeneration": "uuid_v4",
      "timeout": "30_minutes",
      "cleanup": "automatic",
      "continuity": "cross_workflow"
    }
  }
}
```

##### Dual-LLM Node Configuration Templates

###### Task Router Node
```javascript
// Intelligent Task Classification Node
const taskData = items[0].json;

function classifyTaskComplexity(task) {
  const indicators = {
    multiDocument: (task.sources?.length || 1) > 1,
    ambiguityPresent: task.content?.includes('unclear') || task.uncertainties?.length > 0,
    crossReference: task.requiresComparison === true,
    qualityCritical: task.priority === 'high' || task.stakes === 'critical',
    complexReasoning: task.analysisType === 'complex' || task.reasoning === 'advanced',
    synthesis: task.outputType === 'strategic' || task.requiresSynthesis === true,
    contextHeavy: (task.context?.length || 0) > 1000,
    nuancedInterpretation: task.requiresNuance === true
  };
  
  const complexity = Object.values(indicators).filter(Boolean).length;
  
  return {
    tier: complexity >= 3 ? 'premium' : 'standard',
    score: complexity,
    indicators: indicators,
    routing: {
      llmModel: complexity >= 3 ? 'premium_model' : 'standard_model',
      preprocessing: complexity >= 3 ? 'essential_only' : 'standard',
      caching: complexity >= 3 ? 'aggressive' : 'normal'
    }
  };
}

const classification = classifyTaskComplexity(taskData);
return [{ json: { ...taskData, classification } }];
```

###### Premium LLM Node Configuration
```json
{
  "premiumLLMConfiguration": {
    "model": "{{$json.classification.routing.llmModel}}",
    "parameters": {
      "temperature": 0.1,
      "maxTokens": "{{$json.content.length > 2000 ? 'large' : 'medium'}}",
      "systemPrompt": "{{$json.system_context.premium_role_prompt}}",
      "structuredOutput": true
    },
    "costOptimization": {
      "preprocessedInput": "{{$('ContentDistiller').all()[0].json.essentialContent}}",
      "batchingEnabled": true,
      "cachingStrategy": "aggressive",
      "retryLogic": "minimal_retries"
    },
    "contextInjection": {
      "memoryRetrieval": "{{$('ContextManager').all()[0].json.longTerm}}",
      "preprocessedData": "{{$('StandardLLM_Preprocessor').all()[0].json}}",
      "sessionContinuity": "{{$json.session_id}}"
    }
  }
}
```

###### Standard LLM Node Configuration
```json
{
  "standardLLMConfiguration": {
    "model": "{{$json.classification.routing.llmModel}}",
    "parameters": {
      "temperature": 0.2,
      "maxTokens": "standard",
      "systemPrompt": "{{$json.system_context.standard_role_prompt}}",
      "structuredOutput": true
    },
    "volumeOptimization": {
      "parallelProcessing": true,
      "batchSize": "large",
      "rapidIteration": true,
      "standardCaching": true
    },
    "taskFocus": {
      "extractionTasks": "high_volume",
      "formattingTasks": "automated",
      "basicValidation": "enabled",
      "preprocessing": "comprehensive"
    }
  }
}
```

##### Context-Aware Code Node Pattern
```javascript
// Context Preparation Node
const contextData = {
  system_context: {
    role: items[0].json.workflow_role || 'document_analyst',
    task_type: items[0].json.current_task || 'extraction',
    workflow_stage: items[0].json.stage || 'initial',
    session_id: items[0].json.session_id || $('Generate_Session_ID').all()[0].json.uuid
  },
  memory_context: {
    short_term: $('Retrieve_Short_Term_Memory').all()[0]?.json || {},
    long_term: $('Retrieve_Long_Term_Memory').all()[0]?.json || {}
  },
  task_specification: items[0].json.task_spec,
  content_payload: items[0].json.content
};

return [{ json: contextData }];
```

##### Memory Update Processing Node
```javascript
// Memory Processing and Update Node
const response = items[0].json;
const sessionId = response.response_metadata.session_id;

// Extract memory updates
const shortTermUpdates = response.memory_updates.short_term_additions;
const longTermUpdates = response.memory_updates.long_term_learning;

// Prepare memory storage updates
const memoryOperations = [
  {
    operation: 'update_short_term',
    session_id: sessionId,
    data: shortTermUpdates,
    timestamp: new Date().toISOString()
  },
  {
    operation: 'merge_long_term',
    pattern_updates: longTermUpdates.pattern_updates,
    preferences: longTermUpdates.preference_refinements,
    error_patterns: longTermUpdates.error_corrections
  }
];

return memoryOperations.map(op => ({ json: op }));
```

#### Error Handling Patterns
```json
{
  "errorHandling": {
    "retryAttempts": 3,
    "fallbackBehavior": "human_review",
    "logLevel": "detailed",
    "notificationChannels": ["email", "webhook"],
    "contextPreservation": {
      "saveState": true,
      "memoryBackup": "automatic",
      "sessionContinuity": "maintained"
    }
  }
}
```

#### Dual-LLM Workflow Design Patterns

##### Standard-to-Premium Pipeline
```
Input Document
↓
Standard LLM: Content Extraction & Cleanup
↓
Standard LLM: Initial Categorization & Formatting
↓
Content Distillation & Context Preparation
↓
Premium LLM: Complex Analysis & Synthesis
↓
Standard LLM: Final Formatting & Template Population
↓
Output Document
```

##### Parallel Processing with Intelligent Routing
```
Input Tasks
↓
Task Classification Router
├── Simple Tasks → Standard LLM Pool (Parallel)
│   ├── Text Extraction
│   ├── Format Conversion  
│   ├── Basic Validation
│   └── Template Filling
└── Complex Tasks → Premium LLM (Sequential)
    ├── Cross-Document Analysis
    ├── Quality Assessment
    ├── Strategic Synthesis
    └── Final Recommendations
↓
Results Merger & Quality Gate
↓
Unified Output
```

##### Cost-Optimized Iterative Refinement
```
Draft Generation (Standard LLM)
↓
Quality Check (Automated Rules)
├── Pass → Standard LLM Final Polish
└── Fail → Premium LLM Review & Enhancement
    ↓
    Premium Analysis Results
    ↓
    Standard LLM Implementation of Changes
```

#### Performance Optimization with Dual-LLM Architecture
- **Intelligent Task Distribution**: Route complex reasoning to Premium LLM, routine tasks to Standard LLM
- **Context-Aware Preprocessing**: Use Standard LLM to prepare optimized inputs for Premium LLM
- **Aggressive Caching**: Cache Premium LLM results extensively, Standard LLM moderately
- **Parallel Standard Processing**: Run multiple Standard LLM tasks simultaneously
- **Premium Call Minimization**: Batch multiple analyses, use only for critical decisions
- **Memory Optimization**: Implement tier-appropriate memory strategies for each LLM type

### 10. Development Environment Setup

#### Required n8n Nodes
- **Core Nodes**: HTTP Request, Set, IF, Switch, Merge
- **File Handling**: Read/Write Binary Data, PDF Parse, Spreadsheet File, Extract From File
- **AI Integration**: HTTP Request (for main LLM API), Vision API nodes (for image processing)
- **Utilities**: Code, Function, DateTime, Crypto
- **Document Processing**: Markdown, HTML, Convert to File

#### External Dependencies
- **PDF Processing**: pdf-parse, pdf2pic for image extraction
- **Image Handling**: Sharp, Jimp for preprocessing
- **Validation Libraries**: Joi, Yup for data validation
- **Documentation**: JSDoc for inline documentation

#### n8n Workflow JSON Format Standards

##### Basic Workflow Structure
```json
{
  "name": "Workflow Name",
  "nodes": [
    {
      "parameters": {},
      "id": "unique-node-id",
      "name": "Node Display Name",
      "type": "NodeType",
      "typeVersion": 1,
      "position": [x, y]
    }
  ],
  "connections": {
    "Node Name": {
      "main": [
        [
          {
            "node": "Target Node Name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {},
  "versionId": "workflow-version-id",
  "meta": {
    "templateCredsSetupCompleted": true
  }
}
```

##### Node Configuration Requirements
- **Unique IDs**: Each node must have a unique UUID-style identifier
- **Position Coordinates**: Visual positioning for workflow canvas [x, y]
- **Type Versioning**: Specify node type version for compatibility
- **Parameter Validation**: All required parameters must be present
- **Connection Mapping**: Precise node-to-node connection definitions

##### Import/Export Best Practices
- **Credential Handling**: Remove sensitive credentials before export
- **Environment Variables**: Use placeholder values for environment-specific settings
- **Version Compatibility**: Test workflows across different n8n versions
- **Documentation**: Include workflow description and setup instructions
- **Validation**: Verify JSON structure before import attempts

### 11. Testing and Validation

#### Test Data Management
- **Sample Documents**: Maintain library of test PDFs and Markdown files
- **Edge Cases**: Include corrupted, oversized, and unusual format files
- **Reference Outputs**: Golden standard results for comparison
- **Performance Benchmarks**: Response time and accuracy metrics

#### Validation Checklist
- [ ] Input validation handles all expected file types
- [ ] Image extraction preserves quality and context
- [ ] Text extraction maintains formatting where relevant
- [ ] Vision pipeline converts images to meaningful text descriptions
- [ ] Main LLM integration handles API errors gracefully
- [ ] Context integration between vision and text works seamlessly
- [ ] **Context Engineering Validation**:
  - [ ] All LLM nodes use structured input/output format
  - [ ] Session management maintains continuity across workflow steps
  - [ ] Short-term memory correctly tracks current processing state
  - [ ] Long-term memory accumulates and applies learned patterns
  - [ ] Prompt templates include proper context injection points
  - [ ] Memory updates are extracted and stored from LLM responses
  - [ ] Context consistency maintained across parallel processing paths
- [ ] Human review points are clearly marked and functional
- [ ] Output formatting meets specification requirements
- [ ] Error messages are informative and actionable
- [ ] **Memory Management Verification**:
  - [ ] Session IDs are properly generated and tracked
  - [ ] Memory storage and retrieval mechanisms function correctly
  - [ ] Context data is properly cleaned and optimized
  - [ ] Memory backup and recovery procedures are tested
- [ ] **Dual-LLM Architecture Validation**:
  - [ ] Task classification router correctly identifies complexity levels
  - [ ] Premium LLM is used only for high-complexity tasks
  - [ ] Standard LLM handles volume processing efficiently
  - [ ] Cost optimization strategies are properly implemented
  - [ ] Task decomposition follows established patterns
  - [ ] Results from both LLM tiers integrate seamlessly
  - [ ] Premium LLM call frequency is minimized and optimized
  - [ ] Standard LLM preprocessing effectively prepares content for Premium analysis

## Collaboration Guidelines

### 12. Development Communication

#### When to Ask Questions
- **Ambiguous Requirements**: When multiple interpretations are possible
- **Technical Constraints**: When facing platform or API limitations
- **User Experience Decisions**: When UX choices impact workflow design
- **Performance Trade-offs**: When optimization requires feature compromises

#### When to Provide Options
- **Implementation Approaches**: Multiple valid technical solutions
- **UI/UX Variations**: Different user interaction patterns
- **Integration Methods**: Various ways to connect external services
- **Validation Strategies**: Different levels of quality assurance

### 13. Documentation Standards

#### Workflow Documentation
- **Purpose Statement**: Clear description of workflow objectives
- **Input/Output Specifications**: Detailed format requirements
- **Decision Points**: Logic for branching and conditional flows
- **Dependencies**: External services and data requirements
- **Maintenance Notes**: Update procedures and troubleshooting

#### Code Comments
- **Node Descriptions**: Explain complex logic in custom code nodes
- **API Configurations**: Document endpoint URLs and authentication
- **Variable Usage**: Clarify data transformations and mappings
- **Performance Notes**: Explain optimization decisions

### 15. Workflow Template Management

#### Template Organization Standards
- **Naming Convention**: `[Category]_[Purpose]_[Version].json`
  - Example: `Document_PDF_Analysis_v1.2.json`
- **Category System**: Group templates by function (Document, Vision, QA, Integration)
- **Version Control**: Semantic versioning for template iterations
- **Description Standard**: Clear, concise workflow purpose and requirements

#### Template Library Structure
```
templates/
├── document-processing/
│   ├── pdf-extraction/
│   ├── markdown-processing/
│   └── image-text-integration/
├── quality-assurance/
│   ├── human-review/
│   ├── validation-gates/
│   └── approval-workflows/
├── ai-integration/
│   ├── text-llm/
│   ├── vision-processing/
│   └── context-integration/
└── utilities/
    ├── error-handling/
    ├── data-transformation/
    └── notification-systems/
```

#### Import/Export Workflow
1. **Pre-Export Checklist**
   - Remove or replace sensitive credentials with placeholders
   - Document required external dependencies
   - Include setup instructions in workflow description
   - Validate all node connections and parameters

2. **Template Documentation**
   - Purpose and use case description
   - Required credentials and API keys
   - Setup and configuration steps
   - Expected input/output formats
   - Known limitations and considerations

3. **Import Validation Process**
   - JSON structure verification
   - Node compatibility check
   - Credential requirement review
   - Test execution with sample data

#### Sharing and Collaboration
- **Internal Repository**: Maintain organization-specific template library
- **Community Sharing**: Contribute to n8n community template marketplace
- **Documentation Standards**: Include README files with each template
- **Change Management**: Track template modifications and improvements

## Continuous Improvement

### 16. Monitoring and Optimization

#### Key Metrics
- **Accuracy Rate**: Percentage of correct document analysis
- **Processing Time**: Average workflow completion duration
- **Error Frequency**: Rate of failures and their categories
- **User Satisfaction**: Feedback on output quality and usefulness

#### Regular Review Schedule
- **Weekly**: Performance metrics and error analysis
- **Monthly**: User feedback incorporation and feature updates
- **Quarterly**: Workflow architecture review and optimization
- **Annually**: Technology stack evaluation and upgrade planning

---

*Last Updated: [Current Date]*
*Version: 1.0*
*Next Review: [Quarterly Review Date]*