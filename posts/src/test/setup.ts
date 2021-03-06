import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
	namespace NodeJS {
		interface Global {
			signin(username: string, admin?: boolean): string[];
		}
	}
}

let mongo: any;

jest.mock('../nats-wrapper');

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

beforeEach(async () => {
	jest.clearAllMocks();
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = (username: string, admin?: boolean) => {
	// Build a jwt payload. { id, email, username }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com',
		username,
		admin: admin || false,
	};

	// Create the JWT!
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build session object. { jwt: MY_JWT }
	const session = { jwt: token };

	// Turn that session into JSON
	const sessionJSON = JSON.stringify(session);

	// Take JSON and encode it as base64
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// return a string that the cookie with encoded base64 string
	return [`express:sess=${base64}`];
};
