class FxCommonUtil {
    checkScriptRuningOnNode() {
        const isNode =
            typeof global !== 'undefined' && {}.toString.call(global) == '[object global]';
        return isNode;
    }

    getRootObject() {
        this.checkScriptRuningOnNode() ? global : window;
    }

    createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ?
                    r :
                    (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    uniqueCode() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const ticks = (new Date()).getTime().toString();
        let code = '';
        for (let i = 0; i < characters.length; i += 2) {
            if ((i + 2) > ticks.length) continue;
            const number = parseInt(ticks.substr(i, 2));
            if (number > characters.length - 1) {
                const sNumber = number.toString();
                const one = sNumber.substr(0, 1);
                const two = sNumber.substr(1, 1);
                code += characters[parseInt(one)];
                code += characters[parseInt(two)];
            } else {
                code += characters[number];
            }
        }
        return code;
    }

    randomString(length, chars = '0123456789') {
        let result = '';
        for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    parseBoolean(val) {
        if (this.isNullOrEmpty(val))
            return false;
        val = val.toLowerCase();
        let bool;
        bool = (() => {
            switch (false) {
                case val !== 'true':
                case val !== '1':
                    return true;
                case val !== 'false':
                case val !== '0':
                    return false;
            }
        })();
        if (typeof bool === "boolean") {
            return bool;
        }
        return void 0;
    }

    wait(checkFunc) {
        return new Promise((resolve, reject) => {
            const intervalHandle = setInterval(() => {
                if (!checkFunc()) return;
                clearInterval(intervalHandle);
                resolve();
            }, 100);
        });
    }

    hashCode(val) {
        let hash = 0,
            i,
            chr;
        if (val.length === 0)
            return hash;
        for (i = 0; i < val.length; i++) {
            chr = val.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    numberFormat(value, lengthOfDecimal = 3, lengthOfWholePart = 3, sectionsDelimiter = ',', decimalDelimiter = '.') {
        if (this.isNullOrEmpty(value)) return '';
        if (typeof value == 'string') {
            value = Number(value);
        }
        const num = value
            .toFixed(Math.max(0, ~~lengthOfDecimal));
        const re = '\\d(?=(\\d{' + (lengthOfWholePart || 3) + '})+' + (lengthOfDecimal > 0 ?
            '\\D' :
            '$') + ')';
        let result = (decimalDelimiter ?
            num.replace('.', decimalDelimiter) :
            num)
            .replace(new RegExp(re, 'g'), '$&' + sectionsDelimiter);
        const results = result.split(decimalDelimiter);
        if (results.length > 1) {
            const {
                [0]: valBeforeDecimalDelimiter,
                [1]: valAfterDecimalDelimiter
            } = results;
            result = `${valBeforeDecimalDelimiter}${decimalDelimiter}${valAfterDecimalDelimiter.replace(/0+$/, '')}`;
            result = result.replace(/\.$/, '');
        }
        return result;
    };

    deNumberFormat(displayVal, sectionsDelimiter = ',', decimalDelimiter = '.') {
        if (typeof (displayVal) == 'number') return displayVal;
        let val = displayVal.toString();
        const re = new RegExp('[' + sectionsDelimiter + ']');
        do {
            val = val.replace(re, '');
        }
        while (val.indexOf(sectionsDelimiter) > -1)
        val = val.replace(new RegExp('[' + decimalDelimiter + ']'), '.');
        return Number(val);
    }

    roundTo2DecimalPlaces(val) {
        return Math.round(val * 100) / 100;
    }

    setByPath(obj, path, value) {
        const parts = path.split('.');
        let o = obj;
        if (parts.length > 1) {
            for (let i = 0; i < parts.length - 1; i++) {
                if (!o[parts[i]]) {
                    o[parts[i]] = {};
                }
                o = o[parts[i]];
            }
        }

        o[parts[parts.length - 1]] = value;
    }

    isNullOrUndefined(val) {
        return val === undefined || val === null;
    }

    isNullOrEmpty(val) {
        return this.isNullOrUndefined(val) || /^[\s]*$/.test(val);
    }

    isEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    removeEmptyProperties(obj) {
        for (let i in obj) {
            if (this.isNullOrEmpty(obj[i])) {
                delete obj[i];
            }
        }
        return obj;
    }

    isExternalLink(menu) {
        const link = menu.Link || menu.link;
        return !this.isNullOrUndefined(link) && /^https?:\/\//.test(link);
    }

    handleValueChange(value, owner, names) {
        this.setByPath(owner.state, names, value);
        owner.setState(owner.state);
    }

    capitalizeFirstLetter(val) {
        return val
            .charAt(0)
            .toUpperCase() + val.slice(1);
    }

    equal(obj1, obj2) {
        const typeOfObj1 = typeof (obj1);
        const typeOfObj2 = typeof (obj2);
        if (typeOfObj1 === typeOfObj2 && (typeOfObj1 == 'number' || typeOfObj1 == 'string' || typeOfObj1 == 'boolean')) {
            return obj1 == obj2;
        }

        //Loop through properties in object 1
        for (let p in obj1) {
            //Check property exists on both objects
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) {
                return false;
            }

            switch (typeof (obj1[p])) {
                //Deep compare objects
                case 'object':
                    if (!Object.compare(obj1[p], obj2[p]))
                        return false;
                    break;
                //Compare function code
                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString()))
                        return false;
                    break;
                //Compare values
                default:
                    if (obj1[p] != obj2[p]) {
                        return false;
                    }
            }
        }

        //Check object 2 for any extra properties
        for (let p in obj2) {
            if (typeof (obj1[p]) == 'undefined') {
                return false;
            }
        }
        return true;
    }

    makeCancelablePromise(action) {
        let hasCanceled = false;

        const promise = new Promise((resolve, reject) => {
            const warpperResolve = val => hasCanceled ? reject({
                isCanceled: true
            }) : resolve(val);
            action(warpperResolve, reject);
        });

        return {
            then(cb) {
                promise
                    .then(cb)
                    .catch(fxLogger.error);
                return this;
            },
            catch(cb) {
                promise
                    .catch(cb);
                return this;
            },
            cancel() {
                hasCanceled = true;
            }
        };
    }

    deepFind(obj, path) {
        let paths = path.split('.'),
            current = obj,
            i;

        for (let i = 0; i < paths.length; ++i) {
            if (current[paths[i]] == undefined) {
                return undefined;
            } else {
                current = current[paths[i]];
            }
        }
        return current;
    }

    flattenJson(source) {
        const serialize = (source, desc, prefix) => {
            for (let i in source) {
                const key = prefix === undefined ?
                    i :
                    prefix + '.' + i;
                if (typeof source[i] === 'object') {
                    desc = serialize(source[i], desc, key);
                } else {
                    desc[key] = source[i];
                }
            }
            return desc;
        };
        return serialize(source, []);
    }

    getLanguageResource(jsonPath, defaultText) {
        const val = allLanguageResources[jsonPath] || this.deepFind(allLanguageResources, jsonPath) || defaultText;
        return val;
    }

    convertToSlug(text) {
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    getDistance(point1, point2) {
        const rad = function (x) {
            return x * Math.PI / 180;
        };

        const R = 6378137; // Earth’s mean radius in meter
        const dLat = rad(parseFloat(point2.lat) - parseFloat(point1.lat));
        const dLong = rad(parseFloat(point2.lng) - parseFloat(point1.lng));
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(point1.lat)) * Math.cos(rad(point2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        fxLogger.info(d)
        return d; // returns the distance in meter
    }
}
module.exports = new FxCommonUtil();