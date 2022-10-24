import React, { useContext, useState } from 'react'
import { HomeContext } from '../home/Home'

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
                singleRegion.weatherData[dayIndex] = {...singleRegion.weatherData[dayIndex], wind: value}
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
                                                        <select defaultValue={''} onChange={e=>setRegionPhenomena(e.target.value, regionName, periodIndex)}>
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
                                                                <input type='number' onChange={e=>setRegionMaxTemp(e.target.value, regionName, periodIndex)} />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h6>صغري</h6>
                                                                <input type='number' onChange={e=>setRegionMinTemp(e.target.value, regionName, periodIndex)} />
                                                            </div>
                                                        )
                                                    }
                                                    
                                                    <div>
                                                        <h6>سرعة رياح</h6>
                                                        <input type='number' onChange={e=>setRegionwind(e.target.value, regionName, periodIndex)} />
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
                                                    <select defaultValue={''} onChange={e=>setRegionPhenomena(e.target.value, regionName, dayIndex + 2)}>
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
                                                    <input type='number' onChange={e=>setRegionMaxTemp(e.target.value, regionName, dayIndex + 2)} />
                                                </div>
                                                <div>
                                                    <h6>صغري</h6>
                                                    <input type='number' onChange={e=>setRegionMinTemp(e.target.value, regionName, dayIndex + 2)} />
                                                </div>
                                                <div>
                                                    <h6>سرعة رياح</h6>
                                                    <input type='number' onChange={e=>setRegionwind(e.target.value, regionName, dayIndex + 2)} />
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
            ) : null
        }

        
               

    </div>
  )
}

export default Regions