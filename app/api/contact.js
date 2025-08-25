// pages/api/contact.js
import { contactSchema } from '../../utils/validation';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Validate the request body
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db('jbrand');
    await db.collection('contacts').insertOne({
      ...value,
      createdAt: new Date()
    });

    return res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}