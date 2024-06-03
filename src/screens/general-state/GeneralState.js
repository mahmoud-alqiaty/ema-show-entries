import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';
import removeIcon from '../../images/remove.png'
import editIcon from '../../images/edit.png'

import videoOne from '../../images/videoOne.png'
import videoTwo from '../../images/videoTwo.png'
import videoThree from '../../images/videoThree.png'
import videoFour from '../../images/videoFour.png'




const GeneralState = ({uploadImage, removePreviewImg}) => {
  const [genWeatherInputValue, setGenWeatherInputValue] = useState("")
  const [genWeatherPointIdnex, setGenWeatherPointIdnex] = useState(-1)

  // const [videoDelay, setVideoDelay] = useState(0)

  const {videoDelay, setVideoDelay, videoBackgroundValue, setVideoBackgroundValue, allGenWeatherPoints, setAllGenWeatherPoints, uploadGenImg, generalMaps, generalInputValue} = useContext(HomeContext)

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

  function setVideoBackgroundVlaue(e){
    const numberedValue = +(e.target.value)
    setVideoBackgroundValue(numberedValue)
}


  return (
    <>
      <div className='section home-entries'>
        <div>
          <h1>
            اعدادات عامة
          </h1>
          <div>
            <h3>
              فديو الصفحة الرئيسية
            </h3>
            <div className='videoRadio'>
                <input 
                  type="radio" 
                  onChange={setVideoBackgroundVlaue} 
                  id="videoOne" 
                  name="video_background" 
                  value="1" 
                />
                <label for="videoOne">
                    <img 
                      src={videoOne}
                      alt="videoOne"
                    />
                </label>
            </div>
            <div className='videoRadio'>
                <input type="radio" onChange={setVideoBackgroundVlaue} id="videoThree" name="video_background" value="3" />
                <label for="videoThree">
                    <img 
                      src={videoThree}
                      alt="videoThree"
                    />
                </label>
            </div>
            <div className='videoRadio'>
                <input 
                  type="radio" 
                  onChange={setVideoBackgroundVlaue} 
                  id="videoFour" 
                  name="video_background" 
                  value="4" 
                />
                <label for="videoFour">
                    <img 
                      src={videoFour}
                      alt="videoFour"
                    />
                </label>
            </div>
            <div className='videoRadio'>
              <input type="radio" onChange={setVideoBackgroundVlaue} id="videoTwo" name="video_background" value="2" />
              <label for="videoTwo">
                  <img 
                    src={videoTwo}
                    alt="videoTwo"
                  />
              </label>
            </div>
            {
              videoBackgroundValue==2? (
                <>
                  <h1>
                    بدء الفديو بعد
                  </h1>
                  <input type='number' value={videoDelay} onChange={e=>setVideoDelay(e.target.value)} />
                </>
              ):null
            }

          </div>
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