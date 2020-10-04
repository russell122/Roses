// реализация отступа блока от шапки


let myOffet = (myWrap) => {
    let wrap = document.querySelector(myWrap);
    let headerBlockMyHeight = document.querySelector('.header__block');
    let headerTopMyHeight = document.querySelector('.header__top');

    if (wrap) {
        let infoMyheaderBlockMyHeight = window.getComputedStyle(headerBlockMyHeight, null).getPropertyValue("height");
        let infoMyheaderTopMyHeight = window.getComputedStyle(headerTopMyHeight, null).getPropertyValue("height");
        let rez;

        if (infoMyheaderTopMyHeight === 'auto') {
            rez = +infoMyheaderBlockMyHeight.slice(0, -2);
        } else {
            rez = +infoMyheaderBlockMyHeight.slice(0, -2) + +infoMyheaderTopMyHeight.slice(0, -2);
        }

        wrap.style.top = rez + 'px';
        wrap.style.paddingBottom = rez + 50 + 'px';

    }

}

myOffet('.delivery');
myOffet('.bigReviews');
myOffet('.bigBlog');
myOffet('.bigAboutUs');
myOffet('.bigContacts');
myOffet('.bigWholesale');
myOffet('.menuAuthorBouquet');
myOffet('.menuGifts');
myOffet('.flowersBouquetOfRosesMix40');
myOffet('.flowersForTheBeloved');
myOffet('.flowersNine');
myOffet('.flowersPinkFloid');
myOffet('.flowersRedNaomi');
myOffet('.flowersRedPiano');
myOffet('.flowersRoseWithAltromeria');
myOffet('.flowersSevenRose');
myOffet('.giftsBalloonsWithHelium10');
myOffet('.giftsBalloonsWithHeliumBlackAndWhite10');
myOffet('.giftsBalloonsWithHeliumDecilateMix10');
myOffet('.giftsBear25');
myOffet('.giftsBear50');
myOffet('.giftsBear80');
myOffet('.giftsMersi');
myOffet('.giftsRafaelo');
myOffet('.myFlowers');

	// Конец реализации отступа блока от шапки