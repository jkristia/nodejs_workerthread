// https://stackoverflow.com/questions/57898878/how-do-i-create-a-direct-communication-channel-between-two-worker-threads-in-nod/57899543#57899543
/*
    transferList may be a list of ArrayBuffer, MessagePort and FileHandle objects.
    After transferring, they are not usable on the sending side of the channel anymore (even if they are not contained in value)
*/

import { Worker, MessageChannel, MessagePort } from 'worker_threads';
import { Sleep } from './sleep';

// worker
const worker = new Worker('./dist/worker.js', { workerData: {} });
worker.on('exit', () => { console.log('worker exited - done') });
// message channel to send from (main -> worker)
const mainChannel = new MessageChannel();

let workerPort: MessagePort;
// one time event listener, listen for workers parentPort?.postMessage 
worker.once('message', value => {
    workerPort = value.port as MessagePort;
    console.log('main (worker.once -> main)');
})
// receive message from worker on channel
mainChannel.port1.on('message', value => {
    console.log('main (worker -> main) = ', value);
})
// initialize worker channel
worker.postMessage({ port: mainChannel.port2 }, [mainChannel.port2])

class Main {
    public async run() {
        let max = 2;
        while (max-- > 0) {
            console.log(' - ', max);
            workerPort?.postMessage({ tick: max });
            await Sleep.ms(100);
        }
    }
}

const main = async () => {
    console.log('begin');
    await new Main().run();
    worker.terminate();
    console.log('done');

    // pretend cleanup
    await Sleep.ms(100);
};
main();

