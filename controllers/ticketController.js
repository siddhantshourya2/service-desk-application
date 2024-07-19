const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  const { description, priority, category } = req.body;

  try {
    const newTicket = new Ticket({
      user: req.user.id,
      description,
      priority,
      category
    });

    const ticket = await newTicket.save();
    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTicket = async (req, res) => {
  const { status, description, priority, category } = req.body;

  try {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: { status, description, priority, category, updatedAt: Date.now() } },
      { new: true }
    );

    res.json(ticket);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
