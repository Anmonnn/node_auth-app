import { client } from './src/utils/db.js';
import 'dotenv/config';
import { Token } from './src/models/Token.js';
import { User } from './src/models/User.js';

client.sync({ force: true }); //client
// await User.sync({ force: true });
// await Token.sync({ force: true });
// Run only from node_auth-app root

