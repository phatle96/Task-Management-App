export const hslToHex = (hslColor) => {
    let [h, s, l] = hslColor.match(/[0-9]+/g)
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

export const stringToPastelColor = (str, mode, lowerbound, upperbound) => {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
        result = result + str.charCodeAt(i);
    }

    if (!lowerbound) lowerbound = 0;
    if (!upperbound) upperbound = 360;

    result = (result % (upperbound - lowerbound)) + lowerbound

    switch (mode) {
        case 'hsl': {
            return `hsl(${result}, 70%,  72%)`
        }
        case 'hex': {
            let h = result
            let s = 70
            let l = 72
            l /= 100;
            const a = s * Math.min(l, 1 - l) / 100;
            const f = n => {
                const k = (n + h / 30) % 12;
                const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
            };
            return `#${f(0)}${f(8)}${f(4)}`;
        }
    }
}
