$(document).ready(function () {
	svg4everybody({});

	// прилипание шапки к верху

	const header = document.querySelector('.header') // Берем хедер
	const headerHeight = parseInt(getComputedStyle(header).height) // Высоту хедера

	const fixedScroll = (e) => {
		// Если окно будет ниже высоты хедера
		if (headerHeight <= window.pageYOffset) {
			// header.classList.add('fixed') // то добавляем класс
			// потом анимация .5 сек
			setTimeout(() => header.classList.add('active'), 50)
		} else {
			// если окно будет наверху то удаляем всё
			header.classList.remove('fixed')
			header.classList.remove('active')
		}
	}
	fixedScroll() // при загрузке странице запускаем

	window.addEventListener('scroll', fixedScroll) // вешаем на скролл функцию

	// конец прилипания шапки к верху

	$('.header__burger').click(function (event) {
		$('.header__burger, .header__block-menu').toggleClass('active');
		$('body').toggleClass('lock');
	});

	$(".js-scroll-to-form").click(function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		event.preventDefault();
		//забираем идентификатор бока с атрибута href
		var id = $(this).attr('href'),
			//узнаем высоту от начала страницы до блока на который ссылается якорь
			top = $(id).offset().top;
		//анимируем переход на расстояние - top за 1000 мс
		$('body,html').animate({ scrollTop: top }, 1000);
	});

	var swiper = new Swiper('.top__slider', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// autoplay: {
		// 	delay: 5000,
		// },
	});

	var swiper = new Swiper('.reviews__slider', {
		loop: true,
		autoHeight: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// autoplay: {
		// 	delay: 5000,
		// },
	});

	$(".modal__phone").mask("+380(999) 999-99-99");

});


window.addEventListener('DOMContentLoaded', () => {

	// фулл скрин

	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// конец фулл скрина


	// подсчет цены за цветы

	let calculatorFormPriceMin = document.querySelector('.calculator__form-price-min');
	let calculatorFormPriceMax = document.querySelector('.calculator__form-price-max');
	let calculatorForm = document.querySelector('.calculator__form');

	if (calculatorForm) {
		calculatorForm.addEventListener('input', (e) => {

			if (e.target.classList.contains('calculator__form-price-range-min')) {
				calculatorFormPriceMin.value = e.target.value;
			}

			if (e.target.classList.contains('calculator__form-price-range-max')) {
				calculatorFormPriceMax.value = e.target.value;
			}

		})
	}


	// конец


	// Cards

	let peopleWrap = document.querySelector('.people__wrap');
	let menuGiftsWrap = document.querySelector('.menuGifts__wrap');
	// let internalCatalogWrap = document.querySelector('.internal__catalog-wrap');

	let databasePopularFlowers = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Bla bla ${url}, status: ${res.status}`);
		}

		return await res.json();
	}

	databasePopularFlowers('/static/json/db.json')
		.then(data => outDatabasePopularFlowers(data))

	function outDatabasePopularFlowers(data) {
		if (peopleWrap) {
			peopleWrap.innerHTML = '';

			data.people.forEach((obj, i) => {

				let hit;
				if (obj.hit === true) {
					hit = 'хит';
				}

				let discountPersent;
				if (obj.discount === true) {
					discountPersent = obj.discountPersent + '%';
				}

				let pieceGoods;
				if (obj.pieceGoods === true) {
					pieceGoods = '/шт.'
				} else {
					pieceGoods = '';
				}

				let catalogHeight;
				if (obj.height !== false) {
					catalogHeight = obj.height;
				}

				let catalogWidth;
				if (obj.width !== false) {
					catalogWidth = obj.width;
				}
				let price;
				let rez;
				if (obj.discountPersent !== false) {
					rez = obj.price / 100 * obj.discountPersent;
					price = (obj.price - rez).toFixed(0);
				} else {
					price = obj.price;
				}

				let catalogItem = document.createElement('a');
				catalogItem.classList.add('catalog__item');
				catalogItem.href = `${obj.url}.html`;
				catalogItem.innerHTML = `
				<div class="catalog__item-top">
					<h3 class="catalog__hit">${hit}</h3><h3 class="catalog__percent">${discountPersent}</h3><a class="catalog__item-top-link catalog__item-top-add show" href="#"><img src="static/images/general/heart.png" alt=""/></a><a class="catalog__item-top-link catalog__item-top-take hide" href="#"><img src="static/images/general/heartFull.png" alt=""/></a></div>
				<div
					class="catalog__item-img"><img src=${obj.photo} alt="${obj.name}" /></div>
			<div class="catalog__item-body">
				<h4 class="catalog__item-title">${obj.name}</h4>
				<span class="catalog__item-lable">${obj.price} ₽ ${pieceGoods}</span>
				<span class="catalog__item-discount">${price} ₽ ${pieceGoods}</span>
			</div>
			<div class="catalog__masc">
				<div class="catalog__masc-wrap">
					<h4 class="catalog__masc-title">${obj.name}</h4>
					<span class="catalog__item-lable">${obj.price} ₽ ${pieceGoods}</span>
					<span class="catalog__item-discount">${price} ₽ ${pieceGoods}</span>
					<p class="catalog__masc-height"><span>Высота: </span><span class="catalog__masc-height-value">${catalogHeight}</span> см</p>
					<p class="catalog__masc-width"><span>Ширина: </span><span class="catalog__masc-width-value">${catalogWidth}</span> см</p>
					<div class="catalog__masc-btn"><a href="#">В корзину</a></div>
				</div>
			</div>
				`;
				peopleWrap.append(catalogItem);

				if (obj.discountPersent !== false) {
					rez = obj.price / 100 * obj.discountPersent;
					price = (obj.price - rez).toFixed(0);
					catalogItem.setAttribute('data-price', price);
				} else {
					catalogItem.setAttribute('data-price', price);
				}

				catalogItem.setAttribute('data-hitValue', obj.hitValue);
				catalogItem.setAttribute('data-number', obj.id);

				if (obj.discountPersent !== false) {
					catalogItem.setAttribute('data-discountPersent', obj.discountPersent);
				} else {
					catalogItem.setAttribute('data-discountPersent', 0);
				}




			})

		}

		// Реализация при клике на элемент открывается новая страница(переход по ссылке), а на этой странице отображается информация о кликнутом элементе

		let myCatalogItem = document.querySelectorAll('.catalog__item');

		myCatalogItem.forEach(elem => {
			elem.addEventListener('click', (e) => {
				let dataNumber = elem.getAttribute('data-number');
				localStorage.setItem('data-number', dataNumber)
			})
		})

		let internalCatalogWrap = document.querySelector('.internal__catalog-wrap');
		if (internalCatalogWrap) {
			// internalCatalogWrap.innerHTML = '';
			data.people.forEach((obj, i) => {

				let price;
				let rez;
				if (obj.discountPersent !== false) {
					rez = obj.price / 100 * obj.discountPersent;
					price = (obj.price - rez).toFixed(0);
				} else {
					price = obj.price;
				}


				let internalCatalogElem = document.createElement('div');
				internalCatalogElem.classList.add('internal__catalog-elem');
				internalCatalogElem.setAttribute('data-val', obj.id)
				internalCatalogElem.innerHTML = `
					<div class="internal__catalog-wrap-item theme">
					<div class="internal__catalog-wrap-top">
						<h3 class="internal__catalog-wrap-hit">хит</h3>
						<div class="internal__catalog-wrap-disc">${obj.discountPersent}%</div>
						<div class="internal__catalog-wrap-percent"></div><a class="internal__catalog-wrap-top-link catalog__item-top-add show" href="#"><img src="static/images/general/heart.png" alt=""/></a><a class="internal__catalog-wrap-top-link catalog__item-top-take hide" href="#"><img src="static/images/general/heartFull.png" alt=""/></a></div>
					<div
						class="internal__catalog-wrap-img"><img src=${obj.photoBig} alt="" /></div>
				</div>
				<div class="internal__catalog-wrap-right right">
					<div class="right__social theme">
						<a class="right__social-vk" href="#">
						<img src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.623 7.66c.12-.372 0-.643-.525-.643h-1.745c-.44 0-.644.237-.763.491 0 0-.898 2.17-2.152 3.576-.406.406-.593.542-.813.542-.119 0-.271-.136-.271-.508V7.644c0-.44-.136-.644-.509-.644H10.1c-.27 0-.44.203-.44.407 0 .423.627.525.694 1.711v2.576c0 .559-.101.66-.322.66-.593 0-2.033-2.185-2.897-4.676-.17-.492-.339-.678-.78-.678H4.593C4.085 7 4 7.237 4 7.491c0 .458.593 2.762 2.762 5.813 1.44 2.084 3.49 3.202 5.338 3.202 1.118 0 1.254-.254 1.254-.678v-1.575c0-.509.101-.594.457-.594.254 0 .712.136 1.746 1.136 1.186 1.186 1.39 1.728 2.05 1.728h1.745c.509 0 .746-.254.61-.745-.152-.492-.728-1.203-1.474-2.05-.407-.475-1.017-1-1.203-1.255-.254-.339-.186-.474 0-.78-.017 0 2.118-3.015 2.338-4.032' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E" alt="" />
						</a>
						<a class="right__social-fc" href="#">
						<img src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.423 20v-7.298h2.464l.369-2.845h-2.832V8.042c0-.824.23-1.385 1.417-1.385h1.515V4.111A20.255 20.255 0 0014.148 4c-2.183 0-3.678 1.326-3.678 3.76v2.097H8v2.845h2.47V20h2.953z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E" alt="" />
						</a>
						<a class="right__social-insta" href="#">
						<img src="data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.92 6.089L4.747 11.555c-.967.388-.962.928-.176 1.168l3.534 1.104 1.353 4.146c.164.454.083.634.56.634.368 0 .53-.168.736-.368.13-.127.903-.88 1.767-1.719l3.677 2.717c.676.373 1.165.18 1.333-.628l2.414-11.374c.247-.99-.378-1.44-1.025-1.146zM8.66 13.573l7.967-5.026c.398-.242.763-.112.463.154l-6.822 6.155-.265 2.833-1.343-4.116z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E" alt="" />
						</a>
					</div>
					<div class="right__info theme">
						<div class="right__info-sost">
							<h3>CОСТАВ БУКЕТА</h3>
						</div>
						<div class="right__info-size">
							<h3>РАЗМЕР БУКЕТА</h3>
							<p class="mbw">Ширина - ${obj.width} см.</p>
							<p class="mbh">Высота - ${obj.height} см.</p>
						</div>
					</div>
					<form class="right__price theme" action="">
						<div class="right__price-top">
							<h3>Цена</h3>
							<h3>КОЛИЧЕСТВО</h3>
						</div>
						<div class="right__price-center"><span class="right__price-value">${price} ₽</span>
							<div class="right__price-calculations">
								<div class="right__price-minus"></div>
								<div class="right__price-inp"><input type="text" name="price-inp" value="1" /></div>
								<div class="right__price-plus"></div>
							</div>
						</div>
						<div class="right__price-btn"><button class="btn">Купить</button></div>
					</form>
				</div>
					`;

				let dataNumber = localStorage.getItem('data-number');



				if (obj.id === +dataNumber) {
					internalCatalogWrap.append(internalCatalogElem);

					let rightInfoSost = document.querySelector('.right__info-sost');

					obj.composition.forEach(elem => {
						for (let key in elem) {

							let p = document.createElement('p');
							p.innerHTML = `
								<p>${key} - ${elem[key]}</p>
							`;
							rightInfoSost.append(p)
						}
					})

					// let mbu = document.querySelector('.mbu');
					// mbu.setAttribute('data-height', obj.height);
					// if (mbu.getAttribute('data-height') == 'false') {
					// 	mbu.remove();
					// }

					function clarificationOutInternalCatalog(wrapElem, dataAttr, objElem, linkFullWrap) {
						let elem = document.querySelector(wrapElem);
						let fullWrap = document.querySelector(linkFullWrap);

						elem.setAttribute('dataAttr', objElem);
						if (elem.getAttribute('dataAttr') == 'false') {
							fullWrap.remove();
						}

					}

					clarificationOutInternalCatalog('.mbw', 'data-width', obj.width, '.right__info-size');
					clarificationOutInternalCatalog('.internal__catalog-wrap-hit', 'data-hit', obj.hit, '.internal__catalog-wrap-hit');
					clarificationOutInternalCatalog('.internal__catalog-wrap-disc', 'data-discountPersent', obj.discountPersent, '.internal__catalog-wrap-disc');



				}





			})

		}

		// end

		// Пересчет суммы при клике

		let rightPriceValue = document.querySelector('.right__price-value');
		let rightPricePlus = document.querySelector('.right__price-plus');
		let rightPriceMinus = document.querySelector('.right__price-minus');
		let rightPriceInp = document.querySelector('.right__price-inp > input');
		let num = +rightPriceValue.innerHTML.replace(/\ ₽/, "");

		if (rightPriceInp) {
			rightPriceInp.addEventListener('input', () => {
				rightPriceValue.innerHTML = num * rightPriceInp.value;
			})
		}

		if (rightPricePlus) {
			rightPricePlus.addEventListener('click', () => {
				rightPriceInp.value++;
				rightPriceValue.innerHTML = num * rightPriceInp.value;
			});
		}

		if (rightPriceMinus) {
			rightPriceMinus.addEventListener('click', () => {
				rightPriceInp.value--;
				rightPriceValue.innerHTML = num * rightPriceInp.value;
			})
		}


		// Конец Пересчета суммы при клике

		// Замена сердца

		let catalogItemTopAdd = document.querySelectorAll('.catalog__item-top-add');
		let catalogItemTopTake = document.querySelectorAll('.catalog__item-top-take');

		if (catalogItemTopAdd) {
			catalogItemTopAdd.forEach((elem, i) => {
				elem.addEventListener('click', (e) => {
					e.preventDefault();
					elem.classList.remove('show')
					elem.classList.add('hide')
					catalogItemTopTake[i].classList.remove('hide')
					catalogItemTopTake[i].classList.add('show')
				})
			})
			catalogItemTopTake.forEach((elem, i) => {
				elem.addEventListener('click', (e) => {
					e.preventDefault();
					elem.classList.remove('show')
					elem.classList.add('hide')
					catalogItemTopAdd[i].classList.remove('hide')
					catalogItemTopAdd[i].classList.add('show')
				})
			})
		}

		// конец замены


		if (menuGiftsWrap) {
			menuGiftsWrap.innerHTML = '';

			data.gifts.forEach((obj) => {

				let hit;
				if (obj.hit === true) {
					hit = 'хит';
				}

				let discountPersent;
				if (obj.discount === true) {
					discountPersent = obj.discountPersent + '%';
				}

				let pieceGoods;
				if (obj.pieceGoods === true) {
					pieceGoods = '/шт.'
				} else {
					pieceGoods = '';
				}

				let catalogHeight;
				if (obj.height !== false) {
					catalogHeight = obj.height;
				}

				let catalogWidth;
				if (obj.width !== false) {
					catalogWidth = obj.width;
				}
				let price;
				let rez;
				if (obj.discountPersent !== false) {
					rez = obj.price / 100 * obj.discountPersent;
					price = (obj.price - rez).toFixed(0);
				} else {
					price = obj.price;
				}

				let catalogItem = document.createElement('a');
				catalogItem.classList.add('catalog__item');
				catalogItem.href = `${obj.url}.html`;
				catalogItem.innerHTML = `
				<div class="catalog__item-top">
					<h3 class="catalog__hit">${hit}</h3><h3 class="catalog__percent">${discountPersent}</h3><a class="catalog__item-top-link catalog__item-top-add show" href="#"><img src="static/images/general/heart.png" alt=""/></a><a class="catalog__item-top-link catalog__item-top-take hide" href="#"><img src="static/images/general/heartFull.png" alt=""/></a></div>
				<div
					class="catalog__item-img"><img src=${obj.photo} alt="${obj.name}" /></div>
			<div class="catalog__item-body">
				<h4 class="catalog__item-title">${obj.name}</h4>
				<span class="catalog__item-lable">${obj.price} ₽ ${pieceGoods}</span>
				<span class="catalog__item-discount">${price} ₽ ${pieceGoods}</span>
			</div>
			<div class="catalog__masc">
				<div class="catalog__masc-wrap">
					<h4 class="catalog__masc-title">${obj.name}</h4>
					<span class="catalog__item-lable">${obj.price} ₽ ${pieceGoods}</span>
					<span class="catalog__item-discount">${price} ₽ ${pieceGoods}</span>
					<p class="catalog__masc-height"><span>Высота: </span><span class="catalog__masc-height-value">${catalogHeight}</span> см</p>
					<p class="catalog__masc-width"><span>Ширина: </span><span class="catalog__masc-width-value">${catalogWidth}</span> см</p>
					<div class="catalog__masc-btn"><a href="#">В корзину</a></div>
				</div>
			</div>
				`;
				menuGiftsWrap.append(catalogItem);

				if (obj.discountPersent !== false) {
					rez = obj.price / 100 * obj.discountPersent;
					price = (obj.price - rez).toFixed(0);
					catalogItem.setAttribute('data-price', price);
				} else {
					catalogItem.setAttribute('data-price', price);
				}

				catalogItem.setAttribute('data-hitValue', obj.hitValue);

				if (obj.discountPersent !== false) {
					catalogItem.setAttribute('data-discountPersent', obj.discountPersent);
				} else {
					catalogItem.setAttribute('data-discountPersent', 0);
				}

			})
		}


		let catalogPercent = document.querySelectorAll('.catalog__percent');
		let catalogHit = document.querySelectorAll('.catalog__hit');
		let catalogMascHeight = document.querySelectorAll('.catalog__masc-height');
		let catalogMascWidth = document.querySelectorAll('.catalog__masc-width');
		let catalogMascHeightValue = document.querySelectorAll('.catalog__masc-height-value');
		let catalogMascWidthValue = document.querySelectorAll('.catalog__masc-width-value');

		let hidingPromotionalInformation = (elems) => {

			elems.forEach((elem, i) => {
				if (elem.innerHTML === 'undefined') {
					elems[i].classList.add('hide')
				}
			})

		}

		hidingPromotionalInformation(catalogPercent)
		hidingPromotionalInformation(catalogHit)


		let hidingPromotionalInformationAndParent = (elems, parentElem) => {

			elems.forEach((elem, i) => {
				if (elem.innerHTML === 'undefined') {
					elems[i].classList.add('hide');
					parentElem[i].remove();
				}
			})

		}

		hidingPromotionalInformationAndParent(catalogMascHeightValue, catalogMascHeight)
		hidingPromotionalInformationAndParent(catalogMascWidthValue, catalogMascWidth)

		let catalogItemLable = document.querySelectorAll('.catalog__item-lable');
		let catalogItemDiscount = document.querySelectorAll('.catalog__item-discount');

		let deletingNoDiscount = (discountedPriceElems, priceElems) => {
			discountedPriceElems.forEach((elem, i) => {
				if (discountedPriceElems[i].innerHTML.split(' ')[0] === priceElems[i].innerHTML.split(' ')[0]) {
					discountedPriceElems[i].remove();
				}
			})
		}

		deletingNoDiscount(catalogItemLable, catalogItemDiscount)

	}

	// end Cards


	// sort - просто таб

	let menuAuthorBouquetSort = document.querySelector('.menuAuthorBouquet-sort');
	let menuGiftsBouquetSort = document.querySelector('.menuGifts-sort');

	let openSortBlock = (openBlock) => {
		if (openBlock) {
			document.addEventListener('click', (e) => {

				if ((e.target.classList.contains('menuAuthorBouquet__sort-population')) || e.target.classList.contains('menuAuthorBouquet__sort-one') || e.target.classList.contains('bgh') || e.target.classList.contains('svg-sprite-icon')) {
					openBlock.classList.remove('hide');
				} else {
					openBlock.classList.add('hide');
				}
			})
		}
	}

	openSortBlock(menuAuthorBouquetSort);
	openSortBlock(menuGiftsBouquetSort);

	// end sort

	// реализация самой сортировки

	let SortLinkIncrease = document.querySelector('.menuAuthorBouquet__sort-link-increase');
	let SortLinkPop = document.querySelector('.menuAuthorBouquet__sort-link-pop');
	let SortLinkDecrease = document.querySelector('.menuAuthorBouquet__sort-link-decrease');
	let SortLinkDiscounts = document.querySelector('.menuAuthorBouquet__sort-link-discounts');


	function mySort(elem, dataAttr) {
		if (elem) {
			elem.addEventListener('click', () => {
				document.querySelector('.bgh').innerHTML = elem.childNodes[0].innerHTML;
				let catalogWrap = document.querySelector('.catalog__wrap');

				for (let i = 0; i < catalogWrap.children.length; i++) {
					for (let j = i; j < catalogWrap.children.length; j++) {
						if (+catalogWrap.children[i].getAttribute(dataAttr) > +catalogWrap.children[j].getAttribute(dataAttr)) {
							replacedNode = catalogWrap.replaceChild(catalogWrap.children[j], catalogWrap.children[i]);
							insertAfter(replacedNode, catalogWrap.children[i]);
						}
					}
				}
			})
		}
	}

	function mySortDesc(elem, dataAttr) {
		if (elem) {
			elem.addEventListener('click', () => {
				document.querySelector('.bgh').innerHTML = elem.childNodes[0].innerHTML;
				let catalogWrap = document.querySelector('.catalog__wrap');

				for (let i = 0; i < catalogWrap.children.length; i++) {
					for (let j = i; j < catalogWrap.children.length; j++) {
						if (+catalogWrap.children[i].getAttribute(dataAttr) < +catalogWrap.children[j].getAttribute(dataAttr)) {
							replacedNode = catalogWrap.replaceChild(catalogWrap.children[j], catalogWrap.children[i]);
							insertAfter(replacedNode, catalogWrap.children[i]);
						}
					}
				}
			})
		}
	}

	function insertAfter(elem, refElem) {
		return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
	}


	mySort(SortLinkIncrease, 'data-price');
	mySort(SortLinkPop, 'data-hitValue');
	mySortDesc(SortLinkDiscounts, 'data-discountPersent');
	mySortDesc(SortLinkDecrease, 'data-price');

	// конец сортировки

	// Проверка паролей в форме


	let formReg = document.querySelector('.form-reg');

	formReg.addEventListener('submit', (e) => {
		let modalPussword = document.querySelector('.modal__pussword > input');
		let modalPusswordConfirmation = document.querySelector('.modal__pussword-confirmation > input');

		if (modalPussword.value !== modalPusswordConfirmation.value) {
			let elem = document.createElement('div');
			elem.innerHTML = 'Пароли не совпадают';
			elem.style.color = 'red';
			document.querySelector('.modal__pussword-confirmation').insertAdjacentHTML('afterend', '<p class="form-reg-p">Пароли не совпадают</p>');
			e.preventDefault();
		}
	})


	// Конец проверки паролей в форме




})