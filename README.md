# Cosco Overseas Education — coscoedu.com

> Study abroad consultancy website for Cosco Overseas Education, Kerala. Built with React 19 and deployed via automated CI/CD.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 3 |
| Routing | React Router 7 |
| Animations | Framer Motion, Lenis (smooth scroll) |
| Icons | React Icons |
| Container | Docker (multi-stage: Node 20 Alpine → Nginx Alpine) |
| Web Server | Nginx (in-container) → Caddy (host reverse proxy, auto-SSL) |
| CI/CD | GitHub Actions (build, push, deploy on every push) |
| Registry | Docker Hub |
| Hosting | Docker on EC2 |

## Environments

| Environment | URL | Branch | Container | Port |
|-------------|-----|--------|-----------|------|
| Production | https://coscoedu.com | `main` | `cosco-frontend` | 3000 |
| Staging | https://stage.coscoedu.com | `staging` | `cosco-frontend-staging` | 3001 |

## Branching & Deployment Flow

```
feature/* ──► staging (push) ──► GitHub Actions ──► stage.coscoedu.com
                 │
                 └── PR ──► main (merge) ──► GitHub Actions ──► coscoedu.com
```

- `main` is protected — requires 1 approving PR review.
- Docker images use **immutable Git SHA tags** (`<sha>` for prod, `staging-<sha>` for staging).
- No credentials stored in the image — all secrets live in GitHub Actions.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev          # → http://localhost:5173

# Production build
npm run build        # → ./dist

# Lint
npm run lint
```

## Docker (Local Build & Test)

```bash
# Build
docker build -t cosco-overseas-frontend .

# Run locally
docker run -p 8080:80 cosco-overseas-frontend
# → http://localhost:8080
```

For linux/amd64 (production target):
```bash
docker buildx build --platform linux/amd64 -t <registry>/<image>:<tag> --push .
```

## CI/CD Pipeline

Triggered automatically on push:

| Trigger | Branch | Action |
|---------|--------|--------|
| Push | `main` | Build → Push to registry → Deploy to prod |
| Push | `staging` | Build → Push to registry → Deploy to staging |

### Pipeline Steps

1. Checkout code
2. Generate immutable image tag from Git SHA
3. Login to Docker Hub
4. Build & push Docker image
5. SSH into server
6. Pull image, replace container, prune old images

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub personal access token (Read & Write) |
| `PROD_HOST` | Production server IP |
| `PROD_USER` | SSH username for deployment |
| `PROD_PASSWORD` | SSH password for deployment |

> ⚠️ Never commit credentials. All sensitive values are stored as GitHub repository secrets.

## Manual Deployment

```bash
# On the server
sudo docker pull <registry>/<image>:<sha-tag>
sudo docker stop cosco-frontend && sudo docker rm cosco-frontend
sudo docker run -d \
  --name cosco-frontend \
  --restart unless-stopped \
  -p 127.0.0.1:3000:80 \
  <registry>/<image>:<sha-tag>
```

## Project Structure

```
├── .github/workflows/
│   ├── deploy-prod.yml          # Production CI/CD
│   └── deploy-staging.yml       # Staging CI/CD
├── public/
│   ├── images/                  # Static images
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── common/              # Navbar, Footer, ScrollProgress, etc.
│   │   ├── home/                # Hero, Destinations, FAQ, Testimonials, etc.
│   │   ├── forms/               # EnquiryForm
│   │   └── ui/                  # Reveal, SectionHeading
│   ├── pages/                   # Home, About, Services, Destinations, Contact
│   ├── routes/                  # AppRoutes
│   ├── data/                    # Content data (destinations, estimator, content)
│   ├── config/                  # Site configuration
│   ├── hooks/                   # useCountUp, useSeo
│   ├── lib/                     # Motion presets
│   └── assets/                  # Bundled assets
├── Dockerfile                   # Multi-stage build
├── nginx.conf                   # Nginx SPA config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Server Architecture

```
Internet → Caddy (auto-SSL, reverse proxy)
              ├── coscoedu.com        → 127.0.0.1:3000 (cosco-frontend)
              └── stage.coscoedu.com  → 127.0.0.1:3001 (cosco-frontend-staging)
```

Caddy handles TLS certificate provisioning automatically via Let's Encrypt.
