#base image
FROM node:17-alpine

#make directory for docker image
RUN mkdir -p /usr/app/
WORKDIR /usr/app


#copying files to docker image working directory
COPY ./ ./

#install dependencies
RUN npm install
#create .next folder
RUN npm run build 

EXPOSE 3000
CMD ["npm", "start"]
