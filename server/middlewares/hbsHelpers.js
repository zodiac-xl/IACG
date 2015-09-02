export default {
    md5map:function (file,map){
        if(map[file]){
            return map[file];
        }else{
            return file;
        }
    }
};
