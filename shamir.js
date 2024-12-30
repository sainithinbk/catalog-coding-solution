const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function calculateConstantTerm(jsonData) {
    const keys = jsonData.keys;
    const k = keys.k;
    const points = [];

    for (let i = 1; i <= k; i++) {
        const pointData = jsonData[i];
        const x = decodeValue(pointData.base, pointData.value);
        points.push([i, x]);
    }

    let c = 0;
    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let li = 1;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj] = points[j];
                li *= -xj / (xi - xj);
            }
        }
        c += yi * li;
    }

    return c;
}

fs.readFile('input1.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    const constantTerm = calculateConstantTerm(jsonData);
    console.log('secret (c) for test case 1:', constantTerm);
});

fs.readFile('input2.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        return;
    }
    const jsonData = JSON.parse(data);
    const constantTerm = calculateConstantTerm(jsonData);
    console.log('secret (c) for test case 2:', constantTerm);
});