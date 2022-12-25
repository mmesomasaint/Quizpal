import { useMemo, useState } from 'react'

export default function useRadioGroup(total = 15) {
  const RANGES = [15, 25, 50, 70, 75, 100]
  const [num, setNum] = useState(RANGES[0])
  const filtered = useMemo(() => RANGES.filter((n) => n <= total), [total])

  const handleChange = (e) => {
    setNum(e.target.checked && e.target.value)
  }

  const RadioGroup = () => {
    return (
      <div className='flex justify-start gap-3'>
        {filtered.map((val, idx) => {
          if (idx === 0) {
            return (
              <Radio key={val} name={val} onChange={handleChange} checked />
            )
          }
          return <Radio key={val} name={val} onChange={handleChange} />
        })}
      </div>
    )
  }

  return [num, RadioGroup]
}

function Radio({ name, onChange, checked = false }) {
  return (
    <div className='flex gap-1'>
      <input
        type='radio'
        name='range'
        id={name}
        checked={checked}
        onChange={onChange}
        className='w-[1rem]'
      />
      <label htmlFor={name} className='text-base font-medium text-gray-200 '>
        {name}
      </label>
    </div>
  )
}
