import { CalendarDays } from 'lucide-react'
import { useState } from 'react'

export default function AppointmentCard({ onBook }) {
  const [service, setService] = useState('Private styling')
  return (
    <div className="border border-mocha/10 bg-cream p-7 shadow-soft">
      <div className="mb-5 flex items-center gap-3"><CalendarDays className="text-leather" /><h2 className="font-serif text-3xl">Book a private appointment</h2></div>
      <p className="leading-7 text-text/62">Reserve a calm 30-minute consultation for gifting, care, or choosing a forever carry.</p>
      <select className="field mt-6" value={service} onChange={(event) => setService(event.target.value)}>
        <option>Private styling</option>
        <option>Leather care consultation</option>
        <option>Gift appointment</option>
      </select>
      <button className="btn-primary mt-5 w-full justify-center" onClick={() => onBook(service)}>Request appointment</button>
    </div>
  )
}
