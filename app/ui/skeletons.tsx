export function LargeInputSkeleton() {
  return (
    <div className="mb-4 flex gap-6 items-center">
      <div className="block w-28 h-[30px] bg-slate-300 rounded-md border broder-gray-200"></div>
      <div className="relative flex-1 h-9">
        <div
          id="largeInputSkeleton"
          className="block w-full h-[38px] bg-slate-300 rounded-md border broder-gray-200 py-2 pl-10 outline-2"
        />
      </div>
    </div>
  )
}

export function SmallInputSkeleton() {
  return (
    <div className="mb-4 flex gap-6 items-center">
      <div className="block w-28 h-[30px] bg-slate-300 rounded-md border broder-gray-200"></div>
      <div className="relative flex-1">
        <div
          id="smallInputSkeleton"
          className="block w-[204px] h-[38px] bg-slate-300 rounded-md border broder-gray-200 py-2 pl-10 outline-2"
        >
        </div>
      </div>
    </div>  
  )
}

export function ObservationsInputSkeleton() {
  return (
    <div className="mb-4 flex gap-6 items-center">
      <div className="block w-28 h-[30px] bg-slate-300 rounded-md border broder-gray-200"></div>
      <div className="relative flex-1">
        <div
          id="smallInputSkeleton"
          className="block h-[58px] bg-slate-300 rounded-md border broder-gray-200 py-2 pl-10 outline-2"
        >
        </div>
      </div>
    </div>  
  )
}

export function ResumenOutputSkeleton() {
  return (
    <div className="mb-4 flex gap-2 items-center justify-between">
      <div className="block w-28 h-[30px] bg-slate-300 rounded-md border broder-gray-200"></div>
      <div className="relative h-9">
        <div
          id="largeInputSkeleton"
          className="block w-[194px] h-[38px] bg-slate-300 rounded-md border broder-gray-200 py-2 pl-10 outline-2"
        />
      </div>
    </div>
  )
}

export function RegisterFormSkeleton() {
  return (
    <div className="w-full rounded-md bg-gray-50 p-6 animate-pulse">
      <LargeInputSkeleton />
      <LargeInputSkeleton />
      <SmallInputSkeleton />
      <LargeInputSkeleton />
      <LargeInputSkeleton />
      <LargeInputSkeleton />
      <ObservationsInputSkeleton />
      <div className="flex flex-1 flex-col w-96">
        <ResumenOutputSkeleton />
        <ResumenOutputSkeleton />
        <ResumenOutputSkeleton />
      </div>
    </div>
  )

}