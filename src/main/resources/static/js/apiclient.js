const apiClient = ( function(){

    function getListBlueprintsByAuthor(author, callback){
        const object = {
            url: `/blueprints/${author}`,
            contentType:`application/json`
        }
        const promise = $.get( object );

        promise.then((data) => {
            console.log(data);
            callback( author);
        }).catch( error => {
            alert(`Ocurrio el error ${error}`);
        });
    } 
    
    function getListBlueprintsByNameAndAuthor(name, author , callback){
        const object = {
            url: `/blueprints/${author}/${name}`,
            contentType:`application/json`
        }
        const promise = $.get( object );

        promise.then(() => {
            callback(name, author);
        }).catch( error => {
            alert(`Ocurrio el error ${error}`);
        });
    } 

    return {
        getBlueprintsByAuthor : author =>{
            getListBlueprintsByAuthor(author, app.setListBlueprintsByAuthor)
        },
        getBlueprintsByNameAndAuthor : (name, author) => {
            getListBlueprintsByNameAndAuthor(name, author, app.setListBlueprintsByNameAndAuthor);
        }
    }
})();