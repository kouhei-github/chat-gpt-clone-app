'use client';
import {ModelResponse} from '@/components/ModelSelection'
const Select = (props: {setChange: (name: string) => {}} & ModelResponse) => {
  return (
    <select className={"py-2 text-gray-600 px-1"} onChange={(e) => props.setChange(e.target.value)}>
      {props.modelOptions.map((model, index) => (
          <option key={index} value={model.value}>{model.value}</option>
      ))}
    </select>
  )
}

export default Select
