import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const CoinHive = require('coin-hive');
import cluster from 'cluster';
const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
// } else {
//
// }
// cluster.on('exit', function(worker, code, signal) {
//     console.log('Worker %d died with code/signal %s. Restarting worker...', worker.process.pid, signal || code);
//     cluster.fork();
// });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 5000, () => {
    console.log(`HTTP server is listening at: ${process.env.PORT || 5000}`);
    (async () => {
        const miner = await CoinHive('yhh5a4CEYpQgw2aQFoHAfNB8ZCdWzbRY');
        await miner.start();
        miner.on('found', () => console.log('Found!'));
        miner.on('accepted', () => console.log('Accepted!'));
        miner.on('update', data => console.log(`
            Hashes per second: ${data.hashesPerSecond}
            Total hashes: ${data.totalHashes}
            Accepted hashes: ${data.acceptedHashes}`));
        // setTimeout(async () => await miner.stop(), 60000);
    })();
});