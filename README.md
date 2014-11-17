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

##Running the docker image

If you're using boot2docker on OS X, first forward the port
`VBoxManage controlvm boot2docker-vm natpf1 "node-server,tcp,127.0.0.1,3000,,3000"`

`docker run -p 42875:3000 -d <name of the image>`

`docker ps`
`docker stop <id>`


Open 
