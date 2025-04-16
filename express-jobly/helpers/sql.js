const { BadRequestError } = require("../expressError");

/**
 * Helper function to generate SQL for a partial update operation.
 * 
 * This function takes an object of data to update and a mapping of JavaScript
 * property names to SQL column names, and returns an object containing:
 * - A string of SQL column assignments with parameterized values
 * - An array of values to be used with the parameterized query
 * 
 * @param {Object} dataToUpdate - Object containing the data to update
 * @param {Object} jsToSql - Mapping of JavaScript property names to SQL column names
 * @returns {Object} Object with two properties:
 *   - setCols: String of SQL column assignments (e.g., '"first_name"=$1, "age"=$2')
 *   - values: Array of values to be used in the parameterized query
 * @throws {BadRequestError} If dataToUpdate is empty
 * 
 * @example
 * sqlForPartialUpdate(
 *   { firstName: 'Aliya', age: 32 },
 *   { firstName: 'first_name' }
 * )
 * // Returns:
 * // {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ['Aliya', 32]
 * // }
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
