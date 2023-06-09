const levels = {
    level0: {
        name: 'Level 0',
        data: [],
        next: 'level1',
        background: {
            r: 250,
            g: 200,
            b: 200,
        },
        exits: [
            {
                next: 'level1',
                pos: { x: 0, y: 0 },
                start: {x: 20, y: 210 },
            }
        ],
    },
    level1: {
        name: 'Level 1',
        data: mapLevel1,
        next: 'level2',
        background: {
            r: 200,
            g: 250,
            b: 200,
        },
        exits: [
            {
                next: 'level2',
                pos: { x: 20, y: 14 },
                start: {x: 16, y: 210 },
            },
        ],
    },
    level2: {
        name: 'Level 2',
        data: mapLevel2,
        next: 'level3',
        background: {
            r: 200,
            g: 200,
            b: 250,
        },
        exits: [
          {
            next: 'level3',
            pos: { x: 20, y: 8 },
            start: {x: 10, y: 135 },
          },
          {
            next: 'level1',
            pos: { x: -1, y: 14 },
            start: {x: 310, y: 210 },
        },
        ],
    },
    level3: {
        name: 'Level 3',
        data: mapLevel3,
        next: 'level4',
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [
         {
            next: 'level2',
            pos: { x: -1, y: 9 },
            start: {x: 310, y: 135 },
         },
         {
            next: 'level4',
            pos: { x: 11, y: 5 },
            start: {x: 310, y: 210 },
         },
       ],
    },
    level4: {
        name: 'Level 4',
        data: mapLevel4,
        next: 'level5',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [
            {
                next: 'level5',
                pos: { x: 20, y: 14 },
                start: {x: 310, y: 210 },
            },
        ],
    },
    level5: {
        name: 'Level 5',
        data: mapLevel5,
        next: 'level6',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [
            {
                next: 'level2',
                x: 3,
                y: 5,
            },
        ],
    },
    level6: {
        name: 'Level 6',
        data: mapLevel6,
        next: 'level7',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [
            {
                next: 'level7',
                x: 3,
                y: 5,
            },
        ],
    },
    level7: {
        name: 'Level 7',
        data: mapLevel7,
        next: 'level8',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level8: {
        name: 'Level 8',
        data: mapLevel8,
        next: 'level9',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level9: {
        name: 'Level 9',
        data: mapLevel9,
        next: 'level10',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level10: {
        name: 'Level 10',
        data: mapLevel10,
        next: 'level11',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level11: {
        name: 'Level 11',
        data: mapLevel11,
        next: 'level12',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level12: {
        name: 'Level 12',
        data: mapLevel12,
        next: 'level13',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level13: {
        name: 'Level 13',
        data: mapLevel13,
        next: 'level14',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level14: {
        name: 'Level 14',
        data: mapLevel14,
        next: 'level15',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
    level15: {
        name: 'Level 15',
        data: mapLevel15,
        next: 'level1',
        startX: 80,
        startY: 375,
        background: {
            r: 200,
            g: 250,
            b: 250,
        },
        exits: [],
    },
}