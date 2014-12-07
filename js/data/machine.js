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


}
