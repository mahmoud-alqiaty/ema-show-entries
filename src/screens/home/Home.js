import React, { useEffect, useState, createContext } from 'react'
import axios from 'axios'
import './styles.css'
import GeneralState from '../general-state/GeneralState';
import SpcState from '../space-state/SpcState';
import Regions from '../regions/Regions';
import ReactLoading from 'react-loading';
import swal from 'sweetalert';

export const HomeContext = createContext()

const Home = () => {
    const regionsNames = [
        'القاهرة والوجه البحري',
        'السواحل الشمالية الغربية',
        'السواحل الشمالية الشرقية',
        'جنوب سيناء وسلاسل جبال البحر الأحمر',
        'شمال الصعيد',
        'جنوب الصعيد',
    ]
   
    const [allGenWeatherPoints, setAllGenWeatherPoints] = useState([])

    const [generalMaps, setGeneralMaps] = useState([])
    const [spcMaps, setSpcMaps] = useState([])


    const [generalInputValue, setGeneralInputValue] = useState("")
    const [SpcInputValue, setSpcInputValue] = useState("")

    const [uploadGenImg, setUploadGenImg] = useState(false)
    const [uploadspcImg, setUploadspcImg] = useState(false)

    const [fourDates, setFourDates] = useState([])


    // regions
    const [regions, setRegions] = useState([])

    // spc-state
    const [mainTitle, setMainTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")

    const [StartingDay, setStartingDay] = useState(-1)

    const [spcWeatherInputValue, setSpcWeatherInputValue] = useState("")
    const [spcWarningInputValue, setSpcWarningInputValue] = useState("")
    
    const [allSpcWeatherPoints, setAllSpcWeatherPoints] = useState([])
    const [allSpcWarningPoints, setAllSpcWarningPoints] = useState([])


    const [submitting, setSubmitting] = useState(false)

    
    // useEffect(() => {

    //     const standaredData =  { 
    //         icon: '',
    //         maxTemp: 0,
    //         minTemp: 0,
    //         wind: 0,
    //         date: '',
    //         dsc: []
    //     }

    //     let standeredWeatherData=[]
    //     for(let j=0; j<5; j++){
    //         const settedDate =  (j===0 || j===1)? fourDates[0] : fourDates[j - 1]
    //         standeredWeatherData.push({...standaredData, date: settedDate})
    //     }

    //     let createdRegions = []
    //     //create an array of all regions with empty-data
    //     for(let i=0; i<regionsNames.length; i++){
    //         const singleRegion = {
    //             name: regionsNames[i],
    //             weatherData: [...standeredWeatherData]
    //         }
    //         createdRegions.push(singleRegion)
    //     }

    //     setRegions(createdRegions)
    // }, [fourDates])
    
    // console.log("regions: ", regions);


    //get data from db
    useEffect(() => {
        const getallData = async () =>{
            axios.get("https://ema-show-backend.herokuapp.com/mapsAndSats/maps/635259f5f3b78e569fbbeb62")
            .then(res=>{
            //   console.log("res: ", res.data);
              console.log("fourDates: ", fourDates);
            if(fourDates.length > 0){

                const updatedRegionsTempPage = res.data.regionsTempPage.map(reg =>{
                    const updatedWeatherData =  reg.weatherData.map((dayData, dayIndex)=>  (dayIndex===0 || dayIndex===1)? {...dayData, date: fourDates[0]}  : {...dayData, date: fourDates[dayIndex - 1]}  )

                    return{...reg, weatherData: updatedWeatherData}
                })
                
                setRegions(updatedRegionsTempPage)
                // setRegions(res.data.regionsTempPage)
            } else{
                setRegions(res.data.regionsTempPage)
            }
            setAllGenWeatherPoints(res.data.generalWeatherState)
            setGeneralMaps(res.data.mapsArray)
            setAllSpcWeatherPoints(res.data.spacCasePage?.allSpcWeatherPoints)
            setSpcMaps(res.data.spacCasePage?.spcMaps)
            setAllSpcWarningPoints(res.data.spacCasePage?.allSpcWarningPoints)
            setMainTitle(res.data.spacCasePage?.mainTitle)
            setSubTitle(res.data.spacCasePage?.subTitle)
            setStartingDay(res.data.spacCasePage?.StartingDay)
            })
            .catch(err=>{
              console.log(err.message);
            })
          }
      
          getallData()
    }, [fourDates])

    console.log("AllGenWeatherPoints: ", allGenWeatherPoints);
    

  //adding general weather maps
  const uploadImage = (image, GenOrSpc) =>{
    const formData = new FormData()
    formData.append(`file`, image)
    formData.append('upload_preset', 'yyuj32eg')

    if(GenOrSpc === "general"){
        setUploadGenImg(true)
    } else {
        setUploadspcImg(true)
    }

    axios.post('https://api.cloudinary.com/v1_1/dryhuprvx/image/upload', formData)
    .then(res=>{
        if(GenOrSpc === "general"){
            setGeneralMaps( gen=> [...gen, res.data.url])
            setGeneralInputValue("")
            setUploadGenImg(false)
        } else {
            setSpcMaps(spc=> [...spc, res.data.url])
            setSpcInputValue("")
            setUploadspcImg(false)
        }

        
    })
    .catch(err=>{
        console.log(err);
        if(GenOrSpc === "general"){
            setUploadGenImg(false)
            setGeneralInputValue("")
        } else {
            setUploadspcImg(false)
            setSpcInputValue("")
        }
    })

    

    // CLOUDINARY_URL=cloudinary://589421646377481:oya5U6DXd4EjT9jlpy7UIebDuEM@dryhuprvx
}


    const removePreviewImg = (img, GenOrSpc)=>{
        if(GenOrSpc === "general"){
            setGeneralMaps(generalMaps.filter(ele => ele !== img))
        } else {
            setSpcMaps(spcMaps.filter(ele => ele !== img))
        }
    }

    //adding general four dates
    const setFourDayes = (day)=>{
        const weakDayes = [
            'الأحد',
            'الإثنين',
            'الثلاثاء',
            'الأربعاء',
            'الخميس',
            'الجمعة',
            'السبت',
        ]
        
        const yearMonthes = [
            'يناير',
            'فبراير',
            'مارس',
            'ابريل',
            'مايو',
            'يونيو',
            'يوليو',
            'اغسطس',
            'سبتمبر',
            'اكتوبر',
            'نوفمبر',
            'ديسمبر',
        ]

        const firstDate = weakDayes[new Date(day).getDay()] + " " + new Date(day).getDate() + " " + yearMonthes[new Date(day).getMonth()] + " " + new Date(day).getFullYear()

        const secondDay = 1000*60*60*24+ +new Date(day)
        const secondDate = weakDayes[new Date(secondDay).getDay()] + " " + new Date(secondDay).getDate() + " " + yearMonthes[new Date(secondDay).getMonth()] + " " + new Date(secondDay).getFullYear()

        const thirdDay = 2*1000*60*60*24+ +new Date(day)
        const thirdDate = weakDayes[new Date(thirdDay).getDay()] + " " + new Date(thirdDay).getDate() + " " + yearMonthes[new Date(thirdDay).getMonth()] + " " + new Date(thirdDay).getFullYear()

        const fourthdDay = 3*1000*60*60*24+ +new Date(day)
        const fourthdDate = weakDayes[new Date(fourthdDay).getDay()] + " " + new Date(fourthdDay).getDate() + " " + yearMonthes[new Date(fourthdDay).getMonth()] + " " + new Date(fourthdDay).getFullYear()

        setFourDates([firstDate, secondDate, thirdDate, fourthdDate])
    }

    const phenomenaOptions = [
        'غائم',
        'غائم جزئي',
        'ممطر',
        'رعدي',
        'مطر رعدي',
        'رمال مثارة',
        'شبورة',
        'ضباب',
    ]


    const contextValue = {
        allGenWeatherPoints, setAllGenWeatherPoints,
        generalMaps, setGeneralMaps,
        spcMaps, setSpcMaps,
        generalInputValue, setGeneralInputValue,
        SpcInputValue, setSpcInputValue,
        uploadGenImg, setUploadGenImg,
        uploadspcImg, setUploadspcImg,
        fourDates, setFourDates,
        regions, setRegions,
        mainTitle, setMainTitle,
        subTitle, setSubTitle,
        spcWeatherInputValue, setSpcWeatherInputValue,
        allSpcWeatherPoints, setAllSpcWeatherPoints,
        spcWarningInputValue, setSpcWarningInputValue,
        allSpcWarningPoints, setAllSpcWarningPoints,
        regionsNames, phenomenaOptions,
        setStartingDay
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitting(true) 
        
        let data = {
            generalWeatherState: allGenWeatherPoints,
            mapsArray: generalMaps,
            regionsTempPage: regions,
            spacCasePage: { 
                mainTitle,
                subTitle,
                StartingDay,
                allSpcWeatherPoints,
                allSpcWarningPoints,
                spcMaps
            },
            _id: '635259f5f3b78e569fbbeb62',
        }

        axios.put('https://ema-show-backend.herokuapp.com/mapsAndSats/maps/635259f5f3b78e569fbbeb62', data)
        .then(res=>{
            console.log("res: ", res.data);
            setSubmitting(false) 
            swal("تم الإرسال", "", "success");
        })
        .catch(err=>{
            console.log(err);
            setSubmitting(false) 
            swal("فشل الإرسال", err.message, "success");
        })

        console.log("submited-data: ", data);
    }
    
  return (
    <HomeContext.Provider value={contextValue}>
        <div className='home-container'>
            <form>
                {/* ============home-entries============== */}
                <GeneralState uploadImage={uploadImage} removePreviewImg={removePreviewImg}/>

                <hr />

                {/* ==============spec-weather-state============= */}
                <SpcState uploadImage={uploadImage} removePreviewImg={removePreviewImg} />
                                

                <hr />

                {/* ==============regions-entries============= */}
                <Regions setFourDayes={setFourDayes} />


                <div className='submit-btn-container'>
                    <button type='submit' className='submit-btn' onClick={handleSubmit}>
                        {
                            submitting? (
                                <ReactLoading type='spin' color='white' height={40} width={40} />
                            ) : "إرسال"
                        }
                    </button>
                </div>

            </form>
        </div>
    </HomeContext.Provider>
  )
}

export default Home