import path from "path";
import { promises as fs } from 'fs';

const server = http.createServer(async (req, res) => {
    // Desestructurando de "req"
    let { url, method } = req;
  
    console.log(`📣 CLIENT-REQUEST: ${req.url} ${req.method}`);
  
    // Enrutando peticiones
    switch (url) {
      case '/':
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(`
        
        `);
        console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 200;
        // Cerrando la comunicacion
        res.end();
        break;
      case '/author':
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        let url_image = 'https://media.istockphoto.com/id/180841365/photo/hes-a-handsome-man.jpg?s=612x612&w=0&k=20&c=vjQLLI8g_a0O6_xx0plUu3CJ9AMhnSzHssLwgem8gE4=';
        // Escribiendo la respuesta
        res.write(`
        
        `);
        console.log(`📣 Respondiendo: 200 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 200;
        // Cerrando la comunicacion
        res.end();
        break;
      case "/favicon.ico":
        // Especificar la ubicación del archivo de icono
        const faviconPath = path.join(__dirname, 'favicon.ico');
        try{
          const data = await fs.readFile(faviconPath);
          res.writeHead(200, {'Content-Type': 'image/x-icon'});
          res.end(data);
        }catch (err) {
          console.error(err);
          // Peticion raiz
          // Estableciendo cabeceras
          res.setHeader('Content-Type', 'text/html');
          // Escribiendo la respuesta
          res.write(`
         
          `);
          console.log(`📣 Respondiendo: 500 ${req.url} ${req.method}`);
          console.log(`📣 error 500 ${err.messge}`);
          // Estableciendo codigo de respuesta
          res.statusCode = 500;
          // Cerrando la comunicacion
          res.end();
        }
        break
      default:
        // Peticion raiz
        // Estableciendo cabeceras
        res.setHeader('Content-Type', 'text/html');
        // Escribiendo la respuesta
        res.write(``);
        console.log(`📣 Respondiendo: 404 ${req.url} ${req.method}`);
        // Estableciendo codigo de respuesta
        res.statusCode = 404;
        // Cerrando la comunicacion
        res.end();
        break;
    }
});
