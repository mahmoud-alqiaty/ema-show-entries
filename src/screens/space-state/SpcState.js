import React, { useContext } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';



const SpcState = ({uploadImage, removePreviewImg}) => {
    
    const {mainTitle, setMainTitle, subTitle, setSubTitle, allSpcWeatherPoints, allSpcWarningPoints, spcWeatherInputValue, setSpcWeatherInputValue, spcWarningInputValue, setSpcWarningInputValue, SpcInputValue, uploadspcImg, spcMaps, setAllSpcWeatherPoints, setAllSpcWarningPoints, setStartingDay} = useContext(HomeContext)

     //adding spc weather state
     const addSpcWeatherPoint = () =>{
        if(spcWeatherInputValue.trim() !== ""){
            setAllSpcWeatherPoints([...allSpcWeatherPoints, spcWeatherInputValue])
            setSpcWeatherInputValue("")
        }
    }
    //adding spc weather warnings state
    const addSpcWeatherWarnings = () =>{
        if(spcWarningInputValue.trim() !== ""){
            setAllSpcWarningPoints([...allSpcWarningPoints, spcWarningInputValue])
            setSpcWarningInputValue("")
        }
    }

    function getRadioValue(e){
        const numberedValue = +(e.target.value)
        setStartingDay(numberedValue)
    }

    const removeWeatherPoint = (index) =>{
        setAllSpcWeatherPoints(allSpcWeatherPoints.filter((p, pIndex)=> pIndex !== index ))
    }

    const removeWeatherWarningPoint = (index) =>{
        setAllSpcWarningPoints(allSpcWarningPoints.filter((p, pIndex)=> pIndex !== index ))
    }



  return (
    <div className='section spec-weather-state'>
    <h1 className='section-header'>
        حالة خاصة
    </h1>
    <div className='title-section inner-section'>
        <div>
            <h2>عنوان رئيسي</h2>
            <div>
                <input type='text' value={mainTitle} onChange={e=>setMainTitle(e.target.value)} />
            </div>
        </div>
        <div>
            <h3>عنوان فرعي</h3>
            <div>
                <input type='text' value={subTitle} onChange={e=>setSubTitle(e.target.value)} />
            </div>

        </div>
    </div>

    <div className='content inner-section'>
        <div>
            <h3>موعد بدء الحالة من أيام التنبؤ </h3>
            <div className='spc-case-start'>
                <div>
                    <input type="radio" onChange={getRadioValue} id="firstDay" name="spcCaseStart" value="0" />
                    <label for="firstDay">اليوم الأول</label>
                </div>
                <div>
                    <input type="radio" onChange={getRadioValue} id="secondDay" name="spcCaseStart" value="2" />
                    <label for="secondDay">اليوم الثاني</label>
                </div>
                <div>
                    <input type="radio" onChange={getRadioValue} id="thirdDay" name="spcCaseStart" value="3" />
                    <label for="thirdDay">اليوم الثالث</label>
                </div>
                <div>
                    <input type="radio" onChange={getRadioValue} id="fourthDay" name="spcCaseStart" value="4" />
                    <label for="fourthDay">اليوم الرابع</label>
                </div>
                
            </div>
        </div>
        <div className='weather-state-points'>
            <h4>العناصر الرئيسية</h4>
            <div>
                <input type='text' value={spcWeatherInputValue} onChange={e=>setSpcWeatherInputValue(e.target.value)} />
                <button type='button' onClick={addSpcWeatherPoint} className='adding-btn'>اضافة</button>
            </div>
            {
                allSpcWeatherPoints.length ? (
                    <ul className='all-weather-points'>
                        {
                            allSpcWeatherPoints.map((point, index)=>
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

        <div className='warning-points'>
            <h4>تحذيرات</h4>
            <div>
                <input type='text' value={spcWarningInputValue} onChange={e=>setSpcWarningInputValue(e.target.value)} />
                <button type='button' onClick={addSpcWeatherWarnings} className='adding-btn'>اضافة</button>
            </div>
            {
                allSpcWarningPoints.length ? (
                    <ul className='all-weather-points'>
                        {
                            allSpcWarningPoints.map((point, index)=>
                            <li key={index}>
                                 <span>
                                    {point} 
                                </span>
                                <span onClick={()=>removeWeatherWarningPoint(index)}>
                                    &times;
                                </span>
                            </li>)
                        }
                    </ul>
                ):null
            }
        </div>

        <div className='maps-entries'>
            <h1 className='section-header'>
            خرائط الحالة
            </h1>
            <div className='allInputs-container'>
                <input type='file' onChange={(e)=>uploadImage(e.target.files[0], "spc")} value={SpcInputValue} />
            </div>

            <div className='allPreviews-container d-flex flex-column flex-md-row'>
                {
                    uploadspcImg? (
                        <div className='loading-container'>
                            <ReactLoading type='spokes' color='white' height={100} width={100} />
                        </div>
                    ): null
                }

                {
                    spcMaps.length? (
                        <>
                            {spcMaps.map((img, index)=> 
                            <div className='priview-img-container' key={index}>
                                <img alt='' src={img} />
                                <span className='remove-icon' onClick={()=>removePreviewImg(img, "spc")}>&times;</span>
                            </div> )}
                        </>

                    ) : null 

                }
            </div>
                    
        </div>



    </div>
</div>
  )
}

export default SpcState