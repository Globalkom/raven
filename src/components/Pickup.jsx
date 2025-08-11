import React, { useState, useRef } from 'react';
import { ArrowLeft, Plus, FileText, Download, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

function Pickup() {
  const navigate = useNavigate();
  const [receiptNumber, setReceiptNumber] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employeeTeam, setEmployeeTeam] = useState('');
  const [items, setItems] = useState([{ id: 1, name: '', quantity: 1 }]);
  const [showReceipt, setShowReceipt] = useState(false);
  const itemRefs = useRef([]);

  const addItem = () => {
    const newItem = { id: Date.now(), name: '', quantity: 1 };
    setItems([...items, newItem]);
    setTimeout(() => {
      const newIndex = items.length;
      if (itemRefs.current[newIndex]) {
        itemRefs.current[newIndex].focus();
      }
    }, 50);
  };
/* test */
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === items.length - 1) {
        addItem();
      } else {
        itemRefs.current[index + 1]?.focus();
      }
    }
  };

  const generateReceipt = () => {
    setShowReceipt(true);
    setTimeout(() => {
      document.title = `Receipt ${receiptNumber || '___'} ${employeeName || '__________________'} ${employeeTeam || '__________________'}`;
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('sr-RS');

  return (
    <div className="form-container">
      <div className="form-header no-print">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>GLOBALKOM RAVEN</h2>
      </div>

      <div className="form-layout">
        <div className="form-content no-print">
          <div className="form-card compact">
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label>Receipt Number</label>
                <input 
                  type="number" 
                  value={receiptNumber} 
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  placeholder="Enter number"
                />
              </div>
              <div className="form-group">
                <label>Employee Name</label>
                <input 
                  type="text" 
                  value={employeeName} 
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Full name"
                />
              </div>
              <div className="form-group">
                <label>Team</label>
                <input 
                  type="text" 
                  value={employeeTeam} 
                  onChange={(e) => setEmployeeTeam(e.target.value)}
                  placeholder="Team name"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Equipment Items</h3>
              <div className="items-list compact">
                {items.map((item, index) => (
                  <div key={item.id} className="item-row compact">
                    <span className="item-number">{index + 1}.</span>
                    <input 
                      ref={el => itemRefs.current[index] = el}
                      type="text" 
                      value={item.name}
                      onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      placeholder="Equipment name"
                      className="item-name"
                    />
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                      min="1"
                      className="item-quantity"
                    />
                    {items.length > 1 && (
                      <button 
                        className="remove-item-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className="add-item-btn compact" onClick={addItem}>
                <Plus size={18} />
                Add Item
              </button>
            </div>

            <div className="form-actions">
              <button className="generate-btn compact" onClick={generateReceipt}>
                <FileText size={18} />
                Generate Receipt
              </button>
              {showReceipt && (
                <button className="print-btn compact" onClick={handlePrint}>
                  <Download size={18} />
                  PDF
                </button>
              )}
            </div>
          </div>
        </div>

        {showReceipt && (
          <div className="receipt-preview">
            <div className="receipt-output" id="receiptOutput">
              <div className="receipt-document">
                <div className="receipt-header">
                  <h2 className="receipt-title-left">REVERS BR. <u>{receiptNumber || '___'}</u></h2>
                  <p className="receipt-date-right">Datum {today} godine</p>
                </div>
                
                <table className="receipt-info">
                  <tbody>
                    <tr>
                      <td>Potvrđujem da sam od</td>
                      <td><b>Društvo za računarsko programiranje konsultantske i s tim povezane delatnosti GLOBALKOM D.O.O. BEOGRAD</b></td>
                    </tr>
                    <tr>
                      <td>primio/la na upotrebu za</td>
                      <td>Rad od kuće</td>
                    </tr>
                  </tbody>
                </table>

                <table className="receipt-items">
                  <thead>
                    <tr>
                      <th>Redni broj</th>
                      <th>Naziv robe</th>
                      <th>Jed. Mere</th>
                      <th>Količina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(10)].map((_, i) => {
                      const item = items[i];
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item?.name || ''}</td>
                          <td>{item?.name ? 'kom' : ''}</td>
                          <td>{item?.quantity || ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="signature-blocks">
                  <div className="signature">
                    <p>Revers izdao</p>
                    <p>Miloš Panić</p>
                    <br />
                    <p>__________________</p>
                  </div>
                  <div className="signature">
                    <p>Odobrio</p>
                    <p>Miša Mitrović</p>
                    <br />
                    <p>__________________</p>
                  </div>
                  <div className="signature">
                    <p>Robu primio/la</p>
                    <p>{employeeName || '__________________'}</p>
                    <br />
                    <p>__________________</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pickup;