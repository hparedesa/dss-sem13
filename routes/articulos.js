const express= require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 6;

/**
 * @swagger
 * components:
 *  schemas:
 *      Id:
 *          type: String
 *          description: ID autogenerado (NanoId)
 *          example: XezX1p
 *      Articulos:
 *          type: object
 *          required:
 *              - id
 *              - nombre
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID autogenerado (NanoId)
 *              nombre:
 *                  type: string
 *                  description: Nome
 *              marca:
 *                  type: string
 *                  description: Marca
 *              precio:
 *                  type: decimal
 *                  description: Precio
 *              tamanio:
 *                  type: int
 *                  description: Tamaño
 *              color:
 *                  type: string
 *                  description: Color
 *              peso:
 *                  type: decimal
 *                  description: Peso
 *              disponibilidad:
 *                  type: string
 *                  description: Disponibilidad
 *          example:
 *              id: XezX1p
 *              nombre: detergente
 *              marca: Ace
 *              precio: 151
 *              tamanio: 12
 *              color: Azul
 *              peso: 120
 *              disponibilidad: Si
 */

/**
 * @swagger
 * tags:
 *  name: Articulos
 *  description: API Articulos
 */




/**
 * @swagger
 * /articulos:
 *  get:
 *      sumary: Devuelve la lista de articulos
 *      tags:   [Articulos]
 *      responses:
 *          200:
 *              description: Lista de los Articulos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Articulos'
 */
router.get("/",(req,res)=>{
    const articulos = req.app.db.get("articulos");
    res.send(articulos);
});


/**
 * @swagger
 * /articulos/{id}:
 *  get:
 *      sumary: Devuelve un articulos
 *      tags:   [Articulos]
 *      parameters:
 *          name: id
 *          in: path
 *          schema:
 *              type: string
 *          required: true
 *          description: ID autogenerado (NanoId)
 *      responses:
 *          200:
 *              description: Exito al obtener un Articulos
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Articulos'
 *          404:
 *              description: No se encontro el Articulo
 */
router.get("/:id",(req,res)=>{
    const articulo = req.app.db.get("articulos").find({id: req.params.id}).value();

    if(!articulo){
        res.sendStatus(404);
    }else{
        res.send(articulo);
    }
});

/**
 * @swagger
 * /articulos:
 *  post:
 *      sumary: Registra un articulo
 *      tags:   [Articulos]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Articulos'
 *      responses:
 *          200:
 *              description: Registra un articulos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Articulos'
 *      
 */
router.post("/",(req,res)=>{
    
    try{
        if(!req.body.nombre){
            throw new Error("No se ingreso Nombre");
        }

        const articulo = {
            id: nanoid(idLength),
            ...req.body,
        };
    
        req.app.db.get("articulos").push(articulo).write();
        res.send(articulo);
    }catch(error){
        console.log(res.status(500).send(error));
        return { error: res.status(500).send(error)};
    }
});
/**
 * @swagger
 * /articulos:
 *  put:
 *      sumary: Registra un articulo
 *      tags:   [Articulos]
 *      
 */
router.put("/:id",(req,res)=>{
    try{
        req.app.db.get("articulos")
                .find({id: req.params.id})
                .assing(req.body)
                .write();

        res.send(req.app.db.get("articulos").find({id: req.params.id}));

    }catch(error){
        return res.status(500).send(error);
    }
});
/**
 * @swagger
 * /articulos:
 *  delete:
 *      sumary: Registra un articulo
 *      tags:   [Articulos]
 *      
 */
router.delete("/:id",(req,res)=>{
    req.app.db.get("articulos").remove({id: req.params.id}).write();

    res.sendStatus(200);
});

module.exports= router;
