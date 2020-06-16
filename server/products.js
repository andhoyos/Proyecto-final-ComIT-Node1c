const mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";
const mongoConfig = { useUnifiedTopology: true };

/**funcion que retorna lista de productos para mostrar en al pantalla principal
 *
 * @param {function} callRes funcion_callback(resultado(array = productList
 * si no hay conexion retorna mensaje de error))
 */
const getProduct = (callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si hay error de conexion retorna mensaje de errer
    if (err) {
      callRes({
        message: {
          class: "warning",
          text: "No se pudo procesar la busqueda :(",
        },
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("products");
      clientCollection
        .find()
        .limit(12)
        .toArray((err, productList) => {
          //si no hay resultados retorna mensaje de error
          if (err) {
            callRes({
              message: {
                class: "warning",
                text: "No se pudo procesar la busqueda :(",
              },
            });
          } else {
            callRes(productList);
          }
          dataBase.close();
        });
    }
  });
};
const getCerveza = (callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si hay error de conexion retorna mensaje de errer
    if (err) {
      callRes({
        message: {
          class: "warning",
          text: "No se pudo procesar la busqueda :(",
        },
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("products");
      clientCollection
        .find({ category: /cerveza/ })
        .limit(12)
        .toArray((err, productList) => {
          //si no hay resultados retorna mensaje de error
          if (err) {
            callRes({
              message: {
                class: "warning",
                text: "No se pudo procesar la busqueda :(",
              },
            });
          } else {
            callRes(productList);
          }
          dataBase.close();
        });
    }
  });
};
const getVino = (callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si hay error de conexion retorna mensaje de errer
    if (err) {
      callRes({
        message: {
          class: "warning",
          text: "No se pudo procesar la busqueda :(",
        },
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("products");
      clientCollection
        .find({ category: /vino/ })
        .limit(12)
        .toArray((err, productList) => {
          //si no hay resultados retorna mensaje de error
          if (err) {
            callRes({
              message: {
                class: "warning",
                text: "No se pudo procesar la busqueda :(",
              },
            });
          } else {
            callRes(productList);
          }
          dataBase.close();
        });
    }
  });
};
const getOtros = (callRes) => {
  mongoClient.connect(mongoUrl, mongoConfig, (err, dataBase) => {
    //si hay error de conexion retorna mensaje de errer
    if (err) {
      callRes({
        message: {
          class: "warning",
          text: "No se pudo procesar la busqueda :(",
        },
      });
    } else {
      const clientDb = dataBase.db("clientdb");
      const clientCollection = clientDb.collection("products");
      clientCollection
        .find({ category: /otros/ })
        .limit(12)
        .toArray((err, productList) => {
          //si no hay resultados retorna mensaje de error
          if (err) {
            callRes({
              message: {
                class: "warning",
                text: "No se pudo procesar la busqueda :(",
              },
            });
          } else {
            callRes(productList);
          }
          dataBase.close();
        });
    }
  });
};
module.exports = {
  getProduct,
  getCerveza,
  getVino,
  getOtros,
};
