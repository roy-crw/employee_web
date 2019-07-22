

function getRedirectTo(type, header) {
    let path = '';
    if( type==='laoban' ) {
        path = '/laoban'
    } else {
        path = '/dashen'
    }

    if(!header) { // 没有头像信息，需要去补充头像信息
        path+='info';
    }
    return path;

}

exports.getRedirectTo = getRedirectTo;
