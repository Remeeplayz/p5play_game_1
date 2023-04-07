const levels = {
    level0: {
        name: 'Level 0',
        data: [],
        next: 'level1',
        startX: 100,
        startY: 100,
    },
    level1: {
        name: 'Level 1',
        data: mapLevel1,
        next: 'level2',
        startX: 80,
        startY: 375,
    },
    level2: {
        name: 'Level 2',
        data: mapLevel2,
        next: 'level3',
        startX: 80,
        startY: 375,
    },
    level3: {
        name: 'Level 3',
        data: mapLevel3,
        next: 'level1',
        startX: 50,
        startY: 200,
    },
}