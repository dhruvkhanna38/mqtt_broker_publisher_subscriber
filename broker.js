const mosca = require('mosca')
const settings = {
   http: {
    // port for websockets, MQTT is running in default port 1883
    port: 8000,
    bundle: true,
    static: './public'
  }
}
// start mosca
const moscaServer = new mosca.Server(settings)
moscaServer.on('ready', setup)
// fired when the mqtt server is ready
function setup() {
console.log('Mosca server is up and running in port 1883!')
console.log('Using port 8000 for MQTT over Web-Sockets!')
}
// fired when a client is connected
moscaServer.on('clientConnected', function(client) {
console.log('client connected', client.id)
})
// fired when a message is received
moscaServer.on('published', function(packet, client) {
    //if (packet.topic == '/example') {
      console.log(packet.payload.toString('utf-8'))
    //}
})
// fired when a client subscribes to a topic
moscaServer.on('subscribed', function(topic, client) {
console.log('subscribed : ', topic)
})
// fired when a client unsubscribes to a topic
moscaServer.on('unsubscribed', function(topic, client) {
console.log('unsubscribed : ', topic)
})
// fired when a client is disconnecting
moscaServer.on('clientDisconnecting', function(client) {
console.log('clientDisconnecting : ', client.id)
})
// fired when a client is disconnected
moscaServer.on('clientDisconnected', function(client) {
console.log('clientDisconnected : ', client.id)
})

module.exports = moscaServer