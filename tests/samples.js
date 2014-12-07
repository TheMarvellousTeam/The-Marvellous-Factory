module.exports = [
{
    label: 'one block',
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
        }
    ],
    store: [
        {
            origin: {x:25, y:25},
            type: "Truc1",
            shape: [
                [3,1,2],
                [1,1,1]
            ]
        },
        {
            origin: {x: 25, y: 75},
            type: "Truc2",
            shape: [
                [1,2,2,1],
                [3,1,1,3],
                [3,1,1,3],
                [1,1,1,1]
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
}
]
