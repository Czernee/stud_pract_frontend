const { Client } = require('pg');
const dotenv = require('dotenv');

const fetchProducts = async () => {
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    });

    try {
        await client.connect();
        const res = await client.query('SELECT * FROM products');
        console.log(JSON.stringify(res.rows)); // Выводим данные в формате JSON
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        await client.end();
    }
};
