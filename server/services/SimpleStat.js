class SimpleStat{

    static asc = arr => arr.sort((a, b) => a - b);

    static sum = arr => arr.reduce((a, b) => a + b, 0);

    static mean = arr => this.sum(arr) / arr.length;

    // sample standard deviation
    static std = (arr) => {
        const mu = this.mean(arr);
        const diffArr = arr.map(a => (a - mu) ** 2);
        return Math.sqrt(this.sum(diffArr) / (arr.length));
    };

    static quantile = (arr, q, isSorted =false) => {
        const sorted = isSorted? arr:this.asc(arr);
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };


}
module.exports = SimpleStat;