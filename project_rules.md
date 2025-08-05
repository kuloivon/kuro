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

#### PDF Document Handling
```
PDF Input → Text Extraction → Image Extraction → Parallel Processing
├── Text Content → Main LLM Analysis
└── Images → Dedicated Vision Pipeline → Text Description → Context Integration
```

#### Markdown Processing
```
MD Input → Content Parsing → Asset Discovery → Processing Pipeline
├── Text Content → Direct Main LLM Processing
├── Embedded Images → Vision Pipeline → Text Description → Context Integration
└── References/Links → Validation & Context Extraction
```

### 4. LLM Integration Guidelines

#### Model Configuration
- **Temperature**: 0.1-0.3 for document analysis (precision focus)
- **Max Tokens**: Optimize based on document length and complexity
- **Safety Settings**: Enable for content moderation in document review
- **Response Format**: Structured JSON for programmatic processing

#### Image Processing Strategy
- **Separate Vision Pipeline**: Use dedicated multimodal models for image analysis since main LLM is text-only
- **Image Preprocessing**: Resize/optimize images for optimal vision model performance
- **Context Integration**: Combine image analysis results with text content before main LLM processing
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

##### LLM API Node Configuration Template
```json
{
  "llmConfiguration": {
    "model": "text_model_identifier",
    "parameters": {
      "temperature": 0.1,
      "maxTokens": "dynamic_based_on_content",
      "systemPrompt": "{{$json.system_context.role_prompt}}",
      "structuredOutput": true
    },
    "contextInjection": {
      "memoryRetrieval": "{{$('ContextManager').all()[0].json}}",
      "sessionContinuity": "{{$json.session_id}}",
      "promptTemplate": "predefined_template_id"
    },
    "outputProcessing": {
      "validation": "json_schema_validation",
      "memoryExtraction": "automated",
      "errorHandling": "structured_fallback"
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

#### Performance Optimization with Context Awareness
- **Parallel Processing**: Run independent tasks simultaneously while maintaining context consistency
- **Intelligent Caching**: Cache context patterns and frequent document structures
- **Batch Operations**: Group similar operations while preserving individual context
- **Context-Aware Resource Management**: Optimize API usage based on context complexity and memory requirements
- **Memory Optimization**: Implement intelligent memory pruning and consolidation strategies

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