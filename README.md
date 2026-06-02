# Cosco Overseas Education — coscoedu.com

Website for Cosco Overseas Education, a study abroad consultancy based in Kerala.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, Tailwind CSS 3 |
| Routing | React Router 7 |
| Animations | Framer Motion, Lenis (smooth scroll) |
| Container | Docker (multi-stage: Node 20 Alpine build → Nginx Alpine) |
| Web Server | Nginx (container) → Caddy (host reverse proxy, auto-SSL) |
| CI/CD | GitHub Actions |
| Registry | Docker Hub (`elsonpulikkan/cosco-overseas-frontend`) |
| Hosting | Docker on EC2 (44.222.7.3) |

## Environments

| Environment | URL | Branch | Container |
|-------------|-----|--------|-----------|
| Production | https://coscoedu.com | `main` | `cosco-frontend` (port 3000) |
| Staging | https://stage.coscoedu.com | `staging` | `cosco-frontend-staging` (port 3001) |

## Branching & Deployment

```
staging ──push──► GitHub Actions ──► build & deploy to stage.coscoedu.com
    │
    └── PR ──► main ──push──► GitHub Actions ──► build & deploy to coscoedu.com
```

- `main` is protected — requires 1 approving PR review to merge.
- Docker images are tagged with immutable Git SHA (`<sha>` for prod, `staging-<sha>` for staging).

## Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in ./dist
```

## Docker Build (local)

```bash
docker build -t cosco-overseas-frontend .
docker run -p 8080:80 cosco-overseas-frontend
```

## CI/CD Pipeline

Triggered automatically on push to `main` or `staging`:

1. Checkout code
2. Login to Docker Hub
3. Build image (tagged with Git SHA)
4. Push to Docker Hub
5. SSH into production server
6. Pull new image, stop old container, start new container

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub personal access token |
| `PROD_HOST` | Production server IP |
| `PROD_USER` | SSH username |
| `PROD_PASSWORD` | SSH password |

## Manual Deployment

```bash
# Build and push
docker buildx build --platform linux/amd64 -t elsonpulikkan/cosco-overseas-frontend:<tag> --push .

# Deploy on server
ssh user@server
sudo docker pull elsonpulikkan/cosco-overseas-frontend:<tag>
sudo docker stop cosco-frontend && sudo docker rm cosco-frontend
sudo docker run -d --name cosco-frontend --restart unless-stopped -p 127.0.0.1:3000:80 elsonpulikkan/cosco-overseas-frontend:<tag>
```

## Project Structure

```
├── .github/workflows/
│   ├── deploy-prod.yml        # Production CI/CD
│   └── deploy-staging.yml     # Staging CI/CD
├── public/                    # Static assets (images, icons)
├── src/
│   ├── components/            # React components (common, home, forms, ui)
│   ├── pages/                 # Page components (Home, About, Services, etc.)
│   ├── routes/                # App routing
│   ├── data/                  # Content data files
│   ├── config/                # Site configuration
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilities (motion presets)
│   └── assets/                # Bundled assets
├── Dockerfile                 # Multi-stage build
├── nginx.conf                 # Nginx SPA config
└── package.json
```
