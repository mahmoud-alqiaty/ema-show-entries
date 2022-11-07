import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'
import ReactLoading from 'react-loading';

import upArrow from '../../images/up-circle.svg'
import downArrow from '../../images/down-circle.svg'


const Regions = ({setFourDayes}) => {
    const {regionsNames, regions, setRegions, phenomenaOptions, fourDates} = useContext(HomeContext)

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

    const setRegionDes = (value, regionName, dayIndex)=>{
        const secEditedRegion = regions.map(singleRegion =>{
            if( singleRegion.name === regionName){
                const dsc = {...singleRegion.weatherData[dayIndex].dsc}
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], dsc: [...dsc, value]}
                return singleRegion
            } else{
                return singleRegion
            }
        })
        setRegions(secEditedRegion)

    }

    // const DesReturn = (regionName, dayIndex)=>{
    //     return(
    //         <div className='weather-state-points'>
    //         <h4>العناصر الرئيسية</h4>
    //         <div>
    //             <input type='text' onChange={e=>setRegionDayPoint(e.target.value)} />
    //             <button type='button' onClick={()=>setRegionDes()} className='adding-btn'>اضافة</button>
    //         </div>
    //         {
    //             allRegionDayPoints.length ? (
    //                 <ul className='all-weather-points'>
    //                     {
    //                         allRegionDayPoints.map((point, index)=><li key={index}>{point}</li>)
    //                     }
    //                 </ul>
    //             ):null
    //         }
    //     </div>
    //     )
    // }

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

        <div>
            <h3>تاريخ اول يوم</h3>
            <div className="mb-3">
                <input type="date" onChange={e=>{setFourDayes(e.target.value)}} />
            </div>
        </div>
        {
            displayRegions? (
                <>
                     <div className='mb-2'>
                        <button type='button' className='submit-btn' onClick={handleShifttingOneDay}>
                        إزاحة يوم
                        </button>
                    </div>
                    <div>
                        {
                            regionsNames.map((regionName, regionIndex)=>
                                <div className='region' key={regionIndex}>
                                    <h2 className='region-name'>
                                        {regionName}
                                    </h2>

                                    <div className='day-section'>
                                        <h5>اليوم الأول</h5>
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
                                                    </div>
                                                    {/* <DesReturn regionName={regionName} dayIndex={periodIndex} /> */}
                                                </div>
                                            )
                                        }
                                    </div>

                                    {
                                        ['اليوم الثاني', 'اليوم الثالث', 'اليوم الرابع',].map((day, dayIndex)=>
                                        <div key={dayIndex} className='day-section'>
                                            <h5>{day}</h5>
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

        
               

    </div>
  )
}

export default Regions