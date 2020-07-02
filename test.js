const dummy = [["Jakarta", "Bandung", "Bandung", "Surabaya"], ["Store1", "Store2", "Store3", "Store4"], ["Fashion","Fashion","Men","Sports"]]

const city = new Set(dummy[0])
const store = new Set(dummy[1])

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}
cityStore = union(city, store);
console.log(cityStore)
