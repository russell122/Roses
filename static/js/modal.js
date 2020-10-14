// modal

let myModal = (btns, wrap) => {

    let modalBtn = document.querySelectorAll(btns);
    let modal = document.querySelector(wrap);
    let windows = document.querySelectorAll('[data-modal-info]');

    let scroll = calcScroll();

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    modalBtn.forEach(item => {
        item.addEventListener('click', (e) => {

            windows.forEach(item => {
                item.classList.remove('open');
            })

            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            document.querySelector('.header').style.right = `8.5px`;
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {

            windows.forEach(item => {
                item.classList.remove('open');
            });

            modal.classList.remove('open');
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            document.querySelector('.header').style.right = `0px`;

        }
        if (e.target.getAttribute('data-close') == '') {
            modal.classList.remove('open');
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            document.querySelector('.header').style.right = `0px`;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (modal.classList.contains('open') && e.key === 'Escape') {
            modal.classList.remove('open');
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            document.querySelector('.header').style.right = `0px`;
        }
    })

}

myModal('.header__top-personalArea', '.modal-lk');
myModal('.modal__btn-registration', '.modal-registration');
myModal('.modal__help', '.modal-recovery');
myModal('.basket__wrap-btn', '.modal-thanks');

// end modal
