import classes from './milk-cheese-eggs.module.scss'

import Header from '../../../header/header'
import Footer from '../../../footer/footer'

import ProductCard from '../../../product/productCard/productCard'
import { ProductInfo } from '../../../product/productInfo'

import arrowRight from './img/arrow_right.png'
import minus from './img/minus.png'
import x from './img/x_black.png'
import x_white from './img/x_white.png'

import arrowLeft from './img/arrow_left.png'
import doubleArrowLeft from './img/double_arrow_left.png'

import { useEffect, useState } from 'react'

import Card from '../../../mainPage/productCard/Card'

export default function MilkCheeseEggs(){
    const [inStockState, setInStockState] = useState(false) 
    const [localProductState, setLocalProductState] = useState(false)
    const [healthyState, setHealthyState] = useState(false)
    const [noGMOState, setNoGMOState] = useState(false)

    const [filterAmountActiveState, setFilterAmountActiveState] = useState(true)
    const [filterPriceActiveState, setFilterPriceActiveState] = useState(true)

    const [showMoreState, setShowMoreState] = useState(false)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        onload = ClearPriceRange
        document.title = 'Молоко, сыр, яйца'
    })

    function SliderChange(){
        document.getElementById('minPrice').value = document.getElementById("priceSliderMin").value;
        document.getElementById('maxPrice').value = document.getElementById("priceSliderMax").value;

        document.getElementById("progress_bar").style.left = document.getElementById("priceSliderMin").value / 100 + '%'
        document.getElementById("progress_bar").style.right = 100 - document.getElementById("priceSliderMax").value / 100 + '%'

        let priceGap = 500;
        let minValue = parseInt(document.getElementById("priceSliderMin").value)
        let maxValue = parseInt(document.getElementById("priceSliderMax").value)

        if(maxValue - minValue < priceGap){
            document.getElementById("priceSliderMin").value = maxValue - priceGap;
            document.getElementById("priceSliderMax").value = minValue + priceGap;
        }
        if(maxValue < 500){
            document.getElementById("priceSliderMax").value = maxValue + 500;
            document.getElementById('maxPrice').value = document.getElementById("priceSliderMax").value;
        }
        if(minValue > 9499){
            document.getElementById("priceSliderMin").value = minValue - 500;
            document.getElementById('minPrice').value = document.getElementById("priceSliderMin").value;
        }
    }

    function ClearFilters(){
        setFilterAmountActiveState(false)
        setFilterPriceActiveState(false)
    }

    function ClearPriceRange(){
        document.getElementById('minPrice').value = 2500
        document.getElementById('maxPrice').value = 7500

        document.getElementById("priceSliderMin").value = 2500;
        document.getElementById("priceSliderMax").value = 7500;

        document.getElementById("progress_bar").style.left = document.getElementById("priceSliderMin").value / 100 + '%'
        document.getElementById("progress_bar").style.right = 100 - document.getElementById("priceSliderMax").value / 100 + '%'
    }
    useEffect(() => {
            fetch("http://localhost:5000/articles")
                .then((response) => response.json())
                .then((data) => setArticles(data))
                .catch((error) => console.error("Ошибка загрузки:", error));
        }, []);

    return(
        <>
            <Header/>
            <main className={classes.main} style={showMoreState ? {height: '2065px'} : {height: '1326px'}}>
                <section className={classes.section} style={showMoreState ? {height: '1961px'} : {height: '1222px'}}>
                    <div className={classes.top}>
                        <a href="/">Главная</a>
                        <img src={arrowRight} alt="" />
                        <a href="/catalog">Каталог</a>
                        <img src={arrowRight} alt="" />
                        <a href="/catalog/milk-cheese-eggs">Молоко, сыр, яйцо</a>
                    </div>
                    <div className={classes.bot} style={showMoreState ? {height: '1913px'} : {height: '1174px'}}>
                        <div className={classes.title}>
                            <p>Молоко, сыр, яйцо</p>
                        </div>
                        <div className={classes.general} style={showMoreState ? {height: '1781px'} : {height: '1042px'}}>
                            <div className={classes.options}>
                                <button type="button" 
                                onClick={localProductState ? () => setLocalProductState(false) : () => setLocalProductState(true)}
                                className={localProductState ? classes.active : null}
                                >Товары нашего производства</button>
                                <button type="button" 
                                onClick={healthyState ? () => setHealthyState(false) : () => setHealthyState(true)}
                                className={healthyState ? classes.active : null}
                                >Полезное питание</button>
                                <button type="button" 
                                onClick={noGMOState ? () => setNoGMOState(false) : () => setNoGMOState(true)}
                                className={noGMOState ? classes.active : null}
                                >Без ГМО</button>
                            </div>
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
                                            <Card id={14}/>
                                            <Card id={2}/>
                                            <Card id={13}/>
                                        </div>
                                        <div className={classes.line}>
                                        <ProductCard
                                            id={8}
                                            onSale={false}
                                            regularPrice={''}
                                            cardPrice={'139,99'}
                                            img={ProductInfo[8].img}
                                            name={ProductInfo[8].name}
                                            star1={ProductInfo[8].star1}
                                            star2={ProductInfo[8].star2}
                                            star3={ProductInfo[8].star3}
                                            star4={ProductInfo[8].star4}
                                            star5={ProductInfo[8].star5}
                                            discount={''}
                                            />
                                            <Card id={16}/>
                                            <Card id={16}/>
                                        </div>
                                        <div className={classes.line} style={showMoreState ? {display: 'flex'} : {display: 'none'}}>
                                            <Card id={13}/>
                                            <Card id={1}/>
                                            <Card id={13}/>
                                        </div>
                                        <div className={classes.line} style={showMoreState ? {display: 'flex'} : {display: 'none'}}>
                                            <Card id={1}/>
                                            <Card id={13}/>
                                            <Card id={1}/>
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