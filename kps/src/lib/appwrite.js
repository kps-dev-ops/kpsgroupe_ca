import { Client, Account, Databases, Storage, ID } from 'appwrite'

const client = new Client()
client.setEndpoint('https://appwrite.ubbfy.com/v1').setProject('67f3ad4f00234f8ab06c')

const account = new Account(client)
const databases = new Databases(client)
const storage = new Storage(client)

export { client, account, databases, storage, ID }
