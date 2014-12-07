var machines = {
    'conveyor': {
        description: 'unit conveyor',
        recipes: [
            {
                input : ['all'],
                output : ['all'],
                delay : 120
            }
        ],
        storage: 1,
        shape:[[2,3]],
        cost: 1,
    },

    'swichable fork': {
        description: 'fork an input into two outputs',
        recipes: [
            {
                input : ['all'],
                output : ['all'],
                delay : 120
            }
        ],
        storage: 1,
        shape:[[3,2,3]],
        cost: 1,
    },

    'switchable join': {
        description: 'join two inputs into one ouput',
        recipes: [
            {
                input : ['all'],
                output : ['all'],
                delay : 120
            }
        ],
        storage: 1,
        shape:[[2,3,2]],
        cost: 1,
    },

    'buffer': {
        description: 'store tokens',
        recipes: [
            {
                input : ['all'],
                output : ['all'],
                delay : 360
            }
        ],
        storage: 8,
        shape:[[2,1,1,3]],
        cost: 1,
    },

    'machine1': {
        description: 'a machine, whatever',
        recipes: [
            {
                input : ['raw crab'],
                output : ['washed crab'],
                delay : 360
            }
        ],
        storage: 2,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },


}
