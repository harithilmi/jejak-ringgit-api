const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/transactions', (req, res) => {
	res.json([
		{ id: 1, description: 'Groceries', amount: 50.00, date: '2023-04-15', type: 'expense' },
		{ id: 2, description: 'Salary', amount: 3000.00, date: '2023-04-01', type: 'income' },
	]);
});


if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// For Netlify serverless functions
module.exports.handler = serverless(app);