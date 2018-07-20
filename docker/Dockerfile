FROM node:latest

ARG port=3000
EXPOSE $port
ENV PORT $port

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

COPY ./dist ./dist

CMD ["npm", "start"]
