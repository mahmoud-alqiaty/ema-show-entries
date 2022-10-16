import React from 'react'
import './styles.css'

const Home = () => {
    const regions = [
        'القاهرة والوجه البحري',
        'السواحل الشمالية',
        'جنوب سيناء والسلاسل',
        'شمال الصعيد',
        'جنوب الصعيد',
    ]

    const phenomenaOptions = [
        'غائم',
        'غائم جزئي',
        'مشمس',
        'ممطر',
        'رعدي',
        'مطر رعدي',
        'رمال مثارة',
        'شبورة',
        'ضباب',
    ]
  return (
    <div className='home-container'>
        <form>
            {/* ============home-entries============== */}
            <div className='section home-entries'>
                <h1 className='section-header'>
                    حالة الطقس المتوقعة
                </h1>
                <div>
                    <input type='text' />
                </div>
                <div>
                    <input type='text' />
                </div>
                <div>
                    <input type='text' />
                </div>
                <div>
                    <input type='text' />
                </div>
            </div>

            <hr />

            {/* ==============regions-entries============= */}
            <div className='section regions-entries'>
                <h1 className='section-header'>
                     حالة الطقس على مناطق الجمهورية
                </h1>
                <div>
                    <h3>تاريخ اول يوم</h3>
                    <div className="mb-3">
                        <input type="date" />
                    </div>
                </div>
                {
                    regions.map(region=>
                        <div className='region' key={region}>
                            <h2 className='region-name'>
                                {region}
                            </h2>

                            <div className='day-section'>
                                <h5>اليوم الأول</h5>
                                {
                                    ['صباحا', 'مساء'].map(t=>
                                        <div key={t} className='day-pn-am'>
                                            <h6>{t}</h6>
                                            <div className='d-flex' >
                                                <div>
                                                    <h6>الظاهرة</h6>
                                                    <select>
                                                        {
                                                            phenomenaOptions.map(ph=>
                                                               <option key={ph} value={ph}>
                                                                {ph}
                                                               </option> 
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <h6>عظمي</h6>
                                                    <input type='number' />
                                                </div>
                                                <div>
                                                    <h6>صغري</h6>
                                                    <input type='number' />
                                                </div>
                                                <div>
                                                    <h6>سرعة رياح</h6>
                                                    <input type='number' />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            {
                                ['اليوم الثاني', 'اليوم الثالث', 'اليوم الرابع',].map(day=>
                                <div key={day} className='day-section'>
                                    <h5>{day}</h5>
                                    <div>
                                        <div className='d-flex' >
                                            <div>
                                                <h6>الظاهرة</h6>
                                                <select>
                                                    {
                                                        phenomenaOptions.map(ph=>
                                                            <option key={ph} value={ph}>
                                                            {ph}
                                                            </option> 
                                                        )
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <h6>عظمي</h6>
                                                <input type='number' />
                                            </div>
                                            <div>
                                                <h6>صغري</h6>
                                                <input type='number' />
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


            <hr />

            {/* ==============spec-weather-state============= */}
            <div className='section spec-weather-state'>
                <h1 className='section-header'>
                    حالة خاصة
                </h1>
                <div className='title-section inner-section'>
                    <div>
                        <h2>عنوان رئيسي</h2>
                        <input type='text' />
                    </div>
                    <div>
                        <h3>عنوان فرعي</h3>
                        <input type='text' />
                    </div>
                </div>

                <div className='content inner-section'>
                    <div className='weather-state-points'>
                        <h4>العناصر الرئيسية</h4>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                    </div>

                    <div className='warning-points'>
                        <h4>تحذيرات</h4>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                        <div>
                            <input type='text' />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Home