const express = require('express');
const { createTicket, getTickets, updateTicket } = require('../../controllers/ticketController');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.put('/:id', auth, updateTicket);

module.exports = router;
