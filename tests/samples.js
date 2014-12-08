module.exports = [
{
    label: 'one block',
    width: 16,
    height: 16,
    blocks: [],
    store: [
        {
            origin: {x:25, y:15},
            type: "Bidule1",
            price: 1,
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:25, y:50},
            type: "Bidule2",
            price: 1,
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:25, y:90},
            type: "Truc1",
            price: 10,
            shape: [
                [1,1,2],
                [3,1,1]
            ]
        },
        {
            origin: {x: 25, y: 150},
            type: "Truc2",
            price: 25,
            shape: [
                [1,2,2,1],
                [1,1,1,1],
                [3,1,1,3],
                [1,3,3,1]
            ]
        }
    ]
},
{
    label: 'multiples blocks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [1,1,1,1],
                [0,1,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:5,y:10},
            shape: [
                [0,0,2,0],
                [1,1,1,1],
                [0,1,1,0],
                [0,0,3,0]
            ]
        }
    ]
},
{
    label: 'chained blocks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ],
            type: 'dummy'
        },
        {
            origin: {x:5,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ],
            type: 'dummy'
        },
    ]
},
{
    label: 'loop forks',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            shape: [
                [0,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,3]
            ]
        },
        {
            origin: {x:10,y:5},
            shape: [
                [2,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [3,0,0,0]
            ]
        },
        {
            origin: {x:7,y:8},
            shape: [
                [2,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,3,0,0]
            ]
        },
        {
            origin: {x:7,y:2},
            shape: [
                [0,0,2,0],
                [0,0,1,0],
                [0,1,1,0],
                [3,0,0,3]
            ]
        },
    ]
},
{
    label: 'fork entry',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            shape: [
                [0,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,0,0,3]
            ]
        },
        {
            origin: {x:10,y:5},
            shape: [
                [2,0,0,0],
                [0,1,1,0],
                [0,1,1,0],
                [3,0,0,0]
            ]
        },
        {
            origin: {x:7,y:8},
            shape: [
                [2,0,0,2],
                [0,1,1,0],
                [0,1,1,0],
                [0,3,0,0]
            ]
        },
    ]
},

{
    label: 'parallel chains',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:9,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ]
        },

        {
            origin: {x:9,y:5},
            shape: [
                [0,0,2,0],
                [0,1,1,1],
                [0,0,1,0],
                [0,0,3,0]
            ]
        },
        {
            origin: {x:5,y:8},
            shape: [
                [0,0,2,0],
                [0,0,3,0]
            ]
        },
    ]
},

{
    label: 'conveyor',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:7,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:9,y:5},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:9,y:6},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:9,y:7},
            type: 'conveyor',
            shape: [
                [2],
                [3]
            ]
        },
        {
            origin: {x:8,y:8},
            type: 'conveyor',
            shape: [
                [3,2]
            ]
        },
        {
            origin: {x:5,y:8},
            type: 'conveyor',
            shape: [
                [3,1,1,2]
            ]
        },
        {
            origin: {x:5,y:7},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },
        {
            origin: {x:5,y:6},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },
        /*
        {
            origin: {x:5,y:5},
            type: 'conveyor',
            shape: [
                [3],
                [2],
            ]
        },*/
    ]
},
{
    label: 'small conveyor',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:5,y:5},
            type: 'emiter',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
    ]
},

{
    label: 'machine1',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:4,y:7},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:3,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:3,y:7},
            type: 'emiter',
            tokenType: 'A',
            shape: [
                [0,3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'machine1',
            shape: [
                [2,1],
                [0,3],
                [2,1],
            ]
        },
        {
            origin: {x:7,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:6},
            type: 'conveyor',
            shape: [
                [2,1,1,1,3]
            ]
        },
        {
            origin: {x:12,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
    ]
},

{
    label: 'machine1',
    width: 16,
    height: 16,
    blocks: [
        {
            origin: {x:4,y:5},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:4,y:7},
            type: 'conveyor',
            shape: [
                [2,1,3]
            ]
        },
        {
            origin: {x:4,y:5},
            type: 'emiter',
            tokenType: 'B',
            shape: [
                [3]
            ]
        },
        {
            origin: {x:4,y:7},
            type: 'emiter',
            tokenType: 'A',
            shape: [
                [3]
            ]
        },
        {
            origin: {x:6,y:5},
            type: 'machine1',
            shape: [
                [2,1],
                [0,3],
                [2,1],
            ]
        },
        {
            origin: {x:7,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:8,y:6},
            type: 'conveyor',
            shape: [
                [2,1,1,1,3]
            ]
        },
        {
            origin: {x:12,y:6},
            type: 'conveyor',
            shape: [
                [2,3]
            ]
        },
        {
            origin: {x:13,y:6},
            type: 'receiver',
            shape: [
                [2,1]
            ]
        }
    ]
}

]
