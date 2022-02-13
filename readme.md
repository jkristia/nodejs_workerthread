## NodeJs / Typescript + WorkerThread + 2 way communication
Simple example of how to create a workerthread and send messages between main and worker.

For 2 way communication, each side must create a message channel 
- use `channel.port1` for sending events on the channel
- pass `channel.port2` from the channel to the 'listening' side.

E.g.
- main creates a MessageChannel, use `port1` for sending events to worker, and pass `port2` to the worker. Worker will use this port (`port2`) to listening for events fon the channel
- likewise, worker will create a MessageChannel, use `port` for sending events on the channel and pass `port2` of the channel to the other end.


### Links used

NodeJs documentation
https://nodejs.org/api/worker_threads.html  
From documentation postMessage(value, [transferList])  
`"After transferring, they are not usable on the sending side of the channel anymore (even if they are not contained in value)"`
 

Other links  
https://wanago.io/2019/05/06/node-js-typescript-12-worker-threads  
https://wanago.io/2019/05/13/node-js-typescript-13-sending-data-worker-threads/  
https://nodesource.com/blog/worker-threads-nodejs/  
https://medium.com/@mohllal/node-js-multithreading-a5cd74958a67
https://stackoverflow.com/questions/57898878/how-do-i-create-a-direct-communication-channel-between-two-worker-threads-in-nod/57899543#57899543

