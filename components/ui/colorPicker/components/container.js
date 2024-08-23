const Container = ({children}) => {
  return(
    <div className="rounded-xl w-56 h-56 bg-slate-900 border border-slate-900 p-4 text-white">
      {children}
    </div>
  )
}

export default Container;