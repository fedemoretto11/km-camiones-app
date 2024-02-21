import { Button } from "./Button";
import { useState } from "react";

export function Modal() {

  const [modalOpen, setModalOpen] = useState<boolean>(true)

  const onHandleClick = () => {
    setModalOpen(false)
  }

  return (
    <>
      {
        modalOpen &&
        <main className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <section className="w-96 h-96 bg-slate-200 rounded-3xl  flex justify-between items-center flex-col gap-6">
            <h1 className="text-3xl mt-12">Modal</h1>
            <p>Registro cargado satisfactoriamente</p>
            <Button 
              type="button"
              onClick={onHandleClick}
              className="mb-6" 
            >
              Volver
            </Button>

          </section>
        </main>
      }
    </> 
  )
}