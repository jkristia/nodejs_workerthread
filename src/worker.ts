import { parentPort, MessageChannel } from 'worker_threads';


function factorial(n: number): number {
  if(n === 1 || n === 0){
    return 1;
  }
  return factorial(n - 1) * n;
}
 
let mainPort: MessagePort;
// message channel to send from (worker -> main)
const workerChannel = new MessageChannel()
// worker channel receive from other end
workerChannel.port1.on('message', value => {
    console.log('worker (main -> worker) ', value);
    mainPort.postMessage(factorial(value.tick))
})
// give channel port to parent
parentPort?.postMessage( { port: workerChannel.port2 }, [workerChannel.port2]);

// one time event listener, listen for main worker.postMessage
parentPort?.once('message', data => {
    console.log('worker (worker -> parentPort?.once) ');
    mainPort = data.port
})
