FROM dockerfile/nodejs

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN npm install -g gulp
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
 
# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

# Bundle the app
RUN gulp browserify

# Expose the port
EXPOSE 3000

#Run the app
CMD ["npm", "start"]

#If you want to make a dev container that uses host machine's src files so that
#you see immediate changes without having to rebuild the image, see: http://blog.abhinav.ca/blog/2014/06/17/develop-a-nodejs-app-with-docker/
