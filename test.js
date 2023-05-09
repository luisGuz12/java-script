import path from "path";
import { promises as fs } from 'fs';

global["__dirname"] = path.dirname(new URL(import.meta.url).pathname);

const requestHandler = async (req, res) => {
  // Desestructurando de "req"
  let { url, method } = req;
  console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);
const error500Path = path.join(__dirname, "./views/500.html");

  // Enrutando peticiones
  switch (url) {
          
    case '/':
          const indexPath = path.join(__dirname, "./views/index.html");
          try{
      const data = await fs.readFile(indexPath);
      res.writeHead(200,{ "Content-Type": "text/html" });
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`));
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end(data);
          }
          catch (err) {
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(` `);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break;
    case '/author':
           const authorPath = path.join(__dirname, "./views/author.html");
         try{
      const data = await fs.readFile(indexPath);
      res.writeHead(200,{ "Content-Type": "text/html" });
      console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`));
      // Estableciendo codigo de respuesta
      res.statusCode = 200;
      // Cerrando la comunicacion
      res.end(data);
          }
          catch (err) {
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(` `);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break;
    case "/favicon.ico":
  
      // Especificar la ubicación del archivo de icono
      const faviconPath = path.join(__dirname, 'favicon.ico');
      try {
        const data = await fs.readFile(faviconPath);
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end(data);
      } catch (err) {
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(` `);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
      }
      break;
    case "/message":
      // Verificando si es post
      if (method === "POST") {
        // Se crea una variable para almacenar los
        // Datos entrantes del cliente
        let body = "";
        // Se registra un manejador de eventos
        // Para la recepción de datos
        req.on("data", (data => {
          body += data;
          if (body.length > 1e6) return req.socket.destroy();
        }));
        // Se registra una manejador de eventos
        // para el termino de recepción de datos
        req.on("end", async () => {
          // Procesa el formulario
          // Mediante URLSearchParams se extraen
          // los campos del formulario
          const params = new URLSearchParams(body);
          // Se construye un objeto a partir de los datos
          // en la variable params
          const parsedParams = Object.fromEntries(params);
          // Almacenaremos en un archivo el mensaje
          await fs.writeFile('message.txt', parsedParams.message);
          console.log("📣 Archivo message.txt grabado");
        })
        // En lugar de regrear una pagina HTML
        // Realizaremos un redireccionamiento
        res.statusCode = 302;
        // Esto establece un redireccionamiento
        res.setHeader('Location', '/');
        // Se finaliza la conexion
        return res.end();
      } else {
        res.statusCode = 404;
        res.write("📣 404: Endpoint no encontrado")
        res.end();
      }
      break;
    // Continua con el defautl
    default:
            const img404 = path.join(__dirname, "/src/img_404.png")
            try{
                const data = await fs.readfile(img404);
                 res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.end(data);
      // Peticion raiz
      // Estableciendo cabeceras
      res.setHeader('Content-Type', 'text/html');
      // Escribiendo la respuesta
      res.write(` `);
      console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
      // Estableciendo codigo de respuesta
      res.statusCode = 404;
            }
          catch(err){
        console.error(err);
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(` `);
        console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 500;
        // Cerrando la comunicacion
        res.end();
          }
      break;
  }
};
