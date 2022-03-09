#base image
FROM node:16-alpine

#make directory for docker image
RUN mkdir -p /usr/app/
WORKDIR /usr/app

#clone repo
RUN git clone https://github.com/123kevyd/recipeasy.git

#copying files to docker image working directory
COPY ./ ./

#delete package-lock.json
RUN rm package-lock.json

#install dependencies
RUN npm install
#create .next folder
RUN npm run build 

EXPOSE 3000
CMD ["npm", "start"]