#Writing is reactive rewriting

##Install modules
`npm install`

## Browserify continuously
`gulp watchify`

##Start server
`npm start`

Open localhost:3000 in browser.

##Start with automatically reloading server
`npm install -g nodemon`
`nodemon`


##Testing
`npm test`

##Build the docker image
`docker build -t <name for the image> .`

##Running the container

`docker run -p 42875:3000 --rm <name of the image>`

Or as daemon:

`docker run -p 42875:3000 -d <name of the image>`

On OS X find out your boot2docker IP:
`boot2docker ip`

Open in browser <boot2docker ip>:42875 (usually http://192.168.59.103:42875/)

##Stopping the container

`docker ps`
`docker stop <id>`

