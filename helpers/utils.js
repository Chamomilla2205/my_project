const uuid = require('uuid').v1;

module.exports = {
    nameNormalizator: (name = '') => {

        if (!name) {
            return '';
        }
        name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); //Creme brulee
        name = name.replace(/[.,{}<>$@%#&'":+;*-]/g, ' '); // John, Doe => John Doe
        name = name.split(' ').filter((char) => !!char);  // John,     Doe => [John, Doe]
        name = name.map((string) => string.toLowerCase()); //[john, Doe] => [john, doe]
        name = name.map((string) => string.charAt(0).toUpperCase() + string.slice(1)); //[john, Doe] => [john, doe]
        name = name.join(' ').trim();  // [John, Doe] => John Doe
        return name;
    },

    emailNormalizator: (email = '') => {
        if (!email) {
            return '';
        }
        email = email.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        email = email.trim();
        email = email.replace(/[,!#$%^&*()< >?:"':;}[\]{=+]/g, '');
        email = email.toLowerCase();

        return email;
    },

    _builder: (docName, itemType, itemId, dirName) => {
        const pathInStatic = path.join(dirName, `${itemId}`, `${itemType}`);
        const pathToStatic = path.join(process.cwd(), 'static', pathInStatic);
        const fileFormat = docName.split('.').pop();
        const baseName = `${uuid()}.${fileFormat}`;
        const mainPath = path.join(pathToStatic, baseName);
        const uploadPath = path.join(pathInStatic, baseName);
        return { uploadPath, mainPath, pathToStatic };
    }
}
