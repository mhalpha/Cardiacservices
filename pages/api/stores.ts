
import { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

const config = {
    user: 'nhf_azure',
    password: '29{w{u4637b7CdWK',
    server: 'nhfdev.database.windows.net',
    database: 'Cardiac-Services-Directory-New-Form_NewVersion',
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
};

const getStores = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM [dbo].[CardiacServices]`; 
        res.status(200).json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        sql.close();
    }
};

export default getStores;

