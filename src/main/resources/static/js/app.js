var app = ( function(){

    var _listOfBlueprints;
    var _table = $('#blueprintsTable tbody');
    var _inputNombre = $('#inputNombre').val();
    var _buttonBlueprints = document.getElementById('buttonBlueprints');
    var _totalPointsLabel = $('#totalPoints');
    var _blueprintInfo = $('#blueprintInfo');

    loadEventListeners();
    function loadEventListeners(){
        if( _buttonBlueprints ){
            _buttonBlueprints.addEventListener('click', readInputData);
        }
    }

    function  updateData( totalOfPoints ){
        _totalPointsLabel.val(totalOfPoints);
        _blueprintInfo.val = _inputNombre + "blueprint's";
    }

    function readInputData(event){
        //Limpiamos los datos existentes
        _listOfBlueprints=[];
        var _totalOfPoints = 0;
        //Buscamos los blueprints segun el dato ingresado
        apimock.getBlueprintsByAuthor( _inputNombre, (error , mockDataAuthor) =>{
            mockDataAuthor.map( blueprint => {
                if( error != null ){ return;}
                const data  = {
                    name:blueprint.name,
                    numberOfPoints: blueprint.points.length
                };
                total+=data.numberOfPoints;
                _listOfBlueprints.push(blueprint);

            });

        } );

        //Lo pasamos a html
        bluePrintsHTML(total);
    }

    function bluePrintsHTML(totalOfPoints){
        // Limpiamos el contenido de la tabla HTML
        _table.empty();

        _listOfBlueprints.forEach(bluePrint => {
            const {name, numberOfPoints } = bluePrint;
            const row = document.createElement('tr');
            const button = document.createElement('button');

            button.textContent ="Open";
            button.addEventListener('click',drawBlueprint);
            row.innerHTML=`
                            <td>${name}<td>
                            <td>${numberOfPoints}<td>
                            <td>${button}<td>`;
            //Agregando a la tabla
            _table.push(row);
        });

        updateData(total);
    }

    function drawBlueprint(event){
        console.log(`dibujando ${event.target}`);
    }

    return {
            updateAuthorName : newName => {
                $('#author').val(newName);
            }
    }
})();


