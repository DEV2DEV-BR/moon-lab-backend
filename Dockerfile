FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g nodemon
RUN npm install

COPY . . 

EXPOSE 3333

ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]

CMD [ "npm", "run", "dev" ]