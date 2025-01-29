import { useNavigate } from 'react-router'
import Button from '../components/button'
import styles from '../styles/home.module.css'

import React, { useEffect, useState } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const api = window.electronAPI

  // fetch today's sales
  const [sales, setSales] = useState([])

  async function loadTodaysSales() {
    const salesData = await api.fetchTodaysSales()
    setSales(salesData)
  }

  useEffect(() => {
    loadTodaysSales()
  }, [])

  // get best sold product today
  const [bestSoldProduct, setBestSoldProduct] = useState({})

  async function fetchBestSoldProduct() {
    const bestSoldProductData = await api.fetchBestSoldProduct()
    setBestSoldProduct(bestSoldProductData)
  }

  useEffect(() => {
    fetchBestSoldProduct()
  }, [])

  return (
    <section className={styles.homeSection}>
      <section className={styles.summary}>
        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-sack-dollar"></i>
            <p>Total Sales Today</p>
          </div>
          <h1>
            <span>&#8373; </span>
            {sales.reduce((a, b) => a + b.price, 0)}
          </h1>
          <div></div>
        </div>

        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-star"></i>
            <p>Best Seller Today</p>
          </div>
          <h1>{bestSoldProduct.totalSold}</h1>
          <div className={styles.medicineName}>{bestSoldProduct.medicineName}</div>
        </div>

        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-basket-shopping-simple"></i>
            <p>Total Items Sold Today</p>
          </div>
          <h1>{sales.length}</h1>
          <div></div>
        </div>
      </section>

      <section className={styles.recentSales}>
        <div className={styles.recentSalesHeader}>
          <h1>Recent Sales</h1>
          <Button name={'Sell Item'} onclick={() => navigate('/sell')} />
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.recentSalesTable}>
            <colgroup>
              <col style={{ width: '40%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Amount Payed</th>
              </tr>
            </thead>
            <tbody>
              {sales
                ?.slice(0, 20)
                .sort((a, b) => b.dateSold.localeCompare(a.dateSold))
                .map((sale, index) => (
                  <tr key={index}>
                    <td>{sale.medicineName}</td>
                    <td>&#8373;{sale.unitPrice}</td>
                    <td>{sale.quantity}</td>
                    <td>&#8373;{sale.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
