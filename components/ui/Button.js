

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick?onClick:null} className="bg-blue-500 text-white py-2 px-4 rounded">
      {children}
    </button>
  )
};

export default Button;