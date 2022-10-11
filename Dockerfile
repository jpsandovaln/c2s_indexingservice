FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

# For typescript
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3030

CMD node src/index.js
