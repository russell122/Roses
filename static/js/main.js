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

	databasePopularFlowers('static/json/db.json')
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
				<span class="catalog__item-lable" data-sort-lable=${obj.discountPersent}>${obj.price}<div class="rub"></div>${pieceGoods}</span>
				<span class="catalog__item-discount">${price} 
					<div class="rub"></div>
				${pieceGoods}</span>
			</div>
			<div class="catalog__masc">
				<div class="catalog__masc-wrap">
					<h4 class="catalog__masc-title">${obj.name}</h4>
					<span class="catalog__item-lable rub2" data-sort-lable=${obj.discountPersent}>${obj.price}
					${pieceGoods}</span>
					<span class="catalog__item-discount rub">${price}
					${pieceGoods}</span>
					<p class="catalog__masc-height"><span>Высота: </span><span class="catalog__masc-height-value">${catalogHeight}</span> см</p>
					<p class="catalog__masc-width"><span>Ширина: </span><span class="catalog__masc-width-value">${catalogWidth}</span> см</p>
					<div class="catalog__masc-btn"><a class="catalog__masc-btn-js" href="basket.html" data-number = ${obj.id}>В корзину</a></div>
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


			let myCatalogItemLable = document.querySelectorAll('.catalog__item-lable');

			myCatalogItemLable.forEach(elem => {
				if (elem.getAttribute('data-sort-lable') == 'false') {
					elem.remove();
				}

			});



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
						<div class="right__price-center"><span class="right__price-value">${price} <div class="rub"></div> </span>
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

		// // Пересчет суммы при клике

		let rightPriceValue = document.querySelector('.right__price-value');
		let rightPricePlus = document.querySelector('.right__price-plus');
		let rightPriceMinus = document.querySelector('.right__price-minus');
		let rightPriceInp = document.querySelector('.right__price-inp > input');
		let num;

		if (rightPriceValue) {
			num = +rightPriceValue.innerHTML.split(' ')[0];
		}

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


		// // Конец Пересчета суммы при клике

		// Замена сердца

		let catalogItemTopAdd = document.querySelectorAll('.catalog__item-top-add');
		let catalogItemTopTake = document.querySelectorAll('.catalog__item-top-take');

		if (catalogItemTopAdd) {
			catalogItemTopAdd.forEach((elem, i) => {
				elem.addEventListener('click', (e) => {
					e.preventDefault();
					elem.classList.remove('show');
					elem.classList.add('hide');
					catalogItemTopTake[i].classList.remove('hide');
					catalogItemTopTake[i].classList.add('show');

				})
			})
			catalogItemTopTake.forEach((elem, i) => {
				elem.addEventListener('click', (e) => {
					e.preventDefault();
					elem.classList.remove('show');
					elem.classList.add('hide');
					catalogItemTopAdd[i].classList.remove('hide');
					catalogItemTopAdd[i].classList.add('show');

				})
			})
		}


		// конец замены


		// if (menuGiftsWrap) {
		// 	menuGiftsWrap.innerHTML = '';

		// 	data.gifts.forEach((obj) => {

		// 		let hit;
		// 		if (obj.hit === true) {
		// 			hit = 'хит';
		// 		}

		// 		let discountPersent;
		// 		if (obj.discount === true) {
		// 			discountPersent = obj.discountPersent + '%';
		// 		}

		// 		let pieceGoods;
		// 		if (obj.pieceGoods === true) {
		// 			pieceGoods = '/шт.'
		// 		} else {
		// 			pieceGoods = '';
		// 		}

		// 		let catalogHeight;
		// 		if (obj.height !== false) {
		// 			catalogHeight = obj.height;
		// 		}

		// 		let catalogWidth;
		// 		if (obj.width !== false) {
		// 			catalogWidth = obj.width;
		// 		}
		// 		let price;
		// 		let rez;
		// 		if (obj.discountPersent !== false) {
		// 			rez = obj.price / 100 * obj.discountPersent;
		// 			price = (obj.price - rez).toFixed(0);
		// 		} else {
		// 			price = obj.price;
		// 		}

		// 		let catalogItem = document.createElement('a');
		// 		catalogItem.classList.add('catalog__item');
		// 		catalogItem.href = `${obj.url}.html`;
		// 		catalogItem.setAttribute('data-number', obj.id)
		// 		catalogItem.innerHTML = `
		// 		<div class="catalog__item-top">
		// 			<h3 class="catalog__hit">${hit}</h3><h3 class="catalog__percent">${discountPersent}</h3><a class="catalog__item-top-link catalog__item-top-add show" href="#"><img src="static/images/general/heart.png" alt=""/></a><a class="catalog__item-top-link catalog__item-top-take hide" href="#"><img src="static/images/general/heartFull.png" alt=""/></a></div>
		// 		<div
		// 			class="catalog__item-img"><img src=${obj.photo} alt="${obj.name}" /></div>
		// 	<div class="catalog__item-body">
		// 		<h4 class="catalog__item-title">${obj.name}</h4>
		// 		<span class="catalog__item-lable">${obj.price} <div class="rub"></div>
		// 		${pieceGoods}</span>
		// 		<span class="catalog__item-discount">${price} <div class="rub"></div> 
		// 		${pieceGoods}</span>
		// 	</div>
		// 	<div class="catalog__masc">
		// 		<div class="catalog__masc-wrap">
		// 			<h4 class="catalog__masc-title">${obj.name}</h4>
		// 			<span class="catalog__item-lable">${obj.price}  <div class="rub"></div>
		// 			${pieceGoods}</span>
		// 			<span class="catalog__item-discount">${price} <div class="rub"></div>
		// 			${pieceGoods}</span>
		// 			<p class="catalog__masc-height"><span>Высота: </span><span class="catalog__masc-height-value">${catalogHeight}</span> см</p>
		// 			<p class="catalog__masc-width"><span>Ширина: </span><span class="catalog__masc-width-value">${catalogWidth}</span> см</p>
		// 			<div class="catalog__masc-btn"><a class="catalog__masc-btn-js-2" href="basket.html" data-number = ${obj.id}>В корзину</a></div>
		// 		</div>
		// 	</div>
		// 		`;
		// 		menuGiftsWrap.append(catalogItem);


		// 		if (obj.discountPersent !== false) {
		// 			rez = obj.price / 100 * obj.discountPersent;
		// 			price = (obj.price - rez).toFixed(0);
		// 			catalogItem.setAttribute('data-price', price);
		// 		} else {
		// 			catalogItem.setAttribute('data-price', price);
		// 		}

		// 		catalogItem.setAttribute('data-hitValue', obj.hitValue);


		// 		if (obj.discountPersent !== false) {
		// 			catalogItem.setAttribute('data-discountPersent', obj.discountPersent);
		// 		} else {
		// 			catalogItem.setAttribute('data-discountPersent', 0);
		// 		}

		// 	})
		// }

		// // // Реализация корзины 1

		let catalogMascBtnJs = document.querySelectorAll('.catalog__masc-btn-js');
		let basket__wrap = document.querySelector('.basket__wrap');
		let basketTableTbody = document.querySelector('.basket__table-tbody');

		const newGoods = (id, count = 1) => ({
			id: id,
			count: count
		});

		// let currentCartCount = 0;
		let countText = document.querySelector('.basket-value');

		if (localStorage.getItem('goods') !== undefined && localStorage.getItem('goods') !== null) {
			let arrayLC = JSON.parse(localStorage.getItem('goods'));
			countText.textContent = (arrayLC.length);
		}



		catalogMascBtnJs.forEach(elem => {
			elem.addEventListener('click', (e) => {
				e.preventDefault();

				let dataNumber = elem.getAttribute('data-number');
				let newObjGoods = newGoods(dataNumber);

				if (localStorage.getItem('goods') == undefined && localStorage.getItem('goods') == null) {
					let goods = [];
					goods = [...goods, newObjGoods];
					localStorage.setItem('goods', JSON.stringify(goods));
					countText.textContent = (goods.length);
				} else {
					let oldGoods = JSON.parse(localStorage.getItem('goods'));
					let findIldItem = oldGoods.find(el => el.id == dataNumber);

					if (findIldItem == undefined) {
						oldGoods = [...oldGoods, newObjGoods];
					} else {
						oldGoods.filter((item) => {
							if (item.id == dataNumber) {
								item.count = item.count + 1;
							}
							return item;
						})
					}
					localStorage.setItem('goods', JSON.stringify(oldGoods));
					countText.textContent = (oldGoods.length)
				}

			})
		})




		if (basket__wrap) {
			let dataArr = JSON.parse(localStorage.getItem('goods'))
			let arr = [];

			arr = data.people.filter(el => (dataArr.includes(el.id)))

			dataArr.forEach(elem => {
				let div = document.createElement('tr');
				div.classList.add('myTr');
				let myPrice;
				let rez;

				if (data.people[elem.id - 1].discountPersent != false) {
					rez = data.people[elem.id - 1].price / 100 * data.people[elem.id - 1].discountPersent;
					myPrice = (data.people[elem.id - 1].price - rez).toFixed(0);

				} else {
					myPrice = data.people[elem.id - 1].price;
				}


				div.innerHTML = `
				<td>
					<div class="basket__table-wrap-name">${data.people[elem.id - 1].name}</div>
				</td>
				<td class="basket__td-flex">
					<div class="myMinus" data-value-minus = ${data.people[elem.id - 1].id}></div>
					<div class="basket__table-wrap-block myCount">${elem.count}</div>
					<div class="myPlus" data-value-plus = ${data.people[elem.id - 1].id}></div>
				</td>
				<td>
					<div class="ArrMyPrice">${myPrice * elem.count}</div>
				</td>
				<td class="basket__table-wrap-close" data-close-value="${data.people[elem.id - 1].id}">
					<div>✖</div>
				</td>
						`;
				div.setAttribute('data-close-value', data.people[elem.id - 1].id)
				basketTableTbody.append(div);

				let myPlus = document.querySelectorAll('.myPlus');
				let myMinus = document.querySelectorAll('.myMinus');
				let myCount = document.querySelectorAll('.myCount');
				let ArrMyPrice = document.querySelectorAll('.ArrMyPrice');
				let myArr2 = JSON.parse(localStorage.getItem('goods'));
				let rez2;
				let myPrice2;

				myPlus.forEach((elem, i) => {
					elem.addEventListener('click', (e) => {

						if (e.target.getAttribute('data-value-plus') == myArr2[i].id) {
							myArr2[i].count++;
						}

						localStorage.setItem('goods', JSON.stringify(myArr2));
						myCount[i].textContent = myArr2[i].count;

						if (data.people[i].discountPersent != false) {
							rez2 = data.people[i].price / 100 * data.people[i].discountPersent;
							myPrice2 = (data.people[i].price - rez2).toFixed(0);

						} else {
							myPrice2 = data.people[i].price;
						}

						ArrMyPrice[i].textContent = myPrice2 * myArr2[i].count;

						recalculationOfTheFullAmount();
					})
				})

				myMinus.forEach((elem, i) => {
					elem.addEventListener('click', (e) => {

						if (e.target.getAttribute('data-value-minus') == myArr2[i].id && myArr2[i].count >= 2) {
							myArr2[i].count--;
						}

						localStorage.setItem('goods', JSON.stringify(myArr2));
						myCount[i].textContent = myArr2[i].count;

						if (data.people[i].discountPersent != false) {
							rez2 = data.people[i].price / 100 * data.people[i].discountPersent;
							myPrice2 = (data.people[i].price - rez2).toFixed(0);

						} else {
							myPrice2 = data.people[i].price;
						}

						ArrMyPrice[i].textContent = myPrice2 * myArr2[i].count;

						recalculationOfTheFullAmount();
					})
				})

			})

			document.querySelector('.basket__table-wrap').addEventListener('submit', (e) => {
				e.preventDefault();

				// myModal('.basket__wrap-btn', '.modal-thanks');
			})

			let basketFullPriceBlock = document.querySelector('.basket__full-price-block');

			function recalculationOfTheFullAmount() {

				let fullPriceSum = 0;
				let ArrMyPrice = document.querySelectorAll('.ArrMyPrice');

				ArrMyPrice.forEach(elem => {
					fullPriceSum += +elem.innerHTML;
				})


				if (basketFullPriceBlock) {
					basketFullPriceBlock.innerHTML = `Общая сумма: ${fullPriceSum}`;
					basketFullPriceBlock.classList.add('rub');

				}

			}

			recalculationOfTheFullAmount();

			// let btn = document.createElement('button');
			// btn.setAttribute("type", "submit");
			// btn.innerHTML = 'Заказать';
			// btn.classList.add('basket__wrap-btn');
			// basketFullPriceBlock.after(btn);


		}

		let basketTableWrapClose = document.querySelectorAll('.basket__table-wrap-close');
		let myArr2 = JSON.parse(localStorage.getItem('goods'));
		let myTrS = document.querySelectorAll('.basket__table-tbody .myTr');



		function deletingACartItem() {

			basketTableWrapClose.forEach((elem, i) => {

				elem.addEventListener('click', (e) => {


					if (elem.getAttribute('data-close-value') === myTrS[i].getAttribute('data-close-value')) {

						myArr2.forEach((el, i) => {

							if (elem.getAttribute('data-close-value') === el.id) {
								myArr2.splice(i, 1)
								localStorage.setItem('goods', JSON.stringify(myArr2));
								elem.parentElement.remove();
								countText.textContent = (myArr2.length);
							}
						})

					}


					recalculationOfTheFullAmount();

				})
			})

		}

		deletingACartItem();

		// Поиск

		let searchInput = document.querySelector('.search__wrap-top input');
		let searchRez = document.querySelector('.search__rez');

		function fruitsOut(container, elem, arr) {
			container.innerHTML = ''

			arr.forEach(item => {
				const elemCreateParam = document.createElement(elem);
				elemCreateParam.href = `${item.url}.html`;
				elemCreateParam.textContent = `${item.name}`;
				container.appendChild(elemCreateParam);
			})

		}

		if (searchInput) {
			searchInput.addEventListener('input', function () {
				fruitsOut(searchRez, 'a', handle(this.value, data.people))
				console.log(handle(this.value, data.people))
			})
		}

		function handle(text, arr) {
			if (text.length === 0) {
				let arr2 = [];
				return arr2

			}
			return arr.filter(el => {
				// return el.name.toLowerCase().indexOf(text.toLowerCase()) > -1


				if (el.name.toLowerCase().search(text.toLowerCase()) > -1) {
					return el
				}
			})
		}



		// Конец поиска


		// Сортировка по range

		let calculatorForm = document.querySelector('.calculator__form');
		let calculatorFormSelect = document.querySelector('.calculator__form-select');
		let catalogWrap = document.querySelector('.catalog__wrap');

		if (calculatorForm) {
			calculatorForm.addEventListener('submit', (e) => {
				let catalogItem = document.querySelectorAll('.catalog__item');
				e.preventDefault();

				let calculatorFormPriceMin = document.querySelector('.calculator__form-price-min');
				let calculatorFormPriceMax = document.querySelector('.calculator__form-price-max');
				let myPrice;
				let rez;

				data.people.forEach((el, i) => {


					if (el.discountPersent != false) {
						rez = el.price / 100 * el.discountPersent;
						myPrice = (el.price - rez).toFixed(0);

					} else {
						myPrice = el.price;
					}

					if (calculatorFormSelect.value == el.affiliation && (myPrice <= calculatorFormPriceMax.value && myPrice >= calculatorFormPriceMin.value)) {
						catalogItem[i].classList.add('show')
						catalogItem[i].classList.remove('hide')
					} else {
						catalogItem[i].classList.add('hide')
						catalogItem[i].classList.remove('show')
					}
					if (calculatorFormSelect.value == 0 && (myPrice <= calculatorFormPriceMax.value && myPrice >= calculatorFormPriceMin.value)) {
						catalogItem[i].classList.add('show')
						catalogItem[i].classList.remove('hide')
					}
				})


			})
		}


		// Конец Сортировки по range

		// // Конец корзины 1

		// // // Реализация корзины 2

		// let catalogMascBtnJs2 = document.querySelectorAll('.catalog__masc-btn-js-2');

		// const newGoods2 = (id, count = 1) => ({
		// 	id: id,
		// 	count: count
		// });

		// // let currentCartCount = 0;
		// // let countText = document.querySelector('.basket-value');

		// if (localStorage.getItem('goods2') !== undefined && localStorage.getItem('goods2') !== null) {
		// 	let arrayLC2 = JSON.parse(localStorage.getItem('goods2'));
		// 	countText.textContent = (arrayLC2.length);
		// }



		// catalogMascBtnJs2.forEach(elem => {
		// 	elem.addEventListener('click', (e) => {
		// 		e.preventDefault();

		// 		let dataNumber2 = elem.getAttribute('data-number');
		// 		let newObjGoods2 = newGoods2(dataNumber2);

		// 		if (localStorage.getItem('goods2') == undefined && localStorage.getItem('goods2') == null) {
		// 			let goods2 = [];
		// 			goods2 = [...goods2, newObjGoods2];
		// 			localStorage.setItem('goods2', JSON.stringify(goods2));
		// 			countText.textContent = (goods2.length);
		// 		} else {
		// 			let oldGoods2 = JSON.parse(localStorage.getItem('goods2'));
		// 			let findIldItem2 = oldGoods2.find(el => el.id == dataNumber2);

		// 			if (findIldItem2 == undefined) {
		// 				oldGoods2 = [...oldGoods2, newObjGoods2];
		// 			} else {
		// 				oldGoods2.filter((item) => {
		// 					if (item.id == dataNumber2) {
		// 						item.count = item.count + 1;
		// 					}
		// 					return item;
		// 				})
		// 			}
		// 			localStorage.setItem('goods2', JSON.stringify(oldGoods2));
		// 			countText.textContent = (oldGoods2.length)
		// 		}

		// 	})
		// })

		// // let basket__wrap = document.querySelector('.basket__wrap');

		// if (basket__wrap) {
		// 	let dataArr2 = JSON.parse(localStorage.getItem('goods2'))
		// 	let arr2 = [];

		// 	arr2 = data.gifts.filter(el => (dataArr2.includes(el.id)))

		// 	dataArr2.forEach(elem => {
		// 		let div2 = document.createElement('div');
		// 		let myPrice3;
		// 		let rez3;

		// 		if (data.gifts[elem.id - 1].discountPersent != false) {
		// 			re2 = data.gifts[elem.id - 1].price / 100 * data.people[elem.id - 1].discountPersent;
		// 			myPrice3 = (data.gifts[elem.id - 1].price - rez3).toFixed(0);

		// 		} else {
		// 			myPrice3 = data.gifts[elem.id - 1].price;
		// 		}


		// 		div2.innerHTML = `
		// 					<div>${data.gifts[elem.id - 1].name}</div>
		// 					<div class="myCount-2">${elem.count}</div>
		// 					<div class="ArrMyPrice-2">${myPrice3 * elem.count}</div>
		// 					<div class="myPlus-2" data-value-plus = ${elem.id}>+</div>
		// 				`;
		// 		basket__wrap.append(div2);

		// 		let myPlus2 = document.querySelectorAll('.myPlus-2');
		// 		let myCount2 = document.querySelectorAll('.myCount-2');
		// 		let ArrMyPrice2 = document.querySelectorAll('.ArrMyPrice-2');
		// 		let myArr2 = JSON.parse(localStorage.getItem('goods2'));
		// 		let rez2;
		// 		let myPrice2;



		// 		myPlus2.forEach((elem, i) => {
		// 			elem.addEventListener('click', (e) => {


		// 				if (e.target.getAttribute('data-value-plus') == myArr2[i].id) {
		// 					myArr2[i].count++;
		// 				}

		// 				localStorage.setItem('goods2', JSON.stringify(myArr2));
		// 				myCount2[i].textContent = myArr2[i].count;

		// 				console.log(data.gifts[i])

		// 				if (data.gifts[i].discountPersent != false) {
		// 					rez2 = data.gifts[i].price / 100 * data.gifts[i].discountPersent;
		// 					myPrice2 = (data.gifts[i].price - rez2).toFixed(0);

		// 				} else {
		// 					myPrice2 = data.gifts[i].price;
		// 				}


		// 				ArrMyPrice2[i].textContent = myPrice2 * myArr2[i].count;



		// 			})
		// 		})

		// 	})

		// }

		// // Конец корзины 2




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