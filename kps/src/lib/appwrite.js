import { Client, Account} from 'appwrite';

export const client = new Client();

client
  .setEndpoint('https://appwrite.ubbfy.com/v1')
  .setProject('67f3ad4f00234f8ab06c');

export const account = new Account(client);
export { ID } from 'appwrite';
