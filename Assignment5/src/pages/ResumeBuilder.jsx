import { useState } from 'react'
import './ResumeBuilder.css'

const INITIAL_RESUME = {
  name: '', title: '', email: '', phone: '', location: '', linkedin: '',
  summary: '',
  experience: [{ company: '', role: '', duration: '', description: '' }],
  education: [{ institution: '', degree: '', year: '' }],
  skills: '',
}

export default function ResumeBuilder() {
  const [data, setData] = useState(INITIAL_RESUME)
  const [activeTab, setActiveTab] = useState('personal')

  const setField = (field, value) => setData(d => ({ ...d, [field]: value }))

  const setExpField = (i, field, value) => {
    const exp = [...data.experience]
    exp[i] = { ...exp[i], [field]: value }
    setData(d => ({ ...d, experience: exp }))
  }

  const setEduField = (i, field, value) => {
    const edu = [...data.education]
    edu[i] = { ...edu[i], [field]: value }
    setData(d => ({ ...d, education: edu }))
  }

  const addExp = () => setData(d => ({ ...d, experience: [...d.experience, { company: '', role: '', duration: '', description: '' }] }))
  const addEdu = () => setData(d => ({ ...d, education: [...d.education, { institution: '', degree: '', year: '' }] }))

  const removeExp = (i) => setData(d => ({ ...d, experience: d.experience.filter((_, idx) => idx !== i) }))
  const removeEdu = (i) => setData(d => ({ ...d, education: d.education.filter((_, idx) => idx !== i) }))

  const handlePrint = () => window.print()

  return (
    <div className="resume-page">
      {/* Live Preview — LEFT */}
      <div className="resume-preview" id="resume-print">
        <div className="rv-header">
          <h2 className="rv-name">{data.name || 'Your Name'}</h2>
          <p className="rv-title">{data.title || 'Professional Title'}</p>
          <div className="rv-contacts">
            {data.email && <span>✉ {data.email}</span>}
            {data.phone && <span>📱 {data.phone}</span>}
            {data.location && <span>📍 {data.location}</span>}
            {data.linkedin && <span>🔗 {data.linkedin}</span>}
          </div>
        </div>

        {data.summary && (
          <div className="rv-section">
            <h3 className="rv-section-title">Summary</h3>
            <p className="rv-text">{data.summary}</p>
          </div>
        )}

        {data.experience.some(e => e.company || e.role) && (
          <div className="rv-section">
            <h3 className="rv-section-title">Experience</h3>
            {data.experience.map((exp, i) => (
              (exp.company || exp.role) ? (
                <div key={i} className="rv-entry">
                  <div className="rv-entry-header">
                    <strong>{exp.role || '—'}</strong>
                    <span className="rv-duration">{exp.duration}</span>
                  </div>
                  <div className="rv-company">{exp.company}</div>
                  {exp.description && <p className="rv-text">{exp.description}</p>}
                </div>
              ) : null
            ))}
          </div>
        )}

        {data.education.some(e => e.institution || e.degree) && (
          <div className="rv-section">
            <h3 className="rv-section-title">Education</h3>
            {data.education.map((edu, i) => (
              (edu.institution || edu.degree) ? (
                <div key={i} className="rv-entry">
                  <div className="rv-entry-header">
                    <strong>{edu.degree || '—'}</strong>
                    <span className="rv-duration">{edu.year}</span>
                  </div>
                  <div className="rv-company">{edu.institution}</div>
                </div>
              ) : null
            ))}
          </div>
        )}

        {data.skills && (
          <div className="rv-section">
            <h3 className="rv-section-title">Skills</h3>
            <div className="rv-skills">
              {data.skills.split(',').filter(s => s.trim()).map((skill, i) => (
                <span key={i} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Editor — RIGHT */}
      <div className="resume-editor">
        <div className="resume-editor-header">
          <div className="resume-badge">⬡ Live Editor</div>
          <h1>Resume Builder</h1>
        </div>

        {/* Tabs */}
        <div className="resume-tabs">
          {['personal', 'experience', 'education', 'skills'].map(tab => (
            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Personal Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content">
            <div className="form-row-2">
              <div className="field-group">
                <label>Full Name</label>
                <input value={data.name} onChange={e => setField('name', e.target.value)} placeholder="Paras Kore" />
              </div>
              <div className="field-group">
                <label>Professional Title</label>
                <input value={data.title} onChange={e => setField('title', e.target.value)} placeholder="Full Stack Developer" />
              </div>
            </div>
            <div className="form-row-2">
              <div className="field-group">
                <label>Email</label>
                <input value={data.email} onChange={e => setField('email', e.target.value)} placeholder="paras@example.com" />
              </div>
              <div className="field-group">
                <label>Phone</label>
                <input value={data.phone} onChange={e => setField('phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="form-row-2">
              <div className="field-group">
                <label>Location</label>
                <input value={data.location} onChange={e => setField('location', e.target.value)} placeholder="Mumbai, India" />
              </div>
              <div className="field-group">
                <label>LinkedIn</label>
                <input value={data.linkedin} onChange={e => setField('linkedin', e.target.value)} placeholder="linkedin.com/in/paras" />
              </div>
            </div>
            <div className="field-group">
              <label>Professional Summary</label>
              <textarea value={data.summary} onChange={e => setField('summary', e.target.value)} rows={4} placeholder="Brief overview of your background & goals..." />
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="tab-content">
            {data.experience.map((exp, i) => (
              <div key={i} className="entry-card">
                <div className="entry-header">
                  <span className="entry-num">#{i + 1}</span>
                  {data.experience.length > 1 && (
                    <button className="remove-btn" onClick={() => removeExp(i)}>✕</button>
                  )}
                </div>
                <div className="form-row-2">
                  <div className="field-group">
                    <label>Company</label>
                    <input value={exp.company} onChange={e => setExpField(i, 'company', e.target.value)} placeholder="Google" />
                  </div>
                  <div className="field-group">
                    <label>Role</label>
                    <input value={exp.role} onChange={e => setExpField(i, 'role', e.target.value)} placeholder="Software Engineer" />
                  </div>
                </div>
                <div className="field-group">
                  <label>Duration</label>
                  <input value={exp.duration} onChange={e => setExpField(i, 'duration', e.target.value)} placeholder="Jan 2022 – Present" />
                </div>
                <div className="field-group">
                  <label>Description</label>
                  <textarea value={exp.description} onChange={e => setExpField(i, 'description', e.target.value)} rows={3} placeholder="Key responsibilities and achievements..." />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addExp}>+ Add Experience</button>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="tab-content">
            {data.education.map((edu, i) => (
              <div key={i} className="entry-card">
                <div className="entry-header">
                  <span className="entry-num">#{i + 1}</span>
                  {data.education.length > 1 && (
                    <button className="remove-btn" onClick={() => removeEdu(i)}>✕</button>
                  )}
                </div>
                <div className="field-group">
                  <label>Institution</label>
                  <input value={edu.institution} onChange={e => setEduField(i, 'institution', e.target.value)} placeholder="IIT Bombay" />
                </div>
                <div className="form-row-2">
                  <div className="field-group">
                    <label>Degree</label>
                    <input value={edu.degree} onChange={e => setEduField(i, 'degree', e.target.value)} placeholder="B.Tech Computer Science" />
                  </div>
                  <div className="field-group">
                    <label>Year</label>
                    <input value={edu.year} onChange={e => setEduField(i, 'year', e.target.value)} placeholder="2020 – 2024" />
                  </div>
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addEdu}>+ Add Education</button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="tab-content">
            <div className="field-group">
              <label>Skills (comma-separated)</label>
              <textarea value={data.skills} onChange={e => setField('skills', e.target.value)} rows={5} placeholder="React, Node.js, Python, SQL, Git, Docker..." />
            </div>
          </div>
        )}

        <button className="print-btn" onClick={handlePrint}>🖨 Download / Print</button>
      </div>
    </div>
  )
}
