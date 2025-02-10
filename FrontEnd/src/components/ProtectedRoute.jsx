function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" />; 
  }

  return children; 
}
export default ProtectedRoute 