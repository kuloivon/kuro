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

### 7. Context Engineering Best Practices

#### Prompt Engineering for Document Tasks
- **Task-Specific Prompts**: Customize prompts for different document types
- **Chain-of-Thought**: Use structured reasoning for complex analysis
- **Output Templates**: Define consistent response formats
- **Context Windows**: Manage long document processing efficiently

#### Information Comparison Workflows
```
Source Document A → Extract Key Points → Compare → Generate Report
Source Document B → Extract Key Points → ↗ Analysis ↘ → Quality Check
Reference Data → Validate Information → ↗ ↙ → Human Review (Optional)
```

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

#### Error Handling Patterns
```json
{
  "errorHandling": {
    "retryAttempts": 3,
    "fallbackBehavior": "human_review",
    "logLevel": "detailed",
    "notificationChannels": ["email", "webhook"]
  }
}
```

#### Performance Optimization
- **Parallel Processing**: Run independent tasks simultaneously
- **Caching Strategy**: Store frequently accessed reference data
- **Batch Operations**: Group similar operations for efficiency
- **Resource Management**: Monitor and limit API usage

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
- [ ] Human review points are clearly marked and functional
- [ ] Output formatting meets specification requirements
- [ ] Error messages are informative and actionable

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