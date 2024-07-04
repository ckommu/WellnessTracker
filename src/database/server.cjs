const http = require('http');
const { MongoClient } = require('mongodb');
const { Webhook } = require('svix');
require('dotenv').config({ path: './config.env' });

const DB_URL = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

const client = new MongoClient(DB_URL);

async function startServer() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Successfully connected to database!');
        const db = client.db('synergplus');

        const server = http.createServer((req, res) => {
            console.log(`Received request: ${req.method} ${req.url}`);
            console.log('Headers:', req.headers); // Log headers for verification

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, svix-signature');

            if (req.method === 'OPTIONS') {
                res.writeHead(204); // 204 = No Content
                res.end();
                return;
            }

            if (req.method === 'POST' && req.url === '/api/webhooks') {
                let body = '';

                req.on('data', chunk => {
                    body += chunk.toString();
                });

                req.on('end', async () => {
                    console.log('Received webhook data:', body);

                    try {
                        const webhook = new Webhook(CLERK_WEBHOOK_SECRET);

                        // Log headers to verify presence
                        console.log('Headers:', req.headers);

                        // Verify headers are present
                        if (!req.headers['svix-signature']) {
                            throw new Error('Missing svix-signature header');
                        }

                        const payload = webhook.verify(body, req.headers);

                        // Extract only the fields we need
                        const userData = {
                            _id: payload.data.id,
                            profileImageUrl: payload.data.profile_image_url,
                            email: payload.data.email_addresses[0]?.email_address,
                            firstName: payload.data.first_name,
                            lastName: payload.data.last_name,
                            createdAt: payload.data.created_at,
                        };

                        // Log the extracted userData for debugging
                        console.log('User data to save:', userData);

                        // Validate the required fields
                        if (!userData._id || !userData.email || !userData.createdAt) {
                            throw new Error('Missing required fields');
                        }

                        const result = await db.collection('users').insertOne(userData);
                        console.log('User data saved:', userData);

                        res.writeHead(201, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'User data saved', id: result.insertedId }));
                    } catch (error) {
                        console.error('Error saving user data:', error.message);
                        console.error('Error stack:', error.stack);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error saving user data', error: error.message }));
                    }
                });

                req.on('error', (err) => {
                    console.error('Request error:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Request error', error: err.message }));
                });
            } else {
                console.log('404 Not Found: ', req.method, req.url);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        });

        server.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
}

startServer();
console.log('Server setup complete.');
