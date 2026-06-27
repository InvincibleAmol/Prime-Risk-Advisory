# Prime Risk Advisory — Client Website

Production website developed for a real client in the risk intelligence and due diligence space, updated with a stronger service architecture, consultation-led enquiry flow, revised legal pages, and cleaner crawl/indexing setup. The project is structured to present a more authoritative business presence while keeping the stack lightweight and maintainable.

**Live site:** [primeriskadvisory.in](https://primeriskadvisory.in/)

---

## Project summary

Prime Risk Advisory needed a professional, trust-oriented business website that could do more than act as a digital brochure. The updated version improved service clarity, enquiry quality, legal-page structure, and technical SEO hygiene.

The current implementation focuses on:
- stronger positioning for risk intelligence and due diligence services,
- clearer service segmentation for business and personal verification use cases,
- a confidential consultation workflow,
- better legal/compliance page structure,
- lightweight deployment with minimal operational overhead.

---

## What changed in this update

Today’s code changes expanded the project from a simple brochure-style business site into a more structured service website.

### Content and positioning updates
- Reworked hero messaging around decision risk and verified intelligence
- Strengthened brand positioning and trust language
- Added deeper service segmentation instead of a single generic services block
- Introduced dedicated sections for:
  - Banking & Financial Risk Advisory
  - Corporate Risk Solutions
  - Employee Background Verification
  - Corporate Investigations
  - Matrimonial Verification
  - Property Verification
  - Strategic Intelligence & Investigations
- Added case studies and a knowledge-centre placeholder for future authority content

### Navigation and UX updates
- Expanded navigation structure with service dropdown links
- Added clearer internal anchor-based information architecture
- Improved consultation-driven CTA flow
- Added a more structured confidential consultation form experience

### Form and lead-capture updates
- Improved the consultation modal with:
  - clearer confidentiality guidance,
  - high-level information warning,
  - required-field clarity,
  - service-specific intake selection,
  - better submission trust messaging,
  - success-state handling.
- Continued to use a lightweight Google Apps Script submission workflow with spam protection.

### Legal and technical updates
- Rewrote `privacy-policy.html` in clearer plain language
- Rewrote `terms.html` with a more defensible, readable structure
- Cleaned up `robots.txt`
- Simplified `sitemap.xml` to include only canonical indexable URLs
- Improved consistency between crawl rules, `noindex` usage, and legal-page behavior

---

## My role

Handled the project end to end as the frontend developer and implementation owner.

### Responsibilities
- Frontend architecture and page implementation
- Responsive UI development
- Service-page content structuring within a single-page site
- Consultation modal and form integration
- Spam-protection setup
- Legal page implementation
- Technical SEO cleanup
- Production deployment and live-site updates

---

## Tech stack

- HTML5
- CSS3
- JavaScript
- Google Apps Script
- GitHub Pages
- GoDaddy DNS / custom domain

---

## Key features

### Frontend
- Responsive corporate website
- Sticky navigation
- Multi-section service-focused layout
- Hero messaging with trust-oriented positioning
- Mobile-first styling
- Dedicated legal pages

### Lead capture
- Confidential consultation modal
- Service-specific enquiry routing through form selection
- Google Apps Script submission flow
- Google Sheets logging
- Success/error feedback states

### Security and reliability
- Honeypot anti-spam field
- Content Security Policy setup
- No sensitive data stored on the client
- Lightweight static deployment model

### SEO and structure
- Semantic HTML structure
- Meta tags and Open Graph setup
- Schema markup for organization details
- Cleaned robots.txt and sitemap.xml setup
- Improved service discoverability through clearer section architecture

---

## Engineering decisions

### Why static architecture
A static frontend kept the project fast, simple to host, and easier for a small business client to maintain.

### Why Google Apps Script
Google Apps Script provided a practical serverless path for handling consultation requests without introducing backend hosting complexity.

### Why the service restructure mattered
The earlier version grouped services too broadly. The updated architecture breaks service offerings into clearer sections so users can better understand the business scope and future content expansion becomes easier.

### Why the legal/SEO cleanup mattered
The legal pages, robots configuration, and sitemap structure were refined so the site behaves more predictably for users and crawlers while staying aligned with the actual public-page setup.

---

## Outcome

This update moved the project closer to a production-grade consulting website by improving:
- business credibility,
- service clarity,
- consultation quality,
- legal-page readability,
- technical SEO hygiene,
- maintainability of the public website structure.

> Add measured evidence here later if available, such as Lighthouse scores, enquiry conversion improvements, or before/after screenshots.

---

## Project structure

```text
Prime-Risk-Advisory/
├── index.html
├── privacy-policy.html
├── terms.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    ├── icon_logo.png
    └── favicon.png
```

---

## What this project demonstrates

- Real client delivery
- Production-ready frontend implementation
- Responsive corporate website development
- Secure consultation workflow integration
- Practical legal-page implementation
- Static-site SEO and crawl-management basics
- Business-focused UX thinking for trust-sensitive services

---

## Client note

This was developed for **Prime Risk Advisory** as a real client project.

Business branding and content belong to the client.  
Code implementation and frontend development by **Hitesh Mane**.
