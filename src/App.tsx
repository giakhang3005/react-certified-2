import './App.css'
import { RouterProvider } from 'react-router-dom';
import { routers } from './routers';

function App() {
  return (
    <div className='app'>
      <RouterProvider router={routers} />
    </div>
  )
}

export default App

