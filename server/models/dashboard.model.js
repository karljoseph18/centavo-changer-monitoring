import pool from "../../config/dbConfig.js";

export const getDashboardSummaryData = async (machineId) => {
  try {
    const result = await pool.query(
      `
        WITH pd AS (
        SELECT transaction_id, SUM(quantity) AS quantity
        FROM peso_dispensed
        GROUP BY transaction_id
        )
        SELECT 
        SUM(t.centavos_25_inserted) AS total_insert,
        SUM(t.centavos_25_inserted) * 0.25 AS total_value,
        SUM(COALESCE(pd.quantity, 0)) AS total_dispensed,
        COUNT(*) FILTER (
            WHERE t.transaction_date_time >= CURRENT_DATE
            AND t.transaction_date_time < CURRENT_DATE + INTERVAL '1 day'
        ) AS total_txn_today
        FROM transactions t
        LEFT JOIN pd
        ON t.transaction_id = pd.transaction_id
        WHERE t.machine_id = $1;
            `,
      [machineId],
    );

    return result.rows[0];
  } catch (error) {
    console.error(
      "An error occured while trying to get dashboard summary data from the database:",
      error,
    );
    throw error;
  }
};

export const getTxnsThisWeek = async (machineId) => {
  try {
    const result = pool.query(
      `
            select 
            extract(dow from transaction_date_time) as day_num,
            count(*) as total_txn
            from transactions 
            where machine_id = $1
            group by day_num;
        `,
      [machineId],
    );

    return (await result).rows;
  } catch (error) {
    console.error(
      "An error occured while trying to get dashboard summary data from the database:",
      error,
    );
    throw error;
  }
};

export const getCoinDistribution = async (machineId) => {
  try {
    const result = await pool.query(
      `
                select pd.peso_value, sum(coalesce(pd.quantity, 0)) as total_dispensed
                from peso_dispensed pd
                join transactions t
                on pd.transaction_id = t.transaction_id
                where t.machine_id = $1
                group by peso_value
            `,
      [machineId],
    );

    return result.rows;
  } catch (error) {
    console.error(
      "An error occured while trying to get dashboard summary data from the database:",
      error,
    );
    throw error;
  }
};
