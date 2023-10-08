
import Select from '@/components/Select'
import React from 'react'
import useSWR from 'swr'

type model = {
  value: string
  label:string
}

export type ModelResponse = {
  modelOptions: model[]
}

const fetchModels = () => fetch("/api/getEngine").then((res) => res.json());

const ModelSelection = () => {
  const { data: models } = useSWR("models", fetchModels)
  const { data:model, mutate: setModel } = useSWR("model", {
    fallbackData: "gpt-3.5-turbo"
  })
  if (typeof models === "undefined") {
    return <div>Loading...</div>;
  }
  return (
      <div className={"w-11/12 mx-auto mt-2"}>
        <Select modelOptions={models.modelOptions} setChange={setModel} />
      </div>
  )
}

export default ModelSelection
