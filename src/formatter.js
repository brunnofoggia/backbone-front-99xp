
/**
 * Model attributes formatting
 */
import _ from 'underscore-99xp';
import front from 'front-99xp';

var formatter = {model: {}, collection: {}};
formatter.model.format = {};
formatter.model.formatMe = function () {
    this.attributes = this.formatData(this.attributes, {}, 0);
}

formatter.model.formatData = function (data, options, loadOrSave = 0) {
    if (data && 'format' in this && typeof this.format === 'object' && _.size(this.format) > 0) {
        var field;
//        console.log(data);
        for (field in this.format) {
            let fieldFormatName = /\w+\[/.test(field) ? field.replace(/^(\w+)\[\d+\]/, '$1[]') : field;
            let fieldList;

//            console.log(fieldFormatName);
//            console.log(!(/.+\[\w+\]\[\d*\]/.test(fieldFormatName)));
//            continue;
            if (!(/.+\[\w+\]\[\d*\]/.test(fieldFormatName))) {
                let fieldMatch = /^\w+\[/.test(field) ? fieldFormatName.match(/^\w+\[/)[0] : field;

//                console.log(fieldFormatName);
//                console.log('-- lets see simple');
//                console.log(fieldMatch);

                fieldList = /^\w+\[/.test(field) ? this.checkPartialKeyAttrExistence(fieldMatch, data) : [fieldMatch];
//                console.log(fieldList);
            } else {
                fieldFormatName = /\[\w+\]\[\d+\]/.test(fieldFormatName) ? fieldFormatName.replace(/\[(\w+)\]\[\d+\]/, '[$1][]') : fieldFormatName;
                let fieldMatch = fieldFormatName.match(/.+\[\w+\]\[\]\[/)[0];

//                console.log('-- lets see recursive');
//                console.log(fieldMatch);
//                console.log('-- my results below');
//                fieldList = /.+\[\w+\]\[\]/.test(field) ? this.checkPartialKeyAttrExistence(fieldMatch, data) : [field];
                fieldList = this.checkPartialKeyAttrExistence(fieldMatch, data);
//                console.log('--ended in: ');
//                console.log(fieldList);
            }

            for (let x in fieldList) {
                let fieldItem = /^\w+\[/.test(fieldList[x]) ? fieldList[x] + field.match(/\[\w+\]$/)[0] : fieldList[x];
//                if(/insumo/.test(field)) {
//                    console.log('--');
//                    console.log(field);
//                    console.log(fieldItem);
//                }
                data = this.formatDataItem(fieldItem, loadOrSave, fieldFormatName, data, options);
            }
        }
    }

    return data;
}

formatter.model.formatDataItem = function (field, m=0, fieldFormatName, data, options) {
    typeof data === 'undefined' && (data = this.attributes);
    (!fieldFormatName) && (fieldFormatName = field);
    var format = this.format[fieldFormatName];
    var value = this.formatItem(field, m, data, format);
    
    if(typeof value !== 'undefined') {
        data[field] = value;
    }

    return data;
}

/**
 * format a field value
 * @param string field name of the field that will be format
 * @param int m created to relate to the moment you are at. loading data from server or sending it to it [0 => loading, 1 => sending]
 * @param object data object that contains all data from a model
 */
formatter.model.formatItem = function (field, m, data, format) {
    typeof data === 'undefined' && (data = this.attributes);
    typeof format === 'undefined' && (format = this.format[field]);

    var value = front.format(data[field], format, m);
    return value;
}

/**
 * apply format to all models into a collection
 */
formatter.collection.formatModels = function () {
    if (!this.models)
        return;
    for (let model of this.models) {
        model.formatMe();
    }
}

export default formatter;