# Put this project in a GitHub repository

## Upload the ready-made files

1. Extract `YUGANTAR-GitHub-ready.zip`.
2. Open the extracted folder. Its top level contains `package.json`, `README.md`, `src/`, `docs/`, `.github/` and the configuration files.
3. Create an empty GitHub repository with your preferred name and visibility.
4. Choose **Add file → Upload files** and upload the extracted contents, keeping the folder structure. Commit the upload.
5. Confirm that `package.json` and `README.md` appear at the repository root. Confirm `.github/workflows/ci.yml` and `.gitignore` are present.

Upload the extracted files, rather than storing the ZIP as the only repository file. Preserve files whose names begin with a dot; they contain environment examples, ignore rules and CI configuration.

## Push using Git instead

Open a terminal in the extracted folder. Replace the URL below with your actual empty repository URL.

```sh
git init
git add .
git commit -m "Initial YUGANTAR prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Use GitHub's normal sign-in or SSH authentication. Do not put a password or token in the repository URL or source files. For an existing repository, use its existing Git checkout and copy these files into its root before committing.

## What is included

Complete frontend/backend, seeded demo generator, sample artwork, tests, dependency lockfile, configuration, setup guide, API and architecture docs, security/contribution guides, pull request and bug templates, and a GitHub Actions workflow.

Runtime secrets, databases, uploaded media, build files and installed dependencies are excluded. They are created locally when the app starts. `.env.example` contains configuration names and empty secret fields.

## Run after cloning

```sh
npm ci
```

On Windows:

```powershell
Copy-Item .env.example .env.local
npm run dev
```

On macOS/Linux:

```sh
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Use the demo accounts in the root README.

## Automated checks

The included workflow runs type generation/type checking, unit tests and a production build on push and pull requests. It uses Node 24 and does not need API keys. The integration walkthrough remains a local check against a running server.

Workflow action references follow the official [checkout](https://github.com/actions/checkout) and [setup-node](https://github.com/actions/setup-node) documentation. Workflow configuration is included; its first hosted run occurs after you push the repository.

GitHub Pages alone cannot run this backend. See [deployment guidance](DEPLOYMENT.md) for the persistent Node server requirements.
