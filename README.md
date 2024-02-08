SemVer as a Service
------------------

Local Dev:
```
npm install
```

```
npm run dev
```

```
npm test
```

Prod:
```
pack build --builder=gcr.io/buildpacks/builder semver-as-a-service

docker run -it -ePORT=8080 -p8080:8080 semver-as-a-service
```
