import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Calendar, Clock } from 'lucide-react'
// Email submission handled via direct mailto link to avoid backend dependencies or API failures

const services = [
  'Precision Haircut',
  'Hair Coloring / Balayage',
  'Luxury Blowout',
  'Skin & Facial Treatment',
  'Bridal & Event Styling',
  "Men's Grooming",
  'Other',
]

function FloatingField({ label, children, className = '' }) {
  return (
    <div className={`floating-label-group ${className}`}>
      {children}
      <label>{label}</label>
    </div>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    service: '', date: '', time: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required'
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone)) errs.phone = 'Valid 10-digit phone required'
    if (!formData.service) errs.service = 'Please select a service'
    if (!formData.date) errs.date = 'Please pick a date'
    if (!formData.time) errs.time = 'Please pick a time'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    
    // Construct the mailto URL
    const subject = encodeURIComponent(`New Appointment Request - ${formData.service}`)
    const body = encodeURIComponent(
      `New Appointment Request Detail:\n\n` +
      `Full Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Service: ${formData.service}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n\n` +
      `Message: ${formData.message || 'No additional message.'}`
    )
    
    const mailtoUrl = `mailto:udaythanki2@gmail.com?subject=${subject}&body=${body}`
    
    // Open the default mail client
    window.location.href = mailtoUrl
    
    // Show success state after a short delay
    setTimeout(() => {
      setStatus('success')
      setFormData({ name:'', email:'', phone:'', service:'', date:'', time:'', message:'' })
    }, 500)
  }

  const fieldError = (key) =>
    errors[key] ? <p className="text-red-400 text-xs mt-1 ml-1">{errors[key]}</p> : null

  // Min date is today
  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="contact" className="section-padding bg-[#F9F6F0] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="label-text block mb-3">Get in Touch</span>
          <div className="section-divider mx-auto mb-5" />
          <h2 className="heading-lg text-charcoal mb-4">
            Book Your{' '}
            <span className="font-['Cormorant_Garamond'] italic font-normal gold-text">
              Experience
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
            Ready for a transformation? Fill in the form below and our team 
            will confirm your appointment within 2 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden"
          style={{
            background: '#ffffff',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.12)',
          }}
        >
          {/* Gold accent top */}
          <div className="absolute top-0 left-12 right-12 h-0.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <CheckCircle size={72} style={{ color: '#D4AF37' }} />
                </motion.div>
                <h3 className="text-2xl font-bold mt-6 mb-3 text-charcoal">Appointment Requested!</h3>
                <p className="text-gray-500 max-w-sm">
                  Thank you! We've received your booking request. Our team will confirm your 
                  appointment within 2 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-gold mt-8"
                >
                  <span className="relative z-10">Book Another</span>
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                ref={formRef}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                noValidate
              >
                {/* Name */}
                <div>
                  <FloatingField label="Full Name">
                    <input type="text" name="name" placeholder=" "
                      value={formData.name} onChange={handleChange} autoComplete="name" />
                  </FloatingField>
                  {fieldError('name')}
                </div>

                {/* Email */}
                <div>
                  <FloatingField label="Email Address">
                    <input type="email" name="email" placeholder=" "
                      value={formData.email} onChange={handleChange} autoComplete="email" />
                  </FloatingField>
                  {fieldError('email')}
                </div>

                {/* Phone */}
                <div>
                  <FloatingField label="Phone Number">
                    <input type="tel" name="phone" placeholder=" "
                      value={formData.phone} onChange={handleChange} autoComplete="tel" />
                  </FloatingField>
                  {fieldError('phone')}
                </div>

                {/* Service */}
                <div>
                  <FloatingField label="Select Service">
                    <select name="service" value={formData.service} onChange={handleChange}>
                      <option value="" disabled />
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </FloatingField>
                  {fieldError('service')}
                </div>

                {/* Date */}
                <div>
                  <FloatingField label="Preferred Date">
                    <input type="date" name="date" min={today} placeholder=" "
                      value={formData.date} onChange={handleChange} />
                  </FloatingField>
                  {fieldError('date')}
                </div>

                {/* Time */}
                <div>
                  <FloatingField label="Preferred Time">
                    <input type="time" name="time" placeholder=" "
                      value={formData.time} onChange={handleChange} />
                  </FloatingField>
                  {fieldError('time')}
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <FloatingField label="Additional Notes (optional)">
                    <textarea name="message" placeholder=" " rows={4} 
                      value={formData.message} onChange={handleChange}
                      style={{ paddingTop: '1.5rem', resize: 'none' }} />
                  </FloatingField>
                </div>

                {/* Error status */}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="md:col-span-2 flex items-center gap-2 text-red-500 text-sm"
                  >
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or call us directly.
                  </motion.div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 items-center">
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-gold w-full sm:w-auto disabled:opacity-60"
                    whileHover={status !== 'loading' ? { scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.5)' } : {}}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full relative z-10" />
                        <span className="relative z-10">Sending…</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="relative z-10" />
                        <span className="relative z-10">Confirm Appointment</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center sm:text-left">
                    <Calendar size={12} className="inline mr-1" />
                    Confirmation within 2 hours · 
                    <Clock size={12} className="inline mx-1" />
                    Mon–Sun 9 AM – 9 PM
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
