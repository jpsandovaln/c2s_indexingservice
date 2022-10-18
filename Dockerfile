FROM node:16

WORKDIR /usr/app

COPY package.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm config set registry https://registry.npmjs.com/
RUN npm install

COPY . .

# For typescript
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3030

CMD node src/index.js
