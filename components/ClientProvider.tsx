"use client"

import {Toaster} from 'react-hot-toast'

const ClientProvider = () => {
  return (
      <div>
        <Toaster position={"top-right"} />
      </div>
  )
}

export default ClientProvider
