import styles from '../styles/sales.module.css'

import React, { useEffect, useState } from 'react'

export default function Sales() {
  // ------------------- fetch sales -------------------

  const [sales, setSales] = useState([])
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setDate(formatDate(new Date()))
  }, [])

  // ------------------- format date -------------------

  function formatDate(date) {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  // ------------------- handle date change -------------------
  function filterSales(date) {
    setDate(date)
  }

  return (
    <section className={styles.salesSection}>
      <div className={styles.top}>
        <h1 className={styles.title}>
          <hr></hr>Sales
        </h1>
        <span>View all previous sales</span>
      </div>

      <section className={styles.tableRender}>
        <div className={styles.operations}>
          <input type="date" value={date} onChange={(e) => filterSales(e.target.value)} />
        </div>
        <div className={styles.tableRestrain}>
          <table className={styles.salesTable}>
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Payment Method</th>
                <th>Date | Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Paracetamol</td>
                <td>2</td>
                <td>1.50</td>
                <td>Cash</td>
                <td>Sept 15, 2022 - 18:45</td>
              </tr>
              <tr>
                <td>Paracetamol</td>
                <td>2</td>
                <td>1.50</td>
                <td>Momo</td>
                <td>Sept 15, 2022 - 18:45</td>
              </tr>
              <tr>
                <td>Paracetamol</td>
                <td>2</td>
                <td>1.50</td>
                <td>Cash</td>
                <td>Sept 15, 2022 - 18:45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
