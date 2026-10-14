# AGENTS.md: semver-as-a-service

SemVer as a Service: a small Express server that exposes the npm `semver` library over HTTP for WebJars (`/validRange?range=...`, `/maxSatisfying?v=...&v=...&range=...`). It runs in production as https://semver.webjars.org.

## Skills

Follow the `zen-of-projects` Skill (its "Node.js Projects" section); this file records only project facts and exceptions. For design, domain modeling, effects and testing strategy, follow `zen-of-james`. This project has no Skills dependency (npm has no SkillsJars): `.factory/MAINTENANCE.md` reads the Skills from a clone of https://github.com/jamesward/skills.

## MCP

None. Look up versions with `npm view <package> version` and `npm outdated`.

## Build, test & dev

- Full validation (CI does the same): `npm ci && npm test`, then a smoke test: `PORT=5911 npm start &` and `curl -fsS 'http://localhost:5911/validRange?range=1'` (expect `>=1.0.0 <2.0.0-0`).
- Dev server with auto-restart: `npm run dev` (port 5000, or `PORT`).
- Node: `engines.node` in `package.json` (the active LTS line, `24.x`); CI reads it with `node-version-file`.

## Production

- Heroku app `semver-as-a-service` (Node.js buildpack, no add-ons), custom domain `semver.webjars.org`.
- GitHub auto-deploy: **every push to `main` deploys to production.** After a merge, check `curl -fsS 'https://semver.webjars.org/validRange?range=1'` (expect `>=1.0.0 <2.0.0-0`); if it fails, label the PR `needs-human` and report it.
- WebJars depends on this service: don't change the endpoints' paths, parameters or responses without a human decision (label `needs-human`).

## Maintenance routine

`.factory/MAINTENANCE.md` (weekly), following the `zen-of-projects` Skill.
