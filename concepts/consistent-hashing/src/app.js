const ConsistentHashing = require('./libs/consistent_hashing');
const load_balancer = new ConsistentHashing(["node1", "node2", "node3", "node4", "node5"], 10, 'md5', 1500);

const nodes = {};

//incoming req or data
const chars = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const run_time_task = []

for (let i = 0; i < chars.length; i++) {
    run_time_task.push(
        new Promise((resolve, reject) => {

            setTimeout(() => {
                //get address where need to go/save
                const node = load_balancer.getNode(chars[i]);

                if (nodes[node]) {
                    nodes[node].push(chars[i]);
                } else {
                    nodes[node] = [];
                    nodes[node].push(chars[i]);
                }

                console.log(nodes)
                resolve(nodes)

            }, 1000 * i)

        })
    )
}

Promise.all(run_time_task).then(() => {
    console.log(nodes)
})