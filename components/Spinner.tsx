export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-10 h-10">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-500 rounded-full animate-spin" style={{ borderTopColor: 'transparent' }}></div>
      </div>
    </div>
  )
}

