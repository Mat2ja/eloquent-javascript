let roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

// Collection of places in the village (as keys), with roads between them (values)
function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        // if (graph[from] == undefined) {
        if (graph[from] == null) {
            // if key doesnt have value, create an array of one element
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    // each roads will become an array of two places, we destructure that array of 2 places
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

let roadGraph = buildGraph(roads);
// Alice's House: ["Bob's House", "Cabin", "Post Office"]
// Bob's House:   ["Alice's House", "Town Hall"]
// Cabin:         ["Alice's House"]
// Daria's House: ["Ernie's House", "Town Hall"]
// Ernie's House: ["Daria's House", "Grete's House"]
// Farm:          ["Grete's House", "Marketplace"]
// Grete's House: ["Ernie's House", "Farm", "Shop"]
// Marketplace:   ["Farm", "Post Office", "Shop", "Town Hall"]
// Post Office:   ["Alice's House", "Marketplace"]
// Shop:          ["Grete's House", "Marketplace", "Town Hall"]
// Town Hall:     ["Bob's House", "Daria's House", "Marketplace", "Shop"]


//* Create a new state after each robot move
let VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place; // robot's current location
        this.parcels = parcels; // array of undelivered parcels
    }

    move(destination) {
        // Check if there is a road from current place to destitnation
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                //* if parcel isnt picekd up yet
                // (parcel's pickup place isn't the current place, so return it to unpicked and undelivered parels as is)
                if (p.place != this.place) return p;
                //* if parcel's pickup place is the current place, pick it up
                // create a new object for individual parcel, assign next place to parcels place
                // place: (next place to visit), address: (place to deliver parcel)
                //* from now one, parcel place will change everytime, cos the robot is carrying it
                return { place: destination, address: p.address };
                //* deliver the parcels (filter out parecels whose place matches adress)
                // if parcel place (next place to visit) mathces parcel destination address
            }).filter(p => p.place != p.address);

            // Create new state with the destination as the robot's new place, and a new set of parcels
            return new VillageState(destination, parcels);
        }
    }
}

// robot is a funtion passed in
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        // if no parcels left, it's done
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }

        // get object with next location (i.e {direction: 'Marketplace'})
        let action = robot(state, memory);
        // console.log('action memory', action.memory);

        // move to that location 
        // (it will return a new state with direction as a current place)
        state = state.move(action.direction);
        memory = action.memory;
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

//! Random Robot
//* function that takes a VillageState object and returns the name of the nearby place
// returns object with random place accessable from current place
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) };
}

// Create inital state (with random parcels)
VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        // Pick random parcel destination address
        let address = randomPick(Object.keys(roadGraph));
        let place;
        // repeat until parcel pickup place is different form destination address
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        // add parcel to other parcels
        parcels.push({ place, address });
    }
    // console.table(parcels);
    return new VillageState("Post Office", parcels);
};

let mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

//! Route Robot
// This robot follows the given route, passes it max of two times
function routeRobot(state, memory) {
    // if route is done, do that route again
    if (memory.length == 0) {
        memory = mailRoute;
    }
    // get next loction in the route as direction, and remove it from the route
    return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];

    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

//! Goal oriented robot - approx 16 turns
function goalOrientedRobot({ place, parcels }, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            // if the parcel hasnt been picked up yet, find route to pickup place
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            // if the parcel is picked up but not delivered, find route to delivery address
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return { direction: route[0], memory: route.slice(1) };
}

// Exercise #2
//! Faster robot
function fasterRobot(state, memory) {

}

// runRobot(VillageState.random(), randomRobot);
// runRobot(VillageState.random(), routeRobot, []);
// runRobot(VillageState.random(), goalOrientedRobot, []);

//* Exercise #1
// Same as runRobot but returns steps
function countSteps(state, robot, memory) {
    for (let steps = 0; ; steps++) {
        if (state.parcels.length == 0) {
            return steps;
        }
        let action = robot(state, memory);

        state = state.move(action.direction);
        memory = action.memory;
    }
}

// function compareRobots(robotA, memoryA, robotB, memoryB) {
//     let rounds = 100;
//     let turnsA = 0;
//     let turnsB = 0;

//     for (let i = 0; i < rounds; i++) {
//         let initalState = VillageState.random();

//         turnsA += countSteps(initalState, robotA, memoryA);
//         turnsB += countSteps(initalState, robotB, memoryB);
//     };

//     console.log(`${robotA.name} averages ${turnsA / rounds} turns.`);
//     console.log(`${robotB.name} averages ${turnsB / rounds} turns.`);
// }
// compareRobots(routeRobot, [], goalOrientedRobot, []);

function compareRobots(robotA, robotB, robotC) {
    let rounds = 100;
    let turnsA = 0, turnsB = 0, turnsC = 0;
    let memory = [];

    for (let i = 0; i < rounds; i++) {
        let initalState = VillageState.random();

        turnsA += countSteps(initalState, robotA, memory);
        turnsB += countSteps(initalState, robotB, memory);
        if (robotC) {
            turnsC += countSteps(initalState, robotC, memory);
        }
    };

    console.log(`${robotA.name} averages ${turnsA / rounds} turns.`);
    console.log(`${robotB.name} averages ${turnsB / rounds} turns.`);
    if (robotC) {
        console.log(`${robotC.name} averages ${turnsC / rounds} turns.`);
    }
}
compareRobots(randomRobot, routeRobot, goalOrientedRobot);
