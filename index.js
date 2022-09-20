require('dotenv').config();
const { Client } = require('pg')
const sdk = require('node-appwrite')

let appwriteClient = new sdk.Client()

appwriteClient
    .setEndpoint(process.env["APPWRITE_ENDPOINT"]) // Your API Endpoint
    .setProject(process.env["APPWRITE_PROJECT_ID"]) // Your project ID
    .setKey(process.env["APPWRITE_API_KEY"]) // Your secret API key
    .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
;

const users = new sdk.Users(appwriteClient)

const client = new Client({
    user: process.env["SUPABASE_DB_USER"],
    host: process.env["SUPABASE_DB_HOST"],
    database: process.env["SUPABASE_DB_DATABASE"],
    password: process.env["SUPABASE_DB_PASSWORD"],
    port: process.env["SUPABASE_DB_PORT"],
  })

client.connect()

client.query('SELECT * FROM auth.users', async (err, res) => {
    if (err) {
        console.log(err.stack)
        client.end()
    } else {
        console.log('Recieved ' + res.rowCount + ' users')

        await Promise.all(res.rows.map(async (user) => {
            await users.createBcryptUser(
                user.id,
                user.email,
                user.encrypted_password
            )
        })).then((result) => {
            console.log('Successfully Imported ' + result.length + ' users')
            client.end()
        })
        
        client.end()
        return res.rows
    }
})