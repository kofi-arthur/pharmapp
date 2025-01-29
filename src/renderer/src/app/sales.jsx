import styles from '../styles/sales.module.css'

import React, { useEffect, useState } from 'react'

export default function Sales() {
  const api = window.electronAPI

  // ------------------- fetch sales -------------------
  const [sales, setSales] = useState([])
  const [date, setDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setDate(formatDate(new Date()))
    loadSales()
  }, [])

  const loadSales = async () => {
    try {
      setIsLoading(true)
      const salesData = await api.fetchTodaysSales(date)
      setSales(salesData)
    } catch (error) {
      console.log('an error occured loading sales', error)
    } finally {
      setIsLoading(false)
    }
  }

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
  async function filterSales(date) {
    setDate(date)
    const salesData = await api.fetchSalesByDate(date)
    setSales(salesData)
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
          {sales.length > 0 && (
            <table className={styles.salesTable}>
              <colgroup>
                <col style={{ width: '35%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Unit Price (&#8373;)</th>
                  <th>Qty</th>
                  <th>Price (&#8373;)</th>
                  <th>Payment Method</th>
                  <th>Date | Time</th>
                </tr>
              </thead>
              <tbody>
                {sales
                  ?.sort((a, b) => b.dateSold.localeCompare(a.dateSold))
                  .map((sale, index) => (
                    <tr key={index}>
                      <td>{sale.medicineName}</td>
                      <td>{sale.unitPrice}</td>
                      <td>{sale.quantity}</td>
                      <td>{sale.price}</td>
                      <td>{sale.paymentMethod}</td>
                      <td>{sale.dateSold}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {sales.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              No Sales Found
            </p>
          )}
        </div>
      </section>
    </section>
  )
}
