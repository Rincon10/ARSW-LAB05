var app = ( function(){

    var _listOfBlueprints;
    var _inputNombre;
    var _table = $('#blueprintsTable tbody');
    var _buttonBlueprints = document.getElementById('buttonBlueprints');
    var _totalPointsLabel = $('#totalPoints');
    var _bluePrintsAuthor = $('#bluePrintsAuthor');

    loadEventListeners();
    function loadEventListeners(){
        if( !_buttonBlueprints ){
            console.log('No lo encontre');
            return;
        }
        _buttonBlueprints.addEventListener('click', readInputData);
    }

    function  updateData( totalOfPoints ){
        _totalPointsLabel.text(`Total Points: ${totalOfPoints}`);
        _bluePrintsAuthor.text(`${_inputNombre} blueprint's`);
    }

    function readInputData(event){
        //Limpiamos los datos existentes
        _listOfBlueprints=[];
        _inputNombre = $('#inputNombre').val();
        //Buscamos los blueprints segun el dato ingresado
        apimock.getBlueprintsByAuthor( _inputNombre, (error , mockDataAuthor) =>{
            _listOfBlueprints = mockDataAuthor.map( blueprint => {
                if( error  ){ return;}
                const data  = {
                    name:blueprint.name,
                    numberOfPoints: blueprint.points.length
                };
                //_totalOfPoints+=data.numberOfPoints;
                return data;
            });

        } );
        _totalOfPoints = _listOfBlueprints.reduce( (total, {numberOfPoints}) => total + numberOfPoints, 0);
        //Lo pasamos a html
        bluePrintsHTML(_totalOfPoints);
    }

    function draw( bluePrintName){
        console.log(`dibujando  ${bluePrintName}`);
    }

    function bluePrintsHTML(totalOfPoints){
        updateData(totalOfPoints);
        // Limpiamos el contenido de la tabla HTML
        _table.empty();

        _listOfBlueprints.map(bluePrint => {
            const {name, numberOfPoints } = bluePrint;
            const row = document.createElement('tr');
            const button = `<button onclick="app.drawBlueprint('${name}')"> Open </button>`;
            row.innerHTML=`
                            <td>${name}</td>
                            <td>${numberOfPoints}</td>
                            <td>${button}</td>`;
            //Agregando a la tabla
            _table.append(row);
        });
        
        
    }

 

    return {
            updateAuthorName : newName => {
                $('#inputNombre').val(newName);
            },
            updateListBlueprintsByAuthor : newName => {
                $('#inputNombre').val(newName);
                readInputData();
            },
            drawBlueprint : function(name){
                draw(name);
            }
    }
})();


