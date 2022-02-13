FROM node:16-alpine

WORKDIR /opt/workspace

COPY ./ /opt/workspace/

RUN npm ci

ENTRYPOINT [ "/opt/workspace/node_modules/.bin/ts-node", "/opt/workspace/src/index.ts" ]
