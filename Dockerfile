FROM node:12

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install
# Build application
RUN npm run build



# ENV PORT=9000

EXPOSE 8007

CMD ["node", "dist/src/index.js"]
