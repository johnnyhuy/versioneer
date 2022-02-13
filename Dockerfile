FROM node:16-alpine

WORKDIR /opt/workspace

RUN apk --update add git

COPY ./package.json /opt/workspace/
COPY ./package-lock.json /opt/workspace/

RUN npm ci
COPY ./ /opt/workspace/

RUN npm run build && npm link

ENTRYPOINT [ "/opt/workspace/node_modules/.bin/ts-node", "/opt/workspace/src/versioneer.ts" ]
