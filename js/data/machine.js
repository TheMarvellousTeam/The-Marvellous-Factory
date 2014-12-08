module.exports = {
    'conveyor': {
        description: 'unit conveyor',
        recipes: [
            {
                inputs : {'all':1},
                outputs : {'all':1},
                delay : 120
            }
        ],
        storage: 1,
        shape:[[2,3]],
        cost: 1,
    },

    'buffer': {
        description: 'store tokens',
        recipes: [
            {
                inputs : {'all':1},
                outputs : {'all':1},
                delay : 120
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
                inputs : {
                    'B': 1,
                    'A': 2,
                },
                outputs : {
                    'C': 1,
                    //'D': 2,
                },
                delay : 200
            },
        ],
        storage: 5,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

    'cutter': {
        description: 'This fucking machine cut fucking things',
        recipes: [
            {
                inputs : {
                    'ugly fish': 1,
                },
                outputs : {
                    'cut fish': 1,
                },
                delay : 50
            },
            {
                inputs : {
                    'drunk shrimp': 1,
                },
                outputs : {
                    'cut shrimp': 1,
                },
                delay : 50
            },
        ],
        storage: 1,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

    'rice cooker': {
        description: 'Like a boiling stuff I guess, but rice on it',
        recipes: [
            {
                inputs : {
                    'rice': 8,
                },
                outputs : {
                    'cooked rice': 8,
                },
                delay : 250
            },
        ],
        storage: 8,
        shape:[
            [0,2,0],
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,3,1],
        ],
        cost: 1,
    },

}
