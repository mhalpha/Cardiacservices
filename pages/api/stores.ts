
import { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

const config = {
    user: 'lumadmin',
    password: '3?VV$Wnc*7re*B^4gr',
    server: 'heartfoundationstagingsql.database.windows.net',
    database: 'Cardiac-Services-Directory',
    options: {
        encrypt: true,
    },
};

const getStores = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM [dbo].[FormServices]`;  // Replace 'Stores' with your actual table name
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        sql.close();
    }
};

export default getStores;

