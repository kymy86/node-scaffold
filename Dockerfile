FROM node:latest

#remove old versione of yarn package shipeed with the default node image
RUN rm -f /usr/local/bin/yarn

#install the updated version
RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y -qq apt-utils && apt-get install -y -qq yarn \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/

#install node-gyp for compiling native NodeJS modules
RUN npm install -g node-gyp
#install nodemon
RUN yarn global add nodemon
#create workdir
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

#copy package.json and yarn.lock from host to container tmp directory
COPY package.json /usr/src/app
#installed yarn packages
RUN yarn

COPY . /usr/src/app

EXPOSE 5000