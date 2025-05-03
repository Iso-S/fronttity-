export default function CustomerForm({ customer, onChange, onSubmit, onCancel, title, submitLabel }) {
    return (
        <div className="popup-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="popup-form" style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                width: '80%',
                maxWidth: '500px'
            }}>
                <h3>{title}</h3>
                <div className="popup-form-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                }}>
                    <input type="text" name="firstname" value={customer.firstname} onChange={onChange} placeholder="First Name" />
                    <input type="text" name="lastname" value={customer.lastname} onChange={onChange} placeholder="Last Name" />
                    <input type="email" name="email" value={customer.email} onChange={onChange} placeholder="Email" />
                    <input type="text" name="phone" value={customer.phone} onChange={onChange} placeholder="Phone" />
                    <input type="text" name="streetaddress" value={customer.streetaddress} onChange={onChange} placeholder="Street Address" />
                    <input type="text" name="postcode" value={customer.postcode} onChange={onChange} placeholder="Postcode" />
                    <input type="text" name="city" value={customer.city} onChange={onChange} placeholder="City" />
                </div>
                <div className="popup-buttons" style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button onClick={onCancel} style={{
                        padding: '0.5rem 1rem',
                        cursor: 'pointer'
                    }}>Cancel</button>
                    <button onClick={onSubmit} style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}>{submitLabel}</button>
                </div>
            </div>
        </div>
    );
}