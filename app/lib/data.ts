import postgres from 'postgres'; 
import { PeramTable} from './definitions';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchPerameter() {
  try {
    const perameters = await sql<PeramTable[]>`
      SELECT 
        "tbl_Peram".id,
        "tbl_Peram".test_date as date, 
        "tbl_Peram".category as peram, 
        "tbl_Peram".value as level 
      FROM "tbl_Peram"
      ORDER BY test_date DESC
    `;
    return perameters;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch perameters.');
  }
}

  export async function deletePerameter(id: number) {
    try {
      await sql`
        DELETE FROM "tbl_Peram" 
        WHERE id = ${id}
      `;
      return { success: true };
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to delete perameter.');
    }
  }

  export async function createPerameter(
    data: { date: Date; peram: string; level: number }
  ) {
    try {
      const newPerameter = await sql<PeramTable[]>`
        INSERT INTO "tbl_Peram" (test_date, category, value)
        VALUES (${data.date}, ${data.peram}, ${data.level})
        RETURNING id, test_date as date, category as peram, value as level
      `;
      return newPerameter[0];
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to create perameter.');
    }
  }
  
  export async function updatePerameter(
    data: { id: number; date: Date; peram: string; level: number }
  ) {
    try {
      const updatedPerameter = await sql<PeramTable[]>`
        UPDATE "tbl_Peram"
        SET 
          test_date = ${data.date},
          category = ${data.peram},
          value = ${data.level}
        WHERE id = ${data.id}
        RETURNING id, test_date as date, category as peram, value as level
      `;
      return updatedPerameter[0];
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to update perameter.');
    }
  }