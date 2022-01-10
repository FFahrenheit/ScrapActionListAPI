exports.issueFilters = (obj) => {
    params = [];
    Object.keys(obj).forEach(key => {
        let filter;
        const value = obj[key];
        switch (key) {
            case 'id':
                filter =  `id = '${ value }'`;
                break;
            case 'customer':
                filter = `client = '${ value }'`
                break;
            case 'createdFrom':
                filter = `created >= '${ value }'`
                break;
            case 'createdTo':
                filter = `created <= '${ value }'`
                break;
            default:
                filter = `${key} LIKE '%${ value }%' COLLATE Latin1_General_CI_AI`
        }
        params.push(filter);
    });

    if(params.length > 0){
        return params.join(' AND ');
    }
    return '';
}