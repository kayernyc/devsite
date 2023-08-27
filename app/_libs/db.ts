import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export async function getDB() {
  return await open({
    filename: 'devdb.db',
    driver: sqlite3.Database,
  });
}
