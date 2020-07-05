const app = require('express')();
const bodyParser = require('body-parser');
const { fetchData } = require('./ebay');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
	next();
});


const sendRsp = (res) => {
	return (err, data, msg) => {
		if(err) res.status(400).send({ status:'FAILURE', data: null, err, msg });
		else res.status(200).send({ status:'SUCCESS', data, err: null, msg });
	}
}

app.get('/api/findproduct/:productid', (req, res) => {
	const cb = sendRsp(res);
	fetchData(req.params.productid).then(data => {
		cb(null, data, 'Product fetch successful');
	}).catch(err => {
		cb(err, null, 'Product fetch failed');
	})
});

app.listen(4040);
