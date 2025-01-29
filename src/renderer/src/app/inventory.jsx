// import { ipcRenderer } from 'electron'
import styles from '../styles/inventory.module.css'

import React, { useEffect, useState } from 'react'

import AddComponent from '../components/addComponent'

export default function Inventory() {
  const api = window.electronAPI

  // -------------- fetch all medicines --------------
  const [allMedicines, setAllMedicines] = useState([])

  async function loadMedicines() {
    const medicines = await api.fetchMedicines()
    setAllMedicines(medicines)
  }

  useEffect(() => {
    loadMedicines()
  }, [])

  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [fileteredResults, setFileteredResults] = useState([])

  function handleSearch(e) {
    const searchValue = e.target.value.toLowerCase()
    setSearchTerm(searchValue)

    if (searchValue.trim() === '') {
      setIsSearching(false)
      setFileteredResults([]) // Reset to full list
      return
    }

    setIsSearching(true)

    // Debounce the search
    clearTimeout(window.searchTimeout)
    window.searchTimeout = setTimeout(() => {
      const searchResults = allMedicines.filter((med) =>
        med.name.toLowerCase().includes(searchValue)
      )
      setFileteredResults(searchResults)
    }, 300)
  }

  useEffect(() => {
    if (searchTerm.length === 0) {
      setIsSearching(false)
      setFileteredResults([])
    }
  }, [searchTerm])

  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  const [isDeleting, setIsDeleting] = useState(false)

  const [isViewing, setIsViewing] = useState(false)

  return (
    <>
      <section className={styles.inventorySection}>
        <div className={styles.operation}>
          <div className={styles.searchBar}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e)}
              onFocus={() => searchTerm.length > 0 && setIsSearching(true)}
              name="search"
              placeholder="Search..."
            />
            <i
              onClick={() => isSearching && setSearchTerm('')}
              className={isSearching ? 'far fa-times' : 'far fa-search'}
            ></i>
          </div>
          <button className={styles.addButton} onClick={() => setIsAdding(true)}>
            Add
          </button>
        </div>

        <div className={styles.tableContainer}>
          {!isSearching && allMedicines?.length > 0 && (
            <table>
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
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!isSearching &&
                  allMedicines
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((med, index) => (
                      <tr key={index}>
                        <td className={styles.medName}>
                          <p
                            onClick={() => {
                              setIsViewing(true), setSelectedMedicine(med)
                            }}
                          >
                            {med.name}
                          </p>
                        </td>
                        <td>{med.quantity}</td>
                        <td>&#8373; {med.price}</td>
                        <td className={styles.edit}>
                          <i
                            onClick={() => {
                              setIsEditing(true)
                              setSelectedMedicine(med)
                            }}
                            className="fal fa-pen"
                          ></i>
                        </td>
                        <td className={styles.delete}>
                          <i
                            onClick={() => {
                              setIsDeleting(true), setSelectedMedicine(med)
                            }}
                            className="fal fa-trash-can"
                          ></i>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          )}

          {isSearching && fileteredResults?.length > 0 && (
            <table>
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
                  <th>Quantity</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isSearching &&
                  fileteredResults?.map((med, index) => (
                    <tr key={index}>
                      <td className={styles.medName}>
                        <p
                          onClick={() => {
                            setIsViewing(true), setSelectedMedicine(med)
                          }}
                        >
                          {med.name}
                        </p>
                      </td>
                      <td>{med.quantity}</td>
                      <td>&#8373; {med.price}</td>
                      <td className={styles.edit}>
                        <i
                          onClick={() => {
                            setIsEditing(true)
                            setSelectedMedicine(med)
                          }}
                          className="fal fa-pen"
                        ></i>
                      </td>
                      <td className={styles.delete}>
                        <i
                          onClick={() => {
                            setIsDeleting(true), setSelectedMedicine(med)
                          }}
                          className="fal fa-trash-can"
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {!isSearching && allMedicines.length === 0 && (
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
              No Medicines Found
            </p>
          )}

          {isSearching && fileteredResults.length === 0 && (
            <p
              style={{
                textAlign: 'center',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <i style={{ fontSize: '2rem', marginBottom: '1rem' }} className="fal fa-search"></i>
              No Medicines Found
            </p>
          )}
        </div>
      </section>
      {isAdding && (
        <AddComponent
          meds={allMedicines}
          api={api}
          closeModal={() => {
            setIsAdding(false), loadMedicines()
          }}
        />
      )}
      {isEditing && (
        <AddComponent
          api={api}
          medicine={selectedMedicine}
          closeModal={() => {
            setIsEditing(false), loadMedicines(), setSelectedMedicine(null)
          }}
        />
      )}
      {isDeleting && (
        <div className={styles.deleteLayout}>
          <div className={styles.deleteContainer}>
            <p>Are you sure you want to delete this medicine?</p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsDeleting(false), setSelectedMedicine(null)
                }}
              >
                Cancel
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => {
                  api.deleteMedicine(selectedMedicine.id)
                  loadMedicines()
                  setIsDeleting(false)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isViewing && (
        <section className={styles.viewOverlay}>
          <div className={styles.medicineView}>
            <i
              className="fal fa-times"
              onClick={() => {
                setIsViewing(false), setSelectedMedicine(null)
              }}
            ></i>
            <h1>{selectedMedicine.name}</h1>
            <div className={styles.details}>
              <span>Price: </span>
              <p>GH&#8373; {selectedMedicine.price}</p>
            </div>
            <div className={styles.details}>
              <span>Quantity: </span>
              <p>{selectedMedicine.quantity}</p>
            </div>
            <div className={styles.details}>
              <span>Description: </span>
              <p>{selectedMedicine.description}</p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
