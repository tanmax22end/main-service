FROM node:20-slim

RUN apt-get update && apt-get install procps git wget -y


WORKDIR /main-service


COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm i

ADD . .

EXPOSE 3000

CMD ["node", "index.js"]
