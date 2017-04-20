<<<<<<< HEAD
FROM node:6

MAINTAINER xVir <danil.skachkov@speaktoit.com>

RUN mkdir -p /usr/app/src

WORKDIR /usr/app
COPY . /usr/app

EXPOSE 5000

RUN npm install
CMD ["npm", "start"]
=======
FROM node:6

MAINTAINER xVir <danil.skachkov@speaktoit.com>

RUN mkdir -p /usr/app/src

WORKDIR /usr/app
COPY . /usr/app

EXPOSE 5000

RUN npm install
CMD ["npm", "start"]
>>>>>>> 289287e37ddf0e54444a5dd14e4d686a6a4f1ee0
