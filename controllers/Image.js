const Clarifai = require('clarifai');
const app = new Clarifai.App({
apiKey: '754423e378714156bfc4a7ee5012690b'
});
const handleApiCall = (req,res) => {
	app.models
	.predict(
	  "f76196b43bbd45c99b4f3cd8e8b40a8a",
	  req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status('400').json('Not able to work with Clarifai api'))
}
const handleImage = (req,res,db) => {
	console.log(req.body)
	const {id} = req.body
	db('users').where('id','=',id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json("Unable to get count")
	})
}

module.exports = {
	handleImage,
	handleApiCall
}