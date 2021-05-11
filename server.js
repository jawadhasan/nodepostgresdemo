const http = require('http');
const port = process.env.PORT || 3000;

//pg client
const { Client } = require('pg')
const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'productsdb',
	password: 'sasa',
	port: 5432,
})
const sqlText = 'SELECT * from products' 
client.connect();

//web-server
http.createServer(function (req, res) {

	if (req.url != '/favicon.ico') {
		// do your stuffs

		client.query(sqlText, (err, resp) => {

			console.log(err ? err.stack : resp.rows) 
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(resp.rows));
			res.end();
	
		})
	}

}).listen(port, function () {
	console.log(`server is listening on port: ${port}`);
});