import pool from "../../config/dbConfig.js";

export const getUserByMachineId = async (machineId) => {
  try {
    const result = await pool.query(
      `
                select u.email
                from machines m
                join admins a on m.admin_id = a.admin_id
                join auth.users u on a.supabase_uid = u.id
                where m.machine_id = $1;
            `,
      [machineId],
    );

    return result.rows[0];
  } catch (error) {
    console.error(
      "An error occured while trying to get user by machine id from the database:",
      error,
    );
    throw error;
  }
};
