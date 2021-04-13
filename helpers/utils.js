module.exports = {
    nameNormalizator: (name = '') => {

        if (!name) {
            return '';
        }
        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //Creme brulee
        name = name.replace(/[.,{}<>$@%#&'":;*]/g, ''); // John, Doe => John Doe
        name = name.split(' ').filter((char) => !!char)  // John,     Doe => [John, Doe]
        name = name.map((string) => string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)) //[john, Doe] => [John, Doe]
        name = name.join(' ').trim();  // [John, Doe] => John Doe
        return name;
    }
}
