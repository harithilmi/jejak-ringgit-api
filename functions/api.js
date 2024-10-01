const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()

app.use(cors())
app.use(express.json())

// In-memory storage for transactions (replace this with a database in a real application)
let transactions = [
  { id: 1, description: 'Groceries', amount: 50.00, date: '2023-04-15', type: 'expense' },
  { id: 2, description: 'Salary', amount: 3000.00, date: '2023-04-01', type: 'income' },
]

// GET all transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions)
})

// POST a new transaction
app.post('/api/transactions', (req, res) => {
  const { description, amount, date, type } = req.body
  const newTransaction = {
    id: Date.now(), // Simple way to generate unique IDs
    description,
    amount,
    date,
    type
  }
  transactions.push(newTransaction)
  res.status(201).json(newTransaction)
})

// DELETE a transaction
app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = transactions.findIndex(t => t.id === id)
  if (index !== -1) {
    transactions.splice(index, 1)
    res.status(204).send()
  } else {
    res.status(404).json({ error: 'Transaction not found' })
  }
})

// For Netlify serverless functions
module.exports.handler = serverless(app)