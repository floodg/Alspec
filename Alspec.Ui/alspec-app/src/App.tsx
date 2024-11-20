import Jobs from './components/Jobs'

const App = () => {
  return (
    <div className='py-20'>
      <div className='place-self-center'>
        <h1 className='text-3xl font-semibold'>
          <span className='text-alspec-green'>Al</span>spec <span className='text-alspec-green'>Pr</span>oducts
        </h1>
      </div>
      <Jobs/>
    </div>
  )
}

export default App
