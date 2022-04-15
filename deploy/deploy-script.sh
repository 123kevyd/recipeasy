#!/bin/sh
echo 'Deploying app...'
docker run -d -p 3000:3000 sebaraneda/recipeasy:latest
echo 'Done.'