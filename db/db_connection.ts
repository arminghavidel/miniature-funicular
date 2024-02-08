import { connect } from 'mongoose';

const dbUri = process.env.DB_URI;
if (!dbUri) {
  console.error('DB_URI environment variable is not set.');
  process.exit(1);
}

export async function connectToDatabase() {
  try {
    await connect(dbUri, {
      dbName: 'miniature-funicular',
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
}
