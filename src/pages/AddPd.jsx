


const AddPd = () => {
  return (
    <form>
      <label htmlFor="pdName">Name of PD:</label>
      <input 
      pdName='pdName'
      type='text'
      required
      onChange={(e) => setUsernameValue(e.target.value)}
      />

      <label htmlFor="pdProvider">Provider of PD:</label>
      <input 
      pdProvider='pdProvider'
      type='text'
      required
      onChange={(e) => setUsernameValue(e.target.value)}
      />
    </form>
  )
}

export default AddPd
