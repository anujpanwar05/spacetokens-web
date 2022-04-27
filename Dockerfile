FROM node:14

ENV NODE_ENV=production
ENV PORT=9000

ARG REACT_APP_API_URL
ARG REACT_APP_API_KEY
ARG REACT_APP_SCAN_URL
ARG REACT_APP_GA_SITE_TAG
ARG REACT_APP_FB_SITE_TAG

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

ADD package.json /app/
RUN npm install

COPY . /app/
RUN npm run build

RUN npm install -g serve

EXPOSE 9000
CMD ["serve", "-s", "build", "-l", "9000"]

