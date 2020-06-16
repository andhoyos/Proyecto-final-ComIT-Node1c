const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const entry = require("./entry");
const products = require("./products");

const app = express();

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layout"),
  })
);

app.set("views", path.join(__dirname, "views"));

//Ruta a recursos estatica
app.use(express.static(path.join(__dirname, "client")));

//BodyParser aplication/x-www-form-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//get a login
app.get("/", (req, res) => {
  res.render("login", {
    layout: "landing",
  });
});

//get a registro
app.get("/registro", (req, res) => {
  res.render("registro", {
    layout: "register",
  });
});

app.get("/principal", (req, res) => {
  products.getProduct((productList) =>
    res.render("principal", {
      product: productList,
    })
  );
});

app.get("/cervezas", (req, res) => {
  products.getCerveza((productList) => {
    res.render("principal", {
      product: productList,
    });
  });
});
app.get("/vinos", (req, res) => {
  products.getVino((productList) => {
    res.render("principal", {
      product: productList,
    });
  });
});
app.get("/otros", (req, res) => {
  products.getOtros((productList) => {
    res.render("principal", {
      product: productList,
    });
  });
});

app.post("/login", (req, res) => {
  console.log("login de usuario registrado");

  entry.getClient(req.body.user, (data) => {
    //conexion a base de datos
    if (!data.confirm) {
      res.render("registro", {
        layout: "register",
        message: {
          class: "warning",
          text: "no se pudo procesar el registro",
        },
      });
    }

    //verificar si el usuario ya se encuentra registrado
    if (data.user) {
      console.log(data.user);
      res.render("registro", {
        layout: "register",
        message: {
          class: "warning",
          text: "el usuario ya se encuentra registrado",
        },
      });

      return;
    }

    //verificar edad debe ser mayor o igual a 18
    if (req.body.age < 18) {
      res.render("registro", {
        layout: "register",
        message: {
          class: "warning",
          text: "No se puede registrar el usuario debe ser mayor de edad",
        },
      });
      return;
    }

    //verificar que nombre de usuario y contraseña no esten vacios
    if (
      !req.body.user ||
      !req.body.name ||
      !req.body.age ||
      !req.body.password
    ) {
      res.render("registro", {
        layout: "register",
        message: {
          class: "warning",
          text: "Debe completar todos los campos",
        },
      });
      return;
    }

    //verificar que las contraseñas sean iguales
    if (req.body.password !== req.body.confirmPassword) {
      res.render("registro", {
        layout: "register",
        message: {
          class: "warning",
          text: "las contraseñas deben ser iguales",
        },
      });
      return;
    }

    //se realiza registro de usuario
    entry.toRegister(
      req.body.user,
      req.body.name,
      req.body.age,
      req.body.password,
      (data) => {
        if (data) {
          console.log(data);
          res.render("login", {
            layout: "landing",
            message: {
              class: "approved",
              text: "Usuario registrado correctamente",
            },
          });
        }
      }
    );
  });
});

app.post("/principal", (req, res) => {
  console.log("voy a pagina principal");
  console.log(req.body);
  //validar datos de ingreso usuario y contraseña
  entry.validate(req.body.user, req.body.password, (data) => {
    if (data.confirm) {
      console.log(data.confirm);
      products.getProduct((productList) =>
        res.render("principal", {
          product: productList,
        })
      );
    } else {
      res.render("login", {
        layout: "landing",
        message: {
          class: "warning",
          text: "Error al confirmar los datos ¡Por favor intentelo nuevamente!",
        },
      });
    }
  });
});
app.post("/pago", (req, res) => {
  res.render("pago", {
    layout: "landing",
  });
});

app.listen(3330, () => {
  console.log("servidor iniciado en puerto 3330...");
});
