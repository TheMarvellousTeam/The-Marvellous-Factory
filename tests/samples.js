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
