import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = 5000;

app.use(bodyParser.json());//cosumir cosas

let tacos = [
    {
        name: 'de asada',
        quantity: 5,
        pica: 'no',
        id: 1
    },
    {
        name: 'al pastor',
        quantity: 4,
        pica: 'si',
        id: 2
    },
    {
        name: 'cabeza',
        quantity: 6,
        pica: 'no',
        id: 3,
    }
];

//Metodo GET o Obtener
app.get('/', (request, response) =>{
    response.send(tacos);
});


app.get('/:id', (request, response) =>{
    const{id}=request.params;
    const taco = tacos.find(taco=>taco.id == id);//encuentra el taco con la id deseada
    response.send(taco);
});


//agregar taco
app.post('/', (request, response) =>{
    const taco = request.body;
    const {name, quantity, pica} = request.body;
    taco.id = tacos.length + 1;
    tacos.push(taco);
    response.send(taco);
});
//UPDATE
app.put('/:id',(request,response)=>{
    //busca lo que se va a actualizar
	const {id}=request.params;
	const taco=tacos.find(taco=>taco.id==id);
    //pides los cambios
    const {name, quantity, pica}=request.body;
    //aplicas los cambios
	taco.name=name;
	taco.quantity=quantity;
    taco.pica=pica;
    //miras los cambios
	response.send(taco);
});

app.delete('/',(request,response)=>{
    const{id}=request.params;
    tacos=tacos.filter(taco=>taco.id!=id);
    response.send(tacos);
});

app.listen(port, ()=> console.log(`Server started at: http://localhost:${port}`));