// This file should be renamed to lib/mongodb.ts to enable TypeScript syntax.
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Please add your MongoDB URI to .env.local');
  } else {
    console.warn('⚠️ MongoDB URI not configured - database features will be disabled');
    // Create a dummy promise for development without MongoDB
    clientPromise = Promise.reject(new Error('MongoDB not configured'));
  }
} else {
  if (process.env.NODE_ENV === 'development') {
    // Use a global variable to preserve the connection in development
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri!, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise!;
  } else {
    // In production mode, create a new connection
    client = new MongoClient(uri!, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;