import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';

import upArrow from '../../images/up-circle.svg'
import downArrow from '../../images/down-circle.svg'

const windDirections = [
    {name: 'شمالية', angle: 180},
    {name: 'شرقية', angle: 270},
    {name: 'جنوبية', angle: 0},
    {name: 'غربية', angle: 90},
    {name: 'شمالية غربية', angle: 135},
    {name: 'شمالية شرقية', angle: 225},
    {name: 'جنوبية غربية', angle: 45},
    {name: 'جنوبية شرقية', angle: 315}, 
]


const Regions = ({setFourDayes}) => {
    const {regionsNames, regions, setRegions, phenomenaOptions, rainWeight, fourDates} = useContext(HomeContext)

    const [displayRegions, setDisplayRegions] = useState(false)


    const setRegionMaxTemp = (value, regionName, dayIndex)=>{

        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], maxTemp: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })

        setRegions(secEditedRegion)
        
    }

    const setRegionMinTemp = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], minTemp: value}
                if(dayIndex == 1){
                    singleRegion.weatherData[0] = {...singleRegion.weatherData[0], minTemp: value}
                }
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRegionPhenomena = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], icon: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRegionwind = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], wind: Math.ceil(value*1.852)}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRegionRainPercentage = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], rainPercentage: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRainingWeight = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], rainingWeight: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRegionNotes = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], notes: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setMSWindDirection = (value, regionName, dayIndex)=>{
        console.log("value: ", value);
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].ms = {...singleRegion.weatherData[dayIndex].ms, windDirection: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setMSWindSpead = (value, regionName, dayIndex, windSpeadIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].ms = 
                windSpeadIndex == 0 ?
                {...singleRegion.weatherData[dayIndex].ms,  windStart: value} :
                {...singleRegion.weatherData[dayIndex].ms,  windEnd: value} 
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setMSWave = (value, regionName, dayIndex, waveIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].ms = 
                waveIndex == 0 ?
                {...singleRegion.weatherData[dayIndex].ms,  waveStart: value} :
                {...singleRegion.weatherData[dayIndex].ms,  waveEnd: value} 
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }


    const setRSWindDirection = (value, regionName, dayIndex)=>{
        console.log("value: ", value);
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].rs = {...singleRegion.weatherData[dayIndex].rs, windDirection: value}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRSWindSpead = (value, regionName, dayIndex, windSpeadIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].rs = 
                windSpeadIndex == 0 ?
                {...singleRegion.weatherData[dayIndex].rs,  windStart: value} :
                {...singleRegion.weatherData[dayIndex].rs,  windEnd: value} 
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    const setRSWave = (value, regionName, dayIndex, waveIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                singleRegion.weatherData[dayIndex].rs = 
                waveIndex == 0 ?
                {...singleRegion.weatherData[dayIndex].rs,  waveStart: value} :
                {...singleRegion.weatherData[dayIndex].rs,  waveEnd: value} 
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }
   

    console.log("regions: ", regions);

    const handleShifttingOneDay = ()=>{
        const updatedRegions = regions.map(reg =>{
            const updatedWeatherData =  reg.weatherData.map((dayData, dayIndex)=>  (dayIndex===0? {...reg.weatherData[2], date: fourDates[0]} : dayIndex===1? {...dayData, minTemp: reg.weatherData[2].minTemp} : dayIndex===4? {...dayData} : {...reg.weatherData[dayIndex + 1]} ))

            return{...reg, weatherData: updatedWeatherData}
        })
        console.log("updatedRegions: ", updatedRegions);
        
        setRegions(updatedRegions)
    }

  return (
    <div className='section regions-entries'>
        <h1 className='section-header'>
            <p>
            حالة الطقس على مناطق الجمهورية
            </p>
            <img src={displayRegions? upArrow : downArrow} alt='' onClick={()=> setDisplayRegions(!displayRegions)} />
            
        </h1>

        <div className='mb-2'>
            <button type='button' className='submit-btn' onClick={handleShifttingOneDay}>
            إزاحة يوم
            </button>
        </div>

        <div>
            <h3>تاريخ اول يوم</h3>
            <div className="mb-3">
                <input type="date" onChange={e=>{setFourDayes(e.target.value)}} />
            </div>
        </div>
        {
            displayRegions? (
                <>
                     
                    <div>
                        {
                            regionsNames.map((regionName, regionIndex)=>
                                <div className='region' key={regionIndex}>
                                    <h2 className='region-name'>
                                        {regionName}
                                    </h2>

                                    <div className='day-section'>
                                        <h5>{fourDates.length>0 ? fourDates[0] : "اليوم الأول"}</h5>
                                        {
                                            ['صباحا', 'مساء'].map((t, periodIndex)=>
                                                <div key={t} className='day-pn-am'>
                                                    <h6>{t}</h6>
                                                    <div className='d-flex' >
                                                        <div>
                                                            <h6>الظاهرة</h6>
                                                            <select 
                                                            value={regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1].icon}  
                                                            onChange={e=>setRegionPhenomena(e.target.value, regionName, periodIndex)}
                                                            >
                                                                <option value=''>-------</option>
                                                                {
                                                                    t === 'صباحا' ? (
                                                                        <option value='مشمس'>مشمس</option>
                                                                    ) : (
                                                                        <option value='صافي'>صافي</option>
                                                                    ) 

                                                                }
                                                                {
                                                                    phenomenaOptions.map((ph, index)=>
                                                                    <option key={index} value={ph}>
                                                                        {ph}
                                                                    </option> 
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                        {
                                                            t === "صباحا" ? (
                                                                <div>
                                                                    <h6>عظمي</h6>
                                                                    <input 
                                                                    type='number'
                                                                    value={regions[regionIndex].weatherData[0].maxTemp} 
                                                                    onChange={e=>setRegionMaxTemp(e.target.value, regionName, periodIndex)} />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <h6>صغري</h6>
                                                                    <input 
                                                                    type='number'
                                                                    value={regions[regionIndex].weatherData[1].minTemp} 
                                                                    onChange={e=>setRegionMinTemp(e.target.value, regionName, periodIndex)} />
                                                                </div>
                                                            )
                                                        }
                                                        
                                                        <div>
                                                            <h6>سرعة رياح</h6>
                                                            <input 
                                                            type='number'
                                                            value={Math.floor(regions[regionIndex].weatherData[periodIndex].wind/1.852)}  
                                                            onChange={e=>setRegionwind(e.target.value, regionName, periodIndex)} 
                                                            />
                                                        </div>
                                                        {
                                                            regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1].icon === "أمطار" || regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1].icon === 'مطر رعدي' || regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1].icon === 'نشاط رياح + أمطار' ?
                                                            (
                                                                <>
                                                                <div>
                                                                    <h6>نسبة الامطار</h6>
                                                                    <input 
                                                                    type='number'
                                                                    value={regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1]?.rainPercentage}  
                                                                    onChange={e=>setRegionRainPercentage(e.target.value, regionName, periodIndex)} 
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <h6>شدة الأمطار</h6>
                                                                    <select 
                                                                    value={regions[regionIndex].weatherData[t === 'صباحا' ? 0 : 1]?.rainingWeight}  
                                                                    onChange={e=>setRainingWeight(e.target.value, regionName, periodIndex)}
                                                                    >
                                                                        <option value=''>-------</option>
                                                                        
                                                                        {
                                                                            rainWeight.map((weight, index)=>
                                                                            <option key={index} value={weight}>
                                                                                {weight}
                                                                            </option> 
                                                                            )
                                                                        }
                                                                    </select>
                                                                </div>
                                                                </>
                                                                
                                                            ):null
                                                        }
                                                        
                                                        
                                                    </div>

                                                    <div className='w-100 mt-3'>
                                                        <h6>ملاحظات</h6>
                                                        <textarea 
                                                        rows={4}
                                                        cols={50}
                                                        value={regions[regionIndex].weatherData[periodIndex]?.notes}  
                                                        onChange={e=>setRegionNotes(e.target.value, regionName, periodIndex)} 
                                                        />
                                                    </div>
                                                    {/* <DesReturn regionName={regionName} dayIndex={periodIndex} /> */}
                                                </div>
                                            )
                                        }
                                    </div>

                                    {
                                        ['اليوم الثاني', 'اليوم الثالث', 'اليوم الرابع',].map((day, dayIndex)=>
                                        <div key={dayIndex} className='day-section'>
                                            <h5>{fourDates.length>0 ? fourDates[dayIndex + 1] : day}</h5>
                                            <div>
                                                <div className='d-flex' >
                                                    <div>
                                                        <h6>الظاهرة</h6>
                                                        <select 
                                                        value={regions[regionIndex].weatherData[dayIndex + 2].icon} 
                                                        onChange={e=>setRegionPhenomena(e.target.value, regionName, dayIndex + 2)}
                                                        >
                                                            <option value=''>-------</option>
                                                            <option value='مشمس'>مشمس</option>
                                                            {
                                                                phenomenaOptions.map((ph, index)=>
                                                                    <option key={index} value={ph}>
                                                                    {ph}
                                                                    </option> 
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <h6>عظمي</h6>
                                                        <input 
                                                        type='number' 
                                                        onChange={e=>setRegionMaxTemp(e.target.value, regionName, dayIndex + 2)} 
                                                        value={regions[regionIndex].weatherData[dayIndex + 2].maxTemp} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6>صغري</h6>
                                                        <input 
                                                        type='number' 
                                                        onChange={e=>setRegionMinTemp(e.target.value, regionName, dayIndex + 2)}
                                                        value={regions[regionIndex].weatherData[dayIndex + 2].minTemp}  
                                                        />
                                                    </div>
                                                    <div>
                                                        <h6>سرعة رياح</h6>
                                                        <input 
                                                        type='number' 
                                                        onChange={e=>setRegionwind(e.target.value, regionName, dayIndex + 2)} 
                                                        value={Math.floor(regions[regionIndex].weatherData[dayIndex + 2].wind/1.852)} 
                                                        />
                                                    </div>
                                                    {
                                                            regions[regionIndex].weatherData[dayIndex + 2].icon === "أمطار" || regions[regionIndex].weatherData[dayIndex + 2].icon === 'مطر رعدي' || regions[regionIndex].weatherData[dayIndex + 2].icon === 'نشاط رياح + أمطار'  ?
                                                            (
                                                                <div>
                                                                    <h6>نسبة الامطار</h6>
                                                                    <input 
                                                                    type='number'
                                                                    value={regions[regionIndex].weatherData[dayIndex + 2]?.rainPercentage}  
                                                                    onChange={e=>setRegionRainPercentage(e.target.value, regionName, dayIndex + 2)} 
                                                                    />
                                                                </div>
                                                            ):null
                                                        }

                                                </div>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            )
                        } 
                    </div>
                </>
            ) : null
        }

        
        <div>
            <h2>حالة البحرين</h2>
            <div className='region ms'>
                

                {
                    ['اليوم الأول', 'اليوم الثاني', 'اليوم الثالث', 'اليوم الرابع',].map((day, dayIndex)=>
                    <div key={dayIndex} className='day-section'>
                        <h5>{fourDates.length>0 ? fourDates[dayIndex] : day}</h5>
                        <div>
                            <h3>البحر المتوسط</h3>
                            <div className='d-flex' >
                                <div>
                                    <h6>اتجاه الرياح</h6>
                                    <select 
                                    value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.windDirection} 
                                    onChange={e=>setMSWindDirection(e.target.value, 'السواحل الشمالية الغربية', dayIndex == 0? dayIndex : dayIndex + 1)}
                                    >
                                        <option value=''>-------</option>
                                        {
                                            windDirections.map((dir, index)=>
                                                <option key={index} value={dir.angle}>
                                                    {dir.name}
                                                </option> 
                                            )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <h4>سرعة الرياح</h4>
                                    <div>
                                        <h6>من</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setMSWindSpead(e.target.value, 'السواحل الشمالية الغربية', dayIndex == 0? dayIndex : dayIndex + 1, 0)} 
                                        value={regions[1]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.ms?.windStart} 
                                        />
                                    </div>
                                    <div>
                                        <h6>إلى</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setMSWindSpead(e.target.value, 'السواحل الشمالية الغربية', dayIndex == 0? dayIndex : dayIndex + 1, 1)}
                                        value={regions[1]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.ms?.windEnd}  
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4>ارتفاع الموج</h4>
                                    <div>
                                        <h6>من</h6>
                                        <input 
                                        type='number' 
                                        step={0.25}
                                        onChange={e=>setMSWave(e.target.value, 'السواحل الشمالية الغربية', dayIndex == 0? dayIndex : dayIndex + 1, 0)} 
                                        value={regions[1]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.ms?.waveStart} 
                                        />
                                    </div>
                                    <div>
                                        <h6>إلى</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setMSWave(e.target.value, 'السواحل الشمالية الغربية', dayIndex == 0? dayIndex : dayIndex + 1, 1)}
                                        value={regions[1]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.ms?.waveEnd}   
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <h3>البحر الأحمر</h3>
                            <div className='d-flex' >
                                <div>
                                    <h6>اتجاه الرياح</h6>
                                    <select 
                                    value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.windDirection}  
                                    onChange={e=>setRSWindDirection(e.target.value, 'السواحل الشمالية الشرقية', dayIndex == 0? dayIndex : dayIndex + 1)}
                                    >
                                        <option value=''>-------</option>
                                        {
                                            windDirections.map((dir, index)=>
                                                <option key={index} value={dir.angle}>
                                                    {dir.name}
                                                </option> 
                                            )
                                        }
                                    </select>
                                </div>
                                <div>
                                    <h4>سرعة الرياح</h4>
                                    <div>
                                        <h6>من</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setRSWindSpead(e.target.value, 'السواحل الشمالية الشرقية', dayIndex == 0? dayIndex : dayIndex + 1, 0)} 
                                        value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.windStart}  
                                        />
                                    </div>
                                    <div>
                                        <h6>إلى</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setRSWindSpead(e.target.value, 'السواحل الشمالية الشرقية', dayIndex == 0? dayIndex : dayIndex + 1, 1)}
                                        value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.windEnd}  
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4>ارتفاع الموج</h4>
                                    <div>
                                        <h6>من</h6>
                                        <input 
                                        type='number' 
                                        step={0.25}
                                        onChange={e=>setRSWave(e.target.value, 'السواحل الشمالية الشرقية', dayIndex == 0? dayIndex : dayIndex + 1, 0)} 
                                        value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.waveStart} 
                                        />
                                    </div>
                                    <div>
                                        <h6>إلى</h6>
                                        <input 
                                        type='number' 
                                        onChange={e=>setRSWave(e.target.value, 'السواحل الشمالية الشرقية', dayIndex == 0? dayIndex : dayIndex + 1, 1)}
                                        value={regions[3]?.weatherData[dayIndex == 0? 0 : dayIndex + 1]?.rs?.waveEnd}  
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    )
                }
            </div>

        </div>    

    </div>
  )
}

export default Regions