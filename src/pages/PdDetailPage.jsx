import { useLoaderData } from "react-router-dom"



const PdDetailPage = () => {
  const { pdDetails } = useLoaderData();

  const {pd, pdDateCompleted, pdDescription, pdHours, pdProvider, pdRecommend, pdReflection} = pdDetails;

  console.log(pdRecommend)

  
  return (
    <div>
      <h1>{pd.pdName}</h1>
      <h2>Provider of PD: {pdProvider}</h2>
      <h2>Number of Hours: {pdHours}</h2>
      <h2>Date Completed: {pdDateCompleted}</h2>
      <h2>Description: {pdDescription}</h2>
      <h2>Reflection: {pdReflection}</h2>
      {pdRecommend && 
        <h2>Would you recommend: yes</h2>
      
      }
      {!pdRecommend &&
        <h2>Would you recommend: no</h2>
      }
      
    </div>
  )
}

export default PdDetailPage
