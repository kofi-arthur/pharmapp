import Button from '../components/button'
import styles from '../styles/home.module.css'

import React from 'react'

export default function Home() {
  return (
    <section className={styles.homeSection}>
      <section className={styles.summary}>
        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-sack-dollar"></i>
            <p>Total Sales Today</p>
          </div>
          <h1>
            <span>&#8373;</span>9647.50
          </h1>
          <div></div>
        </div>

        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-handshake-simple"></i>
            <p>Transactions Today</p>
          </div>
          <h1>59</h1>
          <div></div>
        </div>

        <div className={styles.summaryItem}>
          <div className={styles.top}>
            <i className="fad fa-basket-shopping-simple"></i>
            <p>Total Items Sold Today</p>
          </div>
          <h1>138</h1>
          <div></div>
        </div>
      </section>

      <section className={styles.recentSales}>
        <div className={styles.recentSalesHeader}>
          <h1>Recent Sales</h1>
          <Button name={'Sell Item'} />
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.recentSalesTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 1</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
              <tr>
                <td>Product 2</td>
                <td>&#8373;50.00</td>
                <td>10</td>
                <td>&#8373;500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
