import db from './init'

export function insertMedicine(name, description, quantity, price) {
  const stmt = db.prepare(
    `INSERT INTO medicines (name, description, quantity, price) VALUES (?, ?, ?, ?)`
  )
  try {
    const result = stmt.run(name, description, quantity, price)
    console.log('Medicine Added with ID: ', result.lastInsertRowid)
  } catch (error) {
    console.error('Error adding medicine:', error)
  }
}

export function updateMedicine(id, name, description, quantity, price) {
  const stmt = db.prepare(
    `UPDATE medicines SET name = ?, description = ?, quantity = ?, price = ? WHERE id = ?`
  )
  try {
    const result = stmt.run(name, description, quantity, price, id)
    console.log('Medicine Updated with ID: ', result.changes)
  } catch (error) {
    console.error('Error updating medicine:', error)
  }
}

export function updateMedicineQuantity(id, quantity) {
  const stmt = db.prepare(`UPDATE medicines SET quantity = ? WHERE id = ?`)
  try {
    const result = stmt.run(quantity, id)
    console.log('Medicine Quantity Updated with ID: ', result.changes)
  } catch (error) {
    console.error('Error updating medicine quantity:', error)
  }
}

export function deleteMedicine(id) {
  const stmt = db.prepare(`DELETE FROM medicines WHERE id = ?`)
  try {
    const result = stmt.run(id)
    console.log('Medicine Deleted with ID: ', result.changes)
  } catch (error) {
    console.error('Error deleting medicine:', error)
  }
}

export function getAllMedicines() {
  const stmt = db.prepare('SELECT * FROM medicines')
  const medicines = stmt.all()
  return medicines
}

export function insertSales(name, unitPrice, quantity, price, paymentMethod) {
  const stmt = db.prepare(
    `INSERT INTO sales (medicineName, unitPrice, quantity, price, paymentMethod) VALUES (?, ?, ?, ?, ?)`
  )
  try {
    const result = stmt.run(name, unitPrice, quantity, price, paymentMethod)
    console.log('Sales Added with ID: ', result.lastInsertRowid)
  } catch (error) {
    console.error('Error adding sales:', error)
  }
}

export function getAllSales() {
  const stmt = db.prepare('SELECT * FROM sales')
  const sales = stmt.all()
  return sales
}

// function to get sales by date
export function getSalesByDate(date) {
  const stmt = db.prepare('SELECT * FROM sales WHERE DATE(dateSold) = ?')
  const sales = stmt.all(date)
  return sales
}

export function getTodaysSales() {
  const stmt = db.prepare(`SELECT * FROM sales WHERE DATE(dateSold) = DATE('now')`)
  const sales = stmt.all()
  return sales
}

export function getBestSoldProductToday() {
  const stmt = db.prepare(`SELECT medicineName, SUM(quantity) AS totalSold
  FROM sales
  WHERE DATE(dateSold) = DATE('now')
  GROUP BY medicineName
  ORDER BY totalSold DESC
  LIMIT 1;`)
  const sales = stmt.get()
  return sales || { medicineName: 'No Sales Yet', totalSold: 0 }
}
