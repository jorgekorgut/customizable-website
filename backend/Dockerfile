FROM node:16
# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
#WORKDIR /opt/
#COPY ./package.json ./
#ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY ./ .
COPY ./database/data.db ./database/data.db
RUN npm install
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
