const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la rgrg du bite !');
});

server.listen(process.env.PORT || 3000);
