FROM node:18

RUN mkdir -p /src
WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

# RUN npx tsc

EXPOSE 5000

CMD ["npm", "start"]