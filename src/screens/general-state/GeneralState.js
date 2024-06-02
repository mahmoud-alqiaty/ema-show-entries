import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';
import removeIcon from '../../images/remove.png'
import editIcon from '../../images/edit.png'




const GeneralState = ({uploadImage, removePreviewImg}) => {
  const [genWeatherInputValue, setGenWeatherInputValue] = useState("")
  const [genWeatherPointIdnex, setGenWeatherPointIdnex] = useState(-1)

  // const [videoDelay, setVideoDelay] = useState(0)

  const {videoDelay, setVideoDelay, allGenWeatherPoints, setAllGenWeatherPoints, uploadGenImg, generalMaps, generalInputValue} = useContext(HomeContext)

  //adding general weather state
  const addWeatherPoint = () =>{
    if(genWeatherInputValue.trim() !== ""){
      if(genWeatherPointIdnex>=0){
        const editedList = allGenWeatherPoints.map((point, index)=> 
          index == genWeatherPointIdnex? genWeatherInputValue.trim() : point
        )
        setAllGenWeatherPoints([...editedList])
        console.log("no");
      }else{
        setAllGenWeatherPoints([...allGenWeatherPoints, genWeatherInputValue])
        console.log("added");
      }
      setGenWeatherInputValue("")
      setGenWeatherPointIdnex(-1)
    }
  }
  //edit general weather state
  // const editingWeatherPoint = () =>{
  //   if(genWeatherInputValue.trim() !== ""){
  //     // setAllGenWeatherPoints([...allGenWeatherPoints, genWeatherInputValue])
  //     genWeatherInputValue[index] = 
  //     setGenWeatherInputValue("")
  //   }
  // }

  const removeWeatherPoint = (index) =>{
    setAllGenWeatherPoints(allGenWeatherPoints.filter((p, pIndex)=> pIndex !== index ))
  }
  const editWeatherPoint = (index) =>{
    setGenWeatherPointIdnex(index)
    setGenWeatherInputValue(allGenWeatherPoints[index])
  }


  return (
    <>
      <div className='section home-entries'>
        <div>
          <h1>
            بدء الفديو بعد
          </h1>
            <input type='number' value={videoDelay} onChange={e=>setVideoDelay(e.target.value)} />
        </div>
        <h1 className='section-header'>
            حالة الطقس المتوقعة
        </h1>
        <div>
            <input type='text' value={genWeatherInputValue} onChange={e=>setGenWeatherInputValue(e.target.value)} />
            <button type='button' onClick={addWeatherPoint} className='adding-btn'>اضافة</button>
            {/* <button type='button' onClick={editingWeatherPoint} className='adding-btn'>تعديل</button> */}
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
                          <img
                           src={removeIcon} alt='حذف' 
                           onClick={()=>removeWeatherPoint(index)}
                           width={25}
                            height={25} 
                            style={{cursor: "pointer"}}
                           />
                          <img 
                            src={editIcon} alt='تعديل' 
                            onClick={()=>editWeatherPoint(index)} 
                            width={25}
                            height={25}
                            style={{cursor: "pointer", marginRight: "5px"}}
                          />
                          {/* <span onClick={()=>editWeatherPoint(index)}>
                            تعديل
                          </span> */}
                        </li>
                        )
                    }
                </ul>
            ):null
        }
      </div>

      <hr />


      {/* ============maps-entries============== */}
      <div className='section maps-entries d-none'>
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