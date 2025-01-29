import styles from './addComponent.module.css'
import React, { useEffect, useState } from 'react'

export default function AddComponent({ meds, api, closeModal, medicine }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')

  // handle add medicine
  async function handleAddMedicine() {
    // check for an existing medicine witht he same name
    if (meds.find((med) => med.name === name)) {
      alert('Medicine already exists')
      return
    }
    await api.addMedicine(name, description, quantity, price)
    closeModal()
  }

  // check for the presence of a medicine
  async function checkMedicine() {
    medicine &&
      (setName(medicine.name),
      setDescription(medicine.description),
      setPrice(medicine.price),
      setQuantity(medicine.quantity))
  }

  useEffect(() => {
    checkMedicine()
  }, [])

  // handle edit medicine
  async function handleEditMedicine() {
    await api.updateMedicine(medicine.id, name, description, quantity, price)
    closeModal()
  }

  return (
    <section className={styles.addComponentSection}>
      <div className={styles.addComponent}>
        <div className={styles.title}>
          <h1>Add Component</h1>
          <i className="far fa-times" onClick={() => closeModal()}></i>
        </div>
        <div className={styles.field}>
          <label>Name</label>
          <input
            className={styles.inputField}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="eg. Paracetamol"
          />
        </div>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label>Price(&#8373;)</label>
            <input
              className={styles.inputField}
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className={styles.field}>
            <label>Quantity</label>
            <input
              className={styles.inputField}
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='eg. "Paracetamol 500mg, 10 tablets"'
            rows={5}
          ></textarea>
        </div>
        <button
          onClick={medicine ? handleEditMedicine : handleAddMedicine}
          className={styles.addComponentButton}
        >
          {medicine ? `Update Medicine` : `Add Medicine`}
        </button>
      </div>
    </section>
  )
}
