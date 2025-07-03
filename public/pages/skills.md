# 💻 Skills

## Cloud & DevOps

### Programming Languages
- **Python**  
  *I've been using Python for over 9 years, applying it to a wide range of tasks including automation, scripting, backend development, data analysis, and more. It's my go-to language for rapid prototyping and production-ready solutions alike.*
- **Go**  
  *Used Echo, Gin frameworks, and GORM ORM for backend APIs.*
- **TypeScript/JavaScript**  
  *Prefer TypeScript for type safety; Express.js and NestJS for backend.*

### Containerization & Orchestration
- **Docker**  
  *I've been using Docker for around 4 years now. Initially started for local development environments, but after beginning my DevOps journey, I've "dockerized everything" (even my life!). It's reliable, simple, flexible, and now central to virtually all my development and deployment workflows.*
- **Docker Swarm**  
  *Spent about 2 years working with Docker Swarm. Used it extensively at Calgra Group to implement failover strategies that ensure 100% uptime during peak traffic.*
- **Kubernetes**  
  *My preference for the last 2 years. Working through the CKA/CKAD courses on KodeKloud. I use KinD for projects, but also tried K3d and loved it! Set up a kubeadm cluster for learning and actively create Kubernetes manifests using Helm and Kustomize.*
- **Hashicorp Nomad**  
  *I read about it recently and liked its simplicity. On my list to explore further.*

### Infrastructure as Code (IaC)
- **Ansible**  
  *Started learning Ansible in early 2024 and quickly became a fan. Used it at Piterion to automate Joomla/Camunda deployments, eliminating manual errors.*
- **Terraform**  
  *Familiar with Terraform concepts and HCL syntax. Understand core concepts like tfstate but looking for more hands-on projects (other than local-stack setup and manipulation).*

### Cloud Platforms
- **AWS**  
  *Completed the AWS Solution Architect course. Familiar with core AWS services and architecture patterns though haven't had extensive hands-on experience yet. Main drawback: everything is way too costly for smaller projects and experimentation.*
- **Azure**  
  *Basic experience with some services through Azure student pack. More cost-friendly than AWS (though still costly). Found its ecosystem harder to navigate compared to GCP and AWS, with less community investment—for example, community-maintained Terraform modules often lag behind service updates or contain unresolved errors.*
- **Hetzner**  
  *Used Hetzner cloud services at Calgra Group to deploy our services and leveraged their bucket storage solutions. Impressed by their simplicity and cost-effectiveness, especially with no data export fees. Main drawback: lacks IAM capabilities compared to major cloud providers.*

### CI/CD & GitOps
- **GitLab CI**  
  *My preferred CI/CD platform. Love the YAML-based approach that provides complete control and flexibility to implement virtually any workflow. Appreciate the self-contained nature without excessive plugin dependencies.*
- **GitHub Actions**  
  *Good for simple use cases with fast setup, but frustrated by the excessive plugin ecosystem that forces you to rely on third-party actions and surrender control. Still valuable for quick implementations.*
- **Jenkins**  
  *The embodiment of plugin dependency issues. The time spent installing, debugging, understanding plugins, and resolving version compatibility problems could be used to build multiple CI/CD pipelines in GitLab. Powerful but inefficient.*
- **ArgoCD**  
  *Strongly prefer it over Flux for GitOps workflows—as most practitioners do. Excellent for maintaining consistency between Git repositories and live cluster states.*

### Observability & Monitoring
- **Prometheus & Grafana**  
  *Deployed these using Helm charts in standalone setups. Instrumented monitoring for API performance and reliability metrics in the DevOps Academic Project.*
- **ELK Stack**  
  *Experience setting up Elasticsearch in multi-node clusters using Docker Compose and Kubernetes.*

### Message Brokers & Event Processing
- **RabbitMQ**  
  *Engineered AI-powered event workflows at Calgra Group using RabbitMQ for processing real-time predictions for mobile applications. Love that it comes with a dashboard out of the box, allows extensive configuration options, and supports scheduled trigger setups—which is genuinely cool and practical.*
- **Redis**  
  *Appreciate its versatility beyond just caching. Love how it allows you to have different databases in the same instance, making it excellent for both simple message passing and more complex pub/sub scenarios.*
- **Kafka**  
  *The heavyweight champion of high-throughput messaging. Impressive for large-scale event streaming but feels like bringing a tank to a knife fight for simpler use cases. Like Elasticsearch, it's Java-based, which means deployment headaches in containerized environments and the "joy" of JVM tuning.*
- **MQTT, Pub/Sub**  
  *Conceptual understanding of these messaging systems, though limited hands-on experience.*

---

## Software Development

### Backend Development
- **Python Ecosystem**  
  *My daily driver for 9 years—whether it's web dev, automation, scripting, LLM tinkering, or building personal tools, Python is my Swiss Army knife for getting things done fast and right.*
  - **Flask**: Great for rapid development, used in DevOps and Cybersecurity projects
  - **FastAPI**: Impressed by its data validation with Pydantic and significantly faster performance thanks to async.io under the hood. Still not ideal for complex multi-threading or parallel event processing
  - **Django**: Used it but not a huge fan. The CLI and pre-installed admin dashboard are advantageous, but otherwise it feels heavy and overkill for many projects. Requires the additional Django REST framework for simple APIs. Not bad overall, but not my first choice (though still better than Java!)
- **Go**  
  *I'm particularly drawn to Go's strict error handling and its refreshing approach to OOP. The way it implements pointers brings back low-level control without the complexity of C/C++. I'm eager to explore socket programming and event-driven architecture (EDA) patterns in Go. Used Echo, Gin frameworks, and GORM ORM for backend APIs with great satisfaction.*
- **JavaScript/TypeScript**  
  *NestJS is my preferred backend framework in this ecosystem, with its Angular-inspired structure providing excellent organization. Also used Express.js for APIs. Like Python, still find limitations with parallel event handling in complex scenarios.*
- **.NET**  
  *Used professionally at Calgra Group. Impressed by its speed, robust system architecture, parallel processing capabilities, and background task handling that abstracts away direct thread management. Appreciated SignalR and dependency injection compared to Java. However, found it takes too much control from developers, is overkill for simpler applications, and its rigid "only OOP coding" approach lacks flexibility. Also encountered limitations in Entity Framework Core when switching database types.*

### Frontend Development
- **Angular**  
  *My preferred frontend framework. I appreciate its strict code structure and clear separation between HTML templates and TypeScript logic. The opinionated architecture makes for more maintainable code in my experience.*
- **React & Next.js**  
  *Basic knowledge from projects. Find the state hooks and state management patterns less intuitive compared to Angular's approach.*

### Databases
- **SQL Databases**  
  *PostgreSQL (preferred for its pg_vector extension, JSONB capabilities, Elasticsearch integration, superior replication, and overall performance), MySQL, SQLite*
- **NoSQL Databases**  
  *MongoDB (love its simplicity and distributed capabilities beyond just replication; my go-to when applications don't have complex relationships), Redis*
- **Search & Analytics**  
  *Elasticsearch - impressed by its query speed, indexing capabilities, and the flexibility to customize nodes, shards, and replicas. Configured multi-node clusters in containerized environments. The downside: being Java-based makes deployment challenging in Docker/Kubernetes, and impossible in Docker Swarm due to its stateful nature conflicting with Swarm's lack of container identity (unlike Kubernetes StatefulSets or Docker Compose's container naming)*

## AI & Machine Learning

### AI Engineering & Applied Machine Learning
- **LLM Applications**  
  *Focused on practical applications rather than theoretical ML. Built production-ready systems that leverage foundation models through APIs and local deployments. Particularly interested in the engineering challenges of integrating AI into existing systems and workflows.*
- **RAG (Retrieval Augmented Generation)**  
  *Implemented full-stack RAG systems with Mistral and Gemini models. Built custom vector storage solutions with PostgreSQL (pg_vector) and dedicated vector databases. Developed context-aware prompt engineering techniques to enhance retrieval accuracy and reduce hallucinations.*
- **Agent-Based Systems**  
  *Experimented with autonomous AI agents that can plan, reason, and execute tasks. Designed orchestration systems for agent collaboration and implemented safeguards against potential failure modes. More excited by the software architecture challenges than the underlying ML models.*
- **Foundation Model Integration**  
  *Experience with BERT for classification tasks and pragmatic fine-tuning of models for specific applications. Developed interfaces between models and backend systems focusing on reliability, cost optimization, and practical constraints.*

## Cybersecurity
- **Cyber Threat Intelligence**  
  *At Trustable, implemented real-time collection of threat intelligence including news, trends, attacks, reported vulnerabilities, updates, patches, active malware, and APTs. Designed and implemented custom connectors for existing Threat Intelligence solutions. Strong in Linux, good with Windows/Active Directory.*
- **Web Application Security**  
  *Crafted OWASP Top 10 vulnerability simulation platform for security training. CTF player (Web, Crypto), secure code review, and pentesting mindset.*
- **Penetration Testing**  
  *Experience with Hack The Box, TryHackMe, Nmap, Burpsuite, and custom Python testing automation. Specialized in CTFs (Web, Crypto).* 
- **Secure Coding Practices**  
  *Code review experience focused on identifying security flaws and minimizing risk.*
- **Role-Based Access Control (RBAC)**  
  *Carefully configured when implementing multi-role web applications, not just limited to Kubernetes contexts. Created granular permission systems to ensure precise access control in both application and infrastructure layers.*
- **Infrastructure Security**  
  *Through extensive practice with Hack The Box and TryHackMe machines, developed strong instincts for identifying misconfigured vulnerable servers. These experiences have become reflexive knowledge when configuring infrastructure, allowing me to effectively minimize attack surfaces and limit potential attacker impact.*

## System Design & Architecture
- **Microservices Architecture**
- **Design Patterns**
- **UML & System Modeling**
- **Distributed Systems**
- **Software Development Life Cycle (SDLC)**

## Version Control
- **Git, GitHub, GitLab**  
  *Version control is second nature at this point. Used extensively in all projects and professional roles.*
