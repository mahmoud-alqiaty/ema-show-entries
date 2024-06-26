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
        'القاهرة وجنوب الوجه البحري ومدن القناة',
        'السواحل الشمالية الغربية وشمال الوجه البحري',
        'السواحل الشمالية الشرقية ووسط سيناء',
        'جنوب سيناء وسلاسل جبال البحر الأحمر',
        'شمال الصعيد',
        'جنوب الصعيد',
    ]
   
    const [allGenWeatherPoints, setAllGenWeatherPoints] = useState([])
    const [videoDelay, setVideoDelay] = useState(0)
    const [videoBackgroundValue, setVideoBackgroundValue] = useState(1)


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
    const [spacCaseType, setSpacCaseType] = useState("")

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
            const headers = {
                Accept: 'application/json',
            }
            axios.get("https://212.103.189.111:8090/getdata", {
                headers,
                auth: {
                  username: "abdou",
                  password: "abdou"
                }
              })
            .then(res=>{
              console.log("res from API: ", res.data);
              console.log("fourDates: ", fourDates);
              swal("تم استقبال البيانات بنجاح", "", "success");
            // if(fourDates.length > 0){

            //     const updatedRegionsTempPage = res.data.regionsTempPage.map(reg =>{
            //         const updatedWeatherData =  reg.weatherData.map((dayData, dayIndex)=>  (dayIndex===0 || dayIndex===1)? {...dayData, date: fourDates[0]}  : {...dayData, date: fourDates[dayIndex - 1]}  )

            //         return{...reg, weatherData: updatedWeatherData}
            //     })
                
            //     setRegions(updatedRegionsTempPage)
            //     // setRegions(res.data.regionsTempPage)
            // } else{
            //     setRegions(res.data.regionsTempPage)
            // }
            const regionsWithEditedNames = res?.data?.regionsTempPage.map(singleRegion =>{
                if( singleRegion.name == 'القاهرة والوجه البحري') {
                    singleRegion.name = 'القاهرة وجنوب الوجه البحري ومدن القناة'
                }
                if(singleRegion.name == 'السواحل الشمالية الغربية'){
                    singleRegion.name = 'السواحل الشمالية الغربية وشمال الوجه البحري'
                }
                if(singleRegion.name == 'السواحل الشمالية الشرقية'){
                    singleRegion.name = 'السواحل الشمالية الشرقية ووسط سيناء'
                }
                return singleRegion
            } 
            )

            setRegions(regionsWithEditedNames)
            for(let i=0; i<4; i++){
                // setFourDates([...fourDates, res.data?.regionsTempPage[0]?.weatherData[i+1]?.date])
            }
            
            setAllGenWeatherPoints(res.data.generalWeatherState)
            setVideoDelay(res.data.videoDelay)
            setVideoBackgroundValue(res.data.videoBackgroundValue)
            setGeneralMaps(res.data.mapsArray)
            setAllSpcWeatherPoints(res.data.spacCasePage?.allSpcWeatherPoints)
            setSpcMaps(res.data.spacCasePage?.spcMaps)
            setAllSpcWarningPoints(res.data.spacCasePage?.allSpcWarningPoints)
            setMainTitle(res.data.spacCasePage?.mainTitle)
            setSubTitle(res.data.spacCasePage?.subTitle)
            setStartingDay(res.data.spacCasePage?.StartingDay)
            setSpacCaseType(res.data.spacCasePage?.spacCaseType)
            })
            .catch(err=>{
                console.log("error from Api: ", err);
                swal("فشل استقبال البيانات", "", "error");
            })
          }
      
          getallData()
    }, [])

    useEffect(() => {
        if(fourDates.length > 0){
            const updatedRegionsTempPage = regions.length>0 && regions.map(reg =>{
                const updatedWeatherData =  reg.weatherData.map((dayData, dayIndex)=>  (dayIndex===0 || dayIndex===1)? {...dayData, date: fourDates[0]}  : {...dayData, date: fourDates[dayIndex - 1]}  )
    
                return{...reg, weatherData: updatedWeatherData}
            })
            setRegions(updatedRegionsTempPage)

        }
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
        swal("حاول مرة اخرى", "", "error");
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
        'أمطار',
        'رعدي',
        'مطر رعدي',
        'رمال مثارة',
        'أتربة عالقة',
        'شبورة',
        'ضباب',
        'شبورة صباحاً + غائم جزئي',
        'نشاط رياح + غائم جزئي',
        'نشاط رياح + أمطار',
        'شبورة صباحاً + مشمس',
        'نشاط رياح + مشمس',
    ]

    const nightPhenomenaOptions = [
        'غائم',
        'غائم جزئي',
        'ممطر',
        'رعدي',
        'مطر رعدي',
        'رمال مثارة',
        'شبورة',
        'ضباب',
        'نشاط رياح',
        'نشاط رياح + أمطار',
        
    ]

    const rainWeight = [
        'خفيف',
        'متوسط',
        'غزير',
        'خفيف : متوسط',
        'متوسط : غزير',
        'خفيف ورعدي',
        'متوسط ورعدي',
        'غزير ورعدي',
    ]


    const contextValue = {
        videoDelay, setVideoDelay,
        videoBackgroundValue, setVideoBackgroundValue,
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
        regionsNames, phenomenaOptions, rainWeight,
        setStartingDay, setSpacCaseType, spacCaseType
    }


    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmitting(true) 
        let data = {
            generalWeatherState: allGenWeatherPoints,
            videoDelay: videoDelay,
            videoBackgroundValue: videoBackgroundValue,
            mapsArray: generalMaps,
            regionsTempPage: regions,
            spacCasePage: { 
                mainTitle,
                subTitle,
                StartingDay,
                spacCaseType,
                allSpcWeatherPoints,
                allSpcWarningPoints,
                spcMaps
            },
        }

        const headers = {
            Accept: 'application/json',
        }

        axios.put('https://212.103.189.111:8090/update', data, {
            headers,
            auth: {
              username: "abdou",
              password: "abdou"
            }
          })
        .then(res=>{
            console.log("res: ", res.data);
            setSubmitting(false) 
            swal("تم الإرسال", "", "success");
        })
        .catch(err=>{
            console.log(err);
            setSubmitting(false) 
            swal("فشل الإرسال", err.message, "error");
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
