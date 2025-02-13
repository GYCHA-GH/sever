import classes from './favoritePage.module.scss'

import Header from '../header/header'
import Footer from '../footer/footer'

import ProductCard from '../mainPage/productCard/productCard'
import { ProductInfo } from '../mainPage/productInfo'

import arrowRight from './img/arrow_right.png'
import minus from './img/minus.png'
import x from './img/x_black.png'
import x_white from './img/x_white.png'

import arrowLeft from './img/arrow_left.png'
import doubleArrowLeft from './img/double_arrow_left.png'

import { useEffect, useState } from 'react'

export default function FavoritePage(){
    const [inStockState, setInStockState] = useState(false) 

    const [filterAmountActiveState, setFilterAmountActiveState] = useState(true)
    const [filterPriceActiveState, setFilterPriceActiveState] = useState(true)

    const [showMoreState, setShowMoreState] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        onload = ClearPriceRange
        document.title = 'Избранное'
        document.getElementById('minPrice').value = 2500
        document.getElementById('maxPrice').value = 7500

        document.getElementById("priceSliderMin").value = 2500;
        document.getElementById("priceSliderMax").value = 7500;
    })

    function SliderChange(){
        // Slider needs fixing; 

        document.getElementById('minPrice').value = document.getElementById("priceSliderMin").value;
        document.getElementById('maxPrice').value = document.getElementById("priceSliderMax").value;

        document.getElementById("progress_bar").style.left = document.getElementById("priceSliderMin").value / 100 + 'px'
        document.getElementById("progress_bar").style.right = document.getElementById("priceSliderMax").value / 100 + 'px'
    }

    function ClearFilters(){
        setFilterAmountActiveState(false)
        setFilterPriceActiveState(false)
    }

    function ClearPriceRange(){
        document.getElementById('minPrice').value = 2500
        document.getElementById('maxPrice').value = 7500
    }

    return(
        <>
            <Header/>
            <main className={classes.main} style={showMoreState ? {height: '1993px'} : {height: '1254px'}}>
                <section className={classes.section} style={showMoreState ? {height: '1889px'} : {height: '1150px'}}>
                    <div className={classes.top}>
                        <a href="/">Главная</a>
                        <img src={arrowRight} alt="" />
                        <a href="/favorite">Избранное</a>
                    </div>
                    <div className={classes.bot} style={showMoreState ? {height: '1841px'} : {height: '1102px'}}>
                        <div className={classes.title}>
                            <p>Избранное</p>
                        </div>
                        <div className={classes.general} style={showMoreState ? {height: '1709px'} : {height: '970px'}}>
                            
                            <div className={classes.items_and_filters} style={showMoreState ? {height: '1709px'} : {height: '970px'}}>
                                <form onSubmit={e => e.preventDefault()} className={classes.filters}>
                                    <div className={classes.filter}>
                                        <p>Фильтр</p>
                                    </div>
                                    <div className={classes.price_range}>
                                        <div className={classes.text_and_clear}>
                                            <p>Цена</p>
                                            <button type="button" onClick={ClearPriceRange}>Очистить</button>
                                        </div>
                                        <div className={classes.pick_range}>
                                            <input type="number" name="minPrice" id="minPrice" max={9999} min={0}/>
                                            <img src={minus} alt="" />
                                            <input type="number" name="maxPrice" id="maxPrice" max={9999} min={0}/>
                                        </div>
                                        <div className={classes.range_slider}>
                                            <div className={classes.slider}>
                                                <div className={classes.progress} id='progress_bar'></div>
                                            </div>
                                            <div className={classes.inputs}>
                                                <input className={classes.price_slider} type="range" name="priceSlider" id="priceSliderMin" max={9999} min={0} step={1} onChange={SliderChange}/>
                                                <input className={classes.price_slider} type="range" name="priceSlider" id="priceSliderMax" max={9999} min={0} step={1} onChange={SliderChange}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className={classes.texts}>
                                        <div className={classes.milk}>
                                            <p>Молоко</p>
                                        </div>
                                        <div className={classes.cream}>
                                            <p>Сливки</p>
                                        </div>
                                        <div className={classes.egg}>
                                            <p>Яйцо</p>
                                        </div>
                                    </div>
                                    <div className={classes.in_stock}>
                                        <button 
                                        onClick={inStockState ? () => setInStockState(false) : () => setInStockState(true)}
                                        style={inStockState ? {backgroundColor: '#70C05B'} : {backgroundColor: '#BFBFBF'}}
                                        ><div style={inStockState ? {transform: 'translateX(11px)'} : {transform: 'translateX(-11px)'}}></div></button>
                                        <p>В наличии</p>
                                    </div>
                                    <div className={classes.submit}>
                                        <button type="submit"><p>Применить</p></button>
                                    </div>
                                </form>
                                <div className={classes.items} style={showMoreState ? {height: '1709px'} : {height: '970px'}}>
                                    <div className={classes.filter_sect}>
                                        <button type="button" className={filterAmountActiveState ? classes.active : classes.inactive}>
                                            <p>Фильтр 4</p>
                                            <img src={x_white} alt="" onClick={()=>setFilterAmountActiveState(false)}/>
                                        </button>
                                        <button type="button" className={filterPriceActiveState ? classes.active : classes.inactive}>
                                            <p>Цена от 0 до 2599</p>
                                            <img src={x_white} alt="" onClick={()=>setFilterPriceActiveState(false)}/>
                                        </button>
                                        <button type="button" onClick={ClearFilters}>
                                            <p>Очистить фильтры</p>
                                            <img src={x} alt=""/>
                                        </button>
                                    </div>
                                    <div className={classes.main_sect} style={showMoreState ? {height: '1516px'} : {height: '738px'}}>
                                        <div className={classes.line}>
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={true}
                                            regularPrice={'89,99'}
                                            cardPrice={'69,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={'-50%'}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={true}
                                            regularPrice={'89,99'}
                                            cardPrice={'69,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={'-50%'}
                                            />
                                        </div>
                                        <div className={classes.line}>
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                        </div>
                                        <div className={classes.line} style={showMoreState ? {display: 'flex'} : {display: 'none'}}>
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                        </div>
                                        <div className={classes.line} style={showMoreState ? {display: 'flex'} : {display: 'none'}}>
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                            <ProductCard
                                            id={0}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[0].img}
                                            name={'Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»'}
                                            star1={ProductInfo[0].star1}
                                            star2={ProductInfo[0].star2}
                                            star3={ProductInfo[0].star3}
                                            star4={ProductInfo[0].star4}
                                            star5={ProductInfo[0].star5}
                                            discount={''}
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.show_more} style={showMoreState ? {visibility: 'hidden'} : {visibility: 'visible'}}>
                                        <button type="button" onClick={()=>setShowMoreState(true)}>Показать ещё</button>
                                    </div>
                                    <div className={classes.pagination}>
                                        <div>
                                            <div><img src={doubleArrowLeft} alt="" onClick={()=>setCurrentPage(1)}/></div>
                                            <div><img src={arrowLeft} alt="" onClick={currentPage != 1 ? ()=>setCurrentPage(currentPage - 1) : null}/></div>
                                            <div className={currentPage == 1 ? classes.active : null} onClick={()=>setCurrentPage(1)}><p>1</p></div>
                                            <div className={currentPage == 2 ? classes.active : null} onClick={()=>setCurrentPage(2)}><p>2</p></div>
                                            <div className={currentPage == 3 ? classes.active : null} onClick={()=>setCurrentPage(3)}><p>3</p></div>
                                            <div className={currentPage == 4 ? classes.active : null} onClick={()=>setCurrentPage(4)}><p>4</p></div>
                                            <div className={currentPage == 5 ? classes.active : null} onClick={()=>setCurrentPage(5)}><p>5</p></div>
                                            <div className={currentPage == 6 ? classes.active : null} onClick={()=>setCurrentPage(6)}><p>6</p></div>
                                            <div className={currentPage == 7 ? classes.active : null} onClick={()=>setCurrentPage(7)}><p>7</p></div>
                                            <div className={currentPage == 8 ? classes.active : null} onClick={()=>setCurrentPage(8)}><p>8</p></div>
                                            <div><img src={arrowLeft} alt="" style={{rotate: "180deg"}} onClick={currentPage != 8 ? ()=>setCurrentPage(currentPage + 1) : null}/></div>
                                            <div><img src={doubleArrowLeft} alt="" style={{rotate: "180deg"}} onClick={()=>setCurrentPage(8)}/></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )

}