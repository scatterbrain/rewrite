#Writing is reactive rewriting

Very basic isomoporphic React/Flux markdown editor with Node/Git backend. Uses
GitDo (https://github.com/scatterbrain/gitdo) as the document backend. 

Doesn't have support for more than one document or anything crazy like that. 

##Install modules
`npm install`

Needs rabbitmq:

`brew install rabbitmq`

Needs gitdo running (see gitdo doc)

## Browserify continuously
`gulp watchify`

##Start server
`npm start`

Open localhost:3000 in browser.

##Start with automatically reloading server

Run rabbitmq
`rabbitmq-server`

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

