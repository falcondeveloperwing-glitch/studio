# Development Roadmap | Future Valuation Drivers

To move ReplyRush AI from a High-End MVP to an Enterprise Scale platform, the following strategic milestones are recommended:

## 1. Background Worker Integration
- **Impact**: High.
- **Goal**: Implement a background processing queue (e.g., Inngest) to trigger Genkit flows automatically from webhook payloads without an active operator session.

## 2. Server-Side Aggregations
- **Impact**: High.
- **Goal**: Move analytics math to Firebase Cloud Functions that update "Daily Stats" documents on write, supporting scale to 1,000,000+ logs.

## 3. Advanced RBAC Hardening
- **Impact**: Medium.
- **Goal**: Implement granular field-level security rules to prevent specific roles (e.g., Viewers) from seeing sensitive PII data.

## 4. Multi-Platform Support
- **Impact**: High.
- **Goal**: Extend the `Inbox` logic to handle WhatsApp and Facebook Messenger payloads via the unified Meta Graph API.
