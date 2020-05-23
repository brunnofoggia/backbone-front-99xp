
var helpers = {model_prototype: {}};

helpers.model_prototype.titleAttribute = 'title';
helpers.model_prototype.titleJoinText = ' - ';
helpers.model_prototype.getTitle = function () {
    var fields = this.titleAttribute.split('+'), title = [];

    for (let field of fields) {
        title.push(this.get(field));
    }

    return title.join(this.titleJoinText);
}

export default helpers;