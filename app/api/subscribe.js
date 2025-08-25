// pages/api/subscribe.js
import { addSubscriber } from '../../models/Subscriber';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;
    await addSubscriber(email);
    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}