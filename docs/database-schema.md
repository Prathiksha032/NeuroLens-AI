# 🗄️ NeuroLens AI — Database Schema

## 📌 Overview

NeuroLens AI uses a structured entity-based persistence layer to store:

* user journals
* AI-generated analysis
* behavioral insights
* emotional trends
* productivity metrics

The database architecture is designed to support:

* contextual memory retrieval
* analytics generation
* historical behavioral tracking
* personalized AI reasoning

---

# 🧩 Entity Relationship Overview

```text id="jlwm6r"
User
  │
  ├── Journal
  │      │
  │      └── AnalysisResult
  │
  └── ProductivityMetrics
```

---

# 👤 User Entity

Stores authentication and profile information.

| Field      | Type     | Description                |
| ---------- | -------- | -------------------------- |
| id         | string   | Unique user identifier     |
| email      | string   | User email                 |
| username   | string   | Display name               |
| created_at | datetime | Account creation timestamp |
| updated_at | datetime | Last profile update        |

---

# 📝 Journal Entity

Stores raw journal entries submitted by users.

| Field      | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| id         | string   | Unique journal identifier     |
| user_id    | string   | Owner reference               |
| content    | text     | User journal text             |
| mood       | string   | User-selected emotional state |
| word_count | integer  | Total journal word count      |
| created_at | datetime | Submission timestamp          |

---

# 🧠 AnalysisResult Entity

Stores AI-generated behavioral analysis and insights.

| Field              | Type     | Description                         |
| ------------------ | -------- | ----------------------------------- |
| id                 | string   | Unique analysis ID                  |
| journal_id         | string   | Linked journal reference            |
| emotion            | string   | Dominant emotional classification   |
| productivity_score | float    | Productivity consistency metric     |
| burnout_score      | float    | Burnout risk score                  |
| distraction_score  | float    | Focus instability score             |
| focus_score        | float    | Attention consistency metric        |
| ai_summary         | text     | Claude-generated behavioral summary |
| recommendations    | text     | Personalized AI suggestions         |
| created_at         | datetime | Analysis timestamp                  |

---

# 📊 ProductivityMetrics Entity

Stores long-term analytics and trend information.

| Field                | Type     | Description                  |
| -------------------- | -------- | ---------------------------- |
| id                   | string   | Metric identifier            |
| user_id              | string   | Owner reference              |
| average_focus        | float    | Long-term focus average      |
| average_productivity | float    | Productivity average         |
| burnout_trend        | float    | Burnout progression score    |
| emotional_stability  | float    | Emotional consistency metric |
| updated_at           | datetime | Last analytics update        |

---

# 🧠 AI Memory System

The memory system is designed to provide contextual continuity between user interactions.

## Memory Context Sources

* Previous journals
* Historical AI analyses
* Behavioral trends
* Emotional progression
* Productivity consistency

---

# 🔄 Data Flow Pipeline

```text id="jlwm9z"
User Journal Submission
        ↓
Journal Entity Persistence
        ↓
Historical Context Retrieval
        ↓
Claude AI Behavioral Analysis
        ↓
AnalysisResult Storage
        ↓
Analytics Aggregation
        ↓
Memory System Update
```

---

# 📈 Analytics Data Usage

Stored data powers:

* productivity trend graphs
* emotional analytics
* burnout progression charts
* behavioral pattern tracking
* historical AI insights

---

# 🔐 Security & Isolation

## Data Protection Features

* User-level data isolation
* Authenticated entity access
* Protected analysis retrieval
* Secure session-based access

---

# 🚀 Future Database Enhancements

Planned future enhancements:

* Vector embeddings storage
* Semantic memory retrieval
* RAG-based contextual search
* AI similarity analysis
* Predictive behavioral modeling

---

# 🎯 Schema Design Goals

The NeuroLens AI database architecture is optimized for:

* AI-assisted behavioral intelligence
* scalable analytics generation
* contextual memory systems
* persistent productivity tracking
* personalized AI reasoning workflows
