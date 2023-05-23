#!/bin/sh
docker run -d -p 8080:8080 gcr.io/hiring-278615/reposerver:v1.1
npx react-native run-ios

