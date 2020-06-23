const mongoClient = require("mongodb").MongoClient;
const mongoUrl =
  "mongodb+srv://andresh:andresh@cluster0-k3jlw.mongodb.net/clientdb?retryWrites=true&w=majority";
const mongoConfig = { useUnifiedTopology: true };

/**
 * funcion que verifica los datos recibidos y retorna confirmacion
 * de true o false y mensaje si hay error
 *
 * @param {string} user nombre de usuario
 * @param {string} password contraseña
 * @param {Function} callRes callback_ funcion(resultado(confirm = true/false
 * mensaje de error))
 */

const validate = (user, password, callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si no hay conexion con la base de datos se retorna mensaje de error
    if (err) {
      callRes({
        confirm: false,
        message: {
          class: "warning",
          text: "Ha ocurrido un error :( intentelo nuevamente",
        },
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("clientData");

      const consultClient = {
        user: user,
        password: password,
      };

      clientCollection.findOne(consultClient, (err, approved) => {
        //si no se pueden consultar los datos se retorna menasje de error
        if (err) {
          callRes({
            confirm: false,
            message: {
              class: "warning",
              text: "Ha ocurrido un error intentelo nuevamente",
            },
          });
        } else {
          if (!approved) {
            callRes({
              confirm: false,
              message: {
                class: "warning",
                text: "Por favor verifique los datos",
              },
            });
          } else {
            callRes({
              confirm: true,
            });
          }
        }
        dataBase.close();
      });
    }
  });
};

/**
 * consulta nombre de usuario en la base de datos
 *
 * @param {string} user nombre de usuario
 * @param {function} callRes callback_ funcion(resultado(confirm= true/false))
 */
const getClient = (user, callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    if (err) {
      callRes({
        confirm: false,
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("clientData");
      clientCollection.findOne({ user: user }, (err, result) => {
        if (err) {
          callRes({
            confirm: false,
          });
        } else {
          callRes({
            confirm: true,
            user: result,
          });
        }
        dataBase.close();
      });
    }
  });
};

/**funcion registra usuario nuevo y lo agrega a la base de datos
 *
 * @param {string} user nombre de usuario
 * @param {string} password contraseña
 * @param {string} name nombre de cliente
 * @param {number} age edad de usuario
 * @param {function} callRes funcion_callback(resultado(confirm=true/false)
 */
const toRegister = (user, name, age, password, callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si hay error de conexion con la base de datos retorna false
    if (err) {
      callRes({
        confirm: false,
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("clientData");

      const newClient = {
        user: user,
        name: name,
        age: age,
        password: password,
      };
      clientCollection.insertOne(newClient, (err, confirm) => {
        if (err) {
          callRes({
            confirm: false,
          });
        } else {
          callRes({
            confirm: true,
          });
        }
        dataBase.close();
      });
    }
  });
};

module.exports = {
  validate,
  getClient,
  toRegister,
};
