"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationTahunAjaran = void 0;
const validator_1 = require("validator");
const class_validator_1 = require("class-validator");
const validationTahunAjaran = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'validationTahunAjaran',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, validationArguments) {
                    if (value === undefined || value === '') {
                        validationArguments.object[`${validationArguments.property}_error`] = `${propertyName} tidak boleh kosong`;
                        return false;
                    }
                    if (!validator_1.default.isNumeric(validator_1.default.blacklist(value, '/'))) {
                        return false;
                    }
                    if (value[4] !== '/') {
                        validationArguments.object[`${validationArguments.property}_error`] = `${propertyName} harus seperti '2020/2021'`;
                        return false;
                    }
                    const isTrue = isTahunAjaranValid(value);
                    if (!isTrue) {
                        validationArguments.object[`${validationArguments.property}_error`] = 'Tolong masukkan tahun ajaran yang benar';
                        return false;
                    }
                    return true;
                },
                defaultMessage(validationArguments) {
                    return (validationArguments.object[`${validationArguments.property}_error`] || `${propertyName} hanya diperbolehkan 0 - 9 dan '/'`);
                },
            },
        });
    };
};
exports.validationTahunAjaran = validationTahunAjaran;
const isTahunAjaranValid = (tahunAjaran) => {
    const splitTahunAjaran = tahunAjaran.split('/');
    const tahunAjaran1 = Number(splitTahunAjaran[0]);
    const tahunAjaran2 = Number(splitTahunAjaran[1]);
    const currentYear = new Date().getFullYear();
    if (tahunAjaran1 > currentYear ||
        tahunAjaran2 > currentYear + 1 ||
        tahunAjaran1 !== tahunAjaran2 - 1) {
        return false;
    }
    return true;
};
//# sourceMappingURL=validationTahunAjaran.decorator.js.map