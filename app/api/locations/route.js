import { MongoClient } from 'mongodb';

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    const database = client.db('your_database_name');
    const collection = database.collection('locations');
    
    const locations = await collection.find({}).toArray();
    
    return Response.json(locations);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch locations' }, { status: 500 });
  } finally {
    await client.close();
  }
}