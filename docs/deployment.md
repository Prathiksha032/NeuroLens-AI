# Deployment & Local Setup

NeuroLens AI is currently deployed using the Base44 platform with a React + Vite frontend architecture and integrated backend services.

The deployment setup was designed to support rapid iteration, AI integration, authentication, analytics, and persistent storage.

---

# Current Deployment Stack

Frontend:

* React
* Vite
* Tailwind CSS

Backend Services:

* Base44 backend services
* Base44 authentication
* Base44 entity database

AI Layer:

* Claude AI via InvokeLLM integration

Deployment:

* Base44 cloud deployment

---

# Live Application

Live URL:

https://charming-neuro-lens-flow.base44.app

---

# Local Development Setup

The project can also run locally using VS Code.

---

# Prerequisites

Install:

* Node.js
* npm
* VS Code

Recommended extensions:

* ES7 React Snippets
* Tailwind CSS IntelliSense
* Prettier

---

# Clone Repository

```bash id="jlwm4b"
git clone https://github.com/Prathiksha032/NeuroLens-AI.git
```

Move into project folder:

```bash id="jlwm0v"
cd NeuroLens-AI
```

---

# Install Dependencies

```bash id="jlwm7r"
npm install
```

---

# Environment Variables

Create:

```text id="jlwm5h"
.env.local
```

Add:

```env id="jlwm1j"
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://charming-neuro-lens-flow.base44.app
```

---

# Run Locally

```bash id="jlwm8p"
npm run dev
```

The application runs locally at:

```text id="jlwm6n"
http://localhost:5173
```

---

# Deployment Workflow

Current deployment process:

1. Develop locally or inside Base44
2. Push updates
3. Publish through Base44 platform
4. Deploy updated frontend + backend integrations

---

# Backend Integration Flow

The frontend communicates with:

* Base44 authentication services
* Base44 entity database
* Claude AI integration layer

This enables:

* persistent journals
* AI analysis storage
* analytics generation
* contextual memory tracking

---

# Future Migration Plan

A future scalable architecture may include:

Frontend:

* React + Vite

Backend:

* FastAPI

Database:

* PostgreSQL / Supabase

AI Layer:

* Claude API
* Vector embeddings
* RAG pipelines

This would provide full infrastructure ownership and advanced backend customization.

---

# Deployment Challenges Faced

Some deployment challenges during development:

* AI response latency
* environment configuration
* prompt optimization
* state synchronization
* analytics persistence

These were gradually refined during iterative testing.

---

# Scalability Considerations

The current architecture was designed with future scalability in mind, including:

* modular frontend structure
* reusable AI workflows
* analytics extensibility
* future vector memory integration
* semantic retrieval readiness

---

# Engineering Summary

The deployment architecture focuses on balancing:

* rapid AI product iteration
* usability
* scalable design thinking
* modern frontend engineering
* contextual AI workflows

while maintaining a production-style SaaS experience.
