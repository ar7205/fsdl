import { useState } from 'react'
import './UserForm.css'

const INITIAL = {
  firstName: '', lastName: '', email: '', phone: '',
  dob: '', gender: '', city: '', country: '', bio: '',
}

const validate = (fields) => {
  const errs = {}
  if (!fields.firstName.trim()) errs.firstName = 'First name is required'
  if (!fields.lastName.trim()) errs.lastName = 'Last name is required'
  if (!fields.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
  if (fields.phone && !fields.phone.match(/^\+?[\d\s-]{7,15}$/)) errs.phone = 'Invalid phone number'
  if (!fields.dob) errs.dob = 'Date of birth is required'
  if (!fields.gender) errs.gender = 'Please select a gender'
  if (!fields.city.trim()) errs.city = 'City is required'
  if (!fields.country) errs.country = 'Please select a country'
  return errs
}

const COUNTRIES = ['India','United States','United Kingdom','Canada','Australia','Germany','France','Japan','Brazil','Other']

const REQUIRED_FIELDS = ['firstName','lastName','email','dob','gender','city','country']

export default function UserForm() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  const handleReset = () => { setFields(INITIAL); setErrors({}); setSubmitted(false) }

  // Calculate progress
  const filled = REQUIRED_FIELDS.filter(f => fields[f]).length
  const progress = Math.round((filled / REQUIRED_FIELDS.length) * 100)

  if (submitted) {
    return (
      <div className="form-page success-mode">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Submitted Successfully!</h2>
          <p>Your data has been recorded.</p>
          <div className="submitted-data">
            {Object.entries(fields).filter(([,v]) => v).map(([k, v]) => (
              <div key={k} className="data-row">
                <span className="data-key">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="data-val">{v}</span>
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={handleReset}>Submit Another →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="form-page">
      {/* Page header */}
      <div className="form-header">
        <div className="form-badge">⬡ Data Entry</div>
        <h1>User <em>Profile</em> Form</h1>
        <p>Complete all required fields to register your profile.</p>
      </div>

      {/* Main content: form + side panel */}
      <div className="form-content">
        <form className="user-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="field-group">
              <label>First Name *</label>
              <input name="firstName" value={fields.firstName} onChange={handleChange} placeholder="John" />
              {errors.firstName && <span className="err">{errors.firstName}</span>}
            </div>
            <div className="field-group">
              <label>Last Name *</label>
              <input name="lastName" value={fields.lastName} onChange={handleChange} placeholder="Doe" />
              {errors.lastName && <span className="err">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label>Email *</label>
              <input type="email" name="email" value={fields.email} onChange={handleChange} placeholder="john@example.com" />
              {errors.email && <span className="err">{errors.email}</span>}
            </div>
            <div className="field-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={fields.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              {errors.phone && <span className="err">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label>Date of Birth *</label>
              <input type="date" name="dob" value={fields.dob} onChange={handleChange} />
              {errors.dob && <span className="err">{errors.dob}</span>}
            </div>
            <div className="field-group">
              <label>Gender *</label>
              <select name="gender" value={fields.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
              {errors.gender && <span className="err">{errors.gender}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="field-group">
              <label>City *</label>
              <input name="city" value={fields.city} onChange={handleChange} placeholder="Mumbai" />
              {errors.city && <span className="err">{errors.city}</span>}
            </div>
            <div className="field-group">
              <label>Country *</label>
              <select name="country" value={fields.country} onChange={handleChange}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.country && <span className="err">{errors.country}</span>}
            </div>
          </div>

          <div className="field-group full">
            <label>Bio</label>
            <textarea name="bio" value={fields.bio} onChange={handleChange} rows={3} placeholder="Tell us about yourself..." />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleReset}>Reset</button>
            <button type="submit" className="btn-primary">Submit Profile →</button>
          </div>
        </form>

        {/* Side panel */}
        <div className="form-side-panel">
          <div className="progress-card">
            <div className="progress-label">Form Progress</div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-text">{filled} of {REQUIRED_FIELDS.length} required fields filled ({progress}%)</div>
          </div>

          <div className="info-card">
            <div className="info-card-title">Guidelines</div>
            <div className="info-item"><span className="dot" />Fields marked with * are required</div>
            <div className="info-item"><span className="dot" />Email must be a valid format</div>
            <div className="info-item"><span className="dot" />Phone is optional but must be valid if provided</div>
            <div className="info-item"><span className="dot" />Your data is stored locally only</div>
          </div>
        </div>
      </div>
    </div>
  )
}
