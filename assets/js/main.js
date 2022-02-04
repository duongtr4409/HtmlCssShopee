const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const headerRegistry = $('#header__registry');  // headerRegistry element
const headerLogin = $('#header__login');    // headerLogin element

const modal = $('.modal');      // base modal
const registryForm = $('#Registry-Form');   // registry form modal
const loginForm = $('#Login-Form');     // login form modal

const searchHistory = $('.header__search-history');    // search history
const searchInput = $('input.header__search-input');    // search input

const app = {

    isOpenModalRegistry : false,
    isOpenModalLogin : false,

    handlerEvent : function(){
        
            // handler event when click headerRegistry
        if(headerRegistry){
            headerRegistry.onclick = function(event){
                app.isOpenModalRegistry = !app.isOpenModalRegistry;
                app.openModal(registryForm);
            }
        }

            // handler event when click headerLogin
        if(headerLogin){
            headerLogin.onclick = function(event){
                event.preventDefault();
                app.isOpenModalLogin = !app.isOpenModalLogin;
                app.openModal(loginForm);
            }
        }

            // handler event when focus searchInput
        if(searchInput){
            searchInput.onfocus = function(event){
                if(searchHistory) searchHistory.style.display = 'block';
            }
        }

            // handler event when click on searchHistory
        if(searchHistory){
            searchHistory.onclick = function(event){
                if(event.target.closest('.header__search-history-item')){
                    if(searchInput) searchInput.value = event.target.innerText;
                }else{
                    if(searchInput) searchInput.value = '';
                }
                searchHistory.style.display = 'none';
            }
        }

            // handler event when click ESC key
        if(modal){
            document.onkeyup = function(event){
                if(modal.style?.display && modal.style?.display?.toUpperCase() != "NONE"){
                    if(event.keyCode === 27){
                        if(app.isOpenModalLogin){
                            loginForm.style.display = 'none';
                            app.isOpenModalLogin = !app.isOpenModalLogin;
                        }
                        if(app.isOpenModalRegistry){
                            registryForm.style.display = 'none';
                            app.isOpenModalRegistry = !app.isOpenModalRegistry;
                        }
                        modal.style.display = 'none';
                    }
                }
            }
        }
    },

    start : function(){
        this.handlerEvent();
    },

    /**
     * 
     * @param {*} formModal : form tương ứng cần mở
     */
    openModal : function(formModal){
        if(modal && formModal){
            modal.style.display = "flex";
            formModal.style.display = "block";

            // handler event of modal
                // handler event click 'TRỞ LẠI' on modal
            const cancelBtn = formModal.querySelector('.auth-form__controls-back');
            if(cancelBtn){
                cancelBtn.onclick = function(event){
                    app.closeModal(formModal);
                    // if(app.isOpenModalRegistry) app.isOpenModalRegistry = !app.isOpenModalRegistry;
                    // if(app.isOpenModalLogin) app.isOpenModalLogin = !app.isOpenModalLogin;
                }
            }

                // handler event click 'switch-btn' on modal
            const switchBtn = formModal.querySelector('.auth-form__switch-btn');
            if(switchBtn){
                switchBtn.onclick = function(event){
                    if(app.isOpenModalLogin){
                        app.closeModal(formModal);
                        app.isOpenModalRegistry = !app.isOpenModalRegistry;
                        app.openModal(registryForm);
                        return;
                    }
                    if(app.isOpenModalRegistry){
                        app.closeModal(formModal);
                        app.isOpenModalLogin = !app.isOpenModalLogin;
                        app.openModal(loginForm);
                        return;
                    }
                }
            }
        }
    },

    /**
     * 
     * @param {*} formModal : form tương ứng cần đóng
     */
    closeModal : function(formModal){
        if(modal && formModal){
            if(app.isOpenModalLogin){
                loginForm.style.display = 'none';
                app.isOpenModalLogin = !app.isOpenModalLogin;
            }
            if(app.isOpenModalRegistry){
                registryForm.style.display = 'none';
                app.isOpenModalRegistry = !app.isOpenModalRegistry;
            }
            modal.style.display = 'none';
        }
    },

}

app.start();