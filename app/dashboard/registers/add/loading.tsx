import { RegisterFormSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  <main>
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-3xl"><span className="text-gray-400">Registros / </span>Agregar</h1>
      </div>
      <RegisterFormSkeleton />
    </main>
}