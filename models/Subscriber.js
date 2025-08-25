// models/Subscriber.js
import clientPromise from '../lib/mongodb';

export async function addSubscriber(email) {
  const client = await clientPromise;
  const db = client.db('jbrand');
  const collection = db.collection('subscribers');

  // Check if email already exists
  const existingSubscriber = await collection.findOne({ email });
  if (existingSubscriber) {
    throw new Error('Email already subscribed');
  }

  // Add new subscriber
  await collection.insertOne({
    email,
    subscribedAt: new Date()
  });
}