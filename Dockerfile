FROM node:18
# RUN apt-get -y update
# RUN apt-get -y install git
# RUN git clone https://github.com/abhijain614/SpeMajor-Frontend.git

WORKDIR ./

COPY package.json package-lock.json ./
# RUN npx cap init SpeMajor-Frontend com.SpeMajor-Frontend.com --web-dir ./public --npm-client yarn
# RUN npx cap add android
# RUN npx cap add electron
# RUN npx cap add ios
RUN npm install -g ionic
RUN npm install
COPY . .
# COPY ./resources/gitignore .gitignore
# RUN sed -i -e "s/node scripts\/build.js/node scripts\/build.js && npx cap sync/g" package.json

ENTRYPOINT ionic serve