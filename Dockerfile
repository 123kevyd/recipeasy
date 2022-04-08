#base image
FROM node:17-alpine

#make directory for docker image
RUN mkdir -p /usr/app/
WORKDIR /usr/app


#copying files to docker image working directory
COPY ./ ./

#install dependencies
RUN npm install
#ci
RUN npm ci
#create .next folder
RUN npm run build
#testing
RUN npm test

EXPOSE 3000
CMD ["npm", "start"]
