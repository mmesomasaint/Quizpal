import { useEffect, useMemo, useState } from 'react'

// from [{id, name}, {id, name}] to {name: {id: 0008, active: false}, name: {id: 000, active: false}}
const modData = (_) =>
  _.reduce((accumulator, value) => {
    return { ...accumulator, [value.name]: { id: value.id, active: true } }
  }, {})

export function useMultiBtnInput(texts = [{}]) {
  const newTexts = useMemo(() => modData(texts), [texts])
  const [data, setData] = useState(newTexts)

  useEffect(() => {
    setData(newTexts)
  }, [newTexts])

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: {
        ...prev[e.target.name],
        ['active']: e.target.checked,
      },
    }))
  }

  const filterActiveIds = (_data) => {
    const asArray = Object.entries(_data)
    const filterArray = asArray.filter((value) => value[1].active === true)
    const asObj = Object.fromEntries(filterArray)

    // Return just the Ids.
    return Object.values(asObj).map((value) => value.id)
  }

  const MultiBtnInput = ({ data }) => {
    const titles = Object.keys(data)

    return (
      <div className='w-full flex flex-col flex-wrap gap-3'>
        {titles.map((title) => (
          <Button
            name={title}
            key={title}
            isActive={data[title].active}
            onChange={handleChange}
          />
        ))}
      </div>
    )
  }

  return [filterActiveIds(data), () => <MultiBtnInput data={data} />]
}

function Button({ name, isActive, onChange }) {
  return (
    <div className='flex gap-3 justify-start w-fit rounded-md'>
      <input
        type='checkbox'
        name={name}
        checked={isActive}
        onChange={onChange}
        className='w-[1.5rem]'
      />
      <label
        htmlFor={name}
        className='text-base font-medium text-gray-200 leading-tight'
      >
        {name}
      </label>
    </div>
  )
}
