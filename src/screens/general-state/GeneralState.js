import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';



const GeneralState = ({uploadImage, removePreviewImg}) => {
  const [genWeatherInputValue, setGenWeatherInputValue] = useState("")

  const {allGenWeatherPoints, setAllGenWeatherPoints, uploadGenImg, generalMaps, generalInputValue} = useContext(HomeContext)

  //adding general weather state
  const addWeatherPoint = () =>{
    if(genWeatherInputValue.trim() !== ""){
      setAllGenWeatherPoints([...allGenWeatherPoints, genWeatherInputValue])
      setGenWeatherInputValue("")
    }
  }

  const removeWeatherPoint = (index) =>{
    setAllGenWeatherPoints(allGenWeatherPoints.filter((p, pIndex)=> pIndex !== index ))
  }


  return (
    <>
      <div className='section home-entries'>
        <h1 className='section-header'>
            حالة الطقس المتوقعة
        </h1>
        <div>
            <input type='text' value={genWeatherInputValue} onChange={e=>setGenWeatherInputValue(e.target.value)} />
            <button type='button' onClick={addWeatherPoint} className='adding-btn'>اضافة</button>
        </div>
        {
            allGenWeatherPoints.length ? (
                <ul className='all-weather-points'>
                    {
                        allGenWeatherPoints.map((point, index)=>
                        <li key={index}>
                          <span>
                            {point} 
                          </span>
                          <span onClick={()=>removeWeatherPoint(index)}>
                            &times;
                          </span>
                        </li>
                        )
                    }
                </ul>
            ):null
        }
      </div>

      <hr />


      {/* ============maps-entries============== */}
      <div className='section maps-entries'>
          <h1 className='section-header'>
              الخرائط
          </h1>
          <div className='allInputs-container'>
              <input type='file' onChange={(e)=>uploadImage(e.target.files[0], "general")} value={generalInputValue} />
          </div>
          <div className='allPreviews-container'>
              {
                uploadGenImg? (
                  <div className='loading-container'>
                      <ReactLoading type='spokes' color='white' height={100} width={100} />
                  </div>
                ): null
              }

              {
                generalMaps.length? (
                    <>
                        {generalMaps.map((img, index)=> 
                        <div className='priview-img-container'>
                            <img alt='' src={img} />
                            <span className='remove-icon' onClick={()=>removePreviewImg(img, "general")}>&times;</span>
                        </div> )}
                    </>

                ) : null 

              }

          </div>
      </div>

    </>
  )
}

export default GeneralState