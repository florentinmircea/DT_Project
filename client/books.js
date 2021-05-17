const books = () => {
    get = () => {
        return axios.get("http://localhost:3000/books");
    }
    save = (book) => {
        return axios.put("http://localhost:3000/books",book);
    }
    remove = function(index){
        return axios.delete("http://localhost:3000/books/"+index);
    }
    update=function(book){
        return axios.put("http://localhost:3000/booksupdate",book);
    }
    return {
        get: get,
        save: save,
        remove: remove,
        update: update
    }
};