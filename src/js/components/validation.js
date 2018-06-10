// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
export function validate(formEl, callback) {
    const form = document.getElementById(formEl);
    
    if (form) {
        const inputs = form.querySelectorAll('input');
        const textareas = form.querySelectorAll('textarea');
        const selects = form.querySelectorAll('select');
        let re;
        let error;
        
        // Selects
        for (let i = 0; i < selects.length; i++) {
            error = selects[i].dataset.errorMessage;
            const options = selects[i].parentElement.querySelectorAll('.select__option');
            
            console.log(options);
            
            for (let j = 0; j < options.length; j++) {
                options[j].addEventListener('click', () => {
                    console.log(options[j]);
                    if (options[j].dataset.val === 'empty') {
                        selects[i].parentElement.classList.add('error');
                        form.classList.add('invalid');
                        if (error) {
                            addErrorMessage(selects[i].parentElement);
                        }
                    } else {
                        selects[i].parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                        removeErrorMessage(selects[i].parentElement);
                    }
                });
            }
        }
        
        function checkSelects() {
            for (let i = 0; i < selects.length; i++) {
                error = selects[i].dataset.errorMessage;
                if (selects[i].value === 'empty') {
                    selects[i].parentElement.classList.add('error');
                    form.classList.add('invalid');
                    if (error) {
                        addErrorMessage(selects[i].parentElement);
                    }
                } else {
                    selects[i].parentElement.classList.remove('error');
                    form.classList.remove('invalid');
                    removeErrorMessage(selects[i].parentElement);
                }
            }
        }
        
        // Inputs
        function checkInputs(input) {
            if (input.dataset.required === 'required') {
                const name = input.getAttribute('name');
                const type = input.getAttribute('type');
                error = input.dataset.errorMessage;
    
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.parentElement.classList.add('error');
                        form.classList.add('invalid');
                        if (error) {
                            addErrorMessage(input);
                        }
                    } else {
                        input.parentElement.classList.remove('error');
                        form.classList.remove('invalid');
                        removeErrorMessage(input);
                    }
                } else if (type === 'radio') {
                    const groupName = input.getAttribute('name');
                    const group = Array.from(document.querySelectorAll(`[name="${groupName}"]`));
                    let i;
        
                    for (i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
        
                    if (i === group.length) {
                        for (let item of group) {
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        }
                    } else {
                        for (let item of group) {
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
                        }
                    }
                } else {
                    if (name) {
                        switch (name) {
                            case 'name':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'firstName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'lastName':
                                re = /^[a-zA-Z]{3,20}$/;
                                patternInput();
                                break;
                            case 'email':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'mail':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'phone':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
        
                            default: randomInput();
                        }
                    }
                    
                    function randomInput() {
                        if (input.value === '') {
                            input.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
                        }
                    }
                    
                    function patternInput() {
                        if (!re.test(input.value)) {
                            input.classList.add('error');
                            form.classList.add('invalid');
                            if (error) {
                                addErrorMessage(input);
                            }
                        } else {
                            input.classList.remove('error');
                            form.classList.remove('invalid');
                            removeErrorMessage(input);
                        }
                    }
                }
            }
        }
        
        // Add error message
        function addErrorMessage(input) {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.innerHTML = error;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling == null || !input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.insertAdjacentElement('afterend', message);
                }
                
            } else {
                if (input.nextElementSibling == null) {
                    input.insertAdjacentElement('afterend', message);
                }
            }
        }
    
        // Remove error message
        function removeErrorMessage(input) {
            const message = input.nextSibling;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling != null && input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.nextElementSibling.remove();
                }
            } else {
                if (input.nextElementSibling != null) {
                    message.remove();
                }
            }
        }
        
        // Inputs listeners
        for (let k = 0; k < inputs.length; k++) {
            const type = inputs[k].getAttribute('type');
            if (type === 'checkbox' || type === 'radio') {
                inputs[k].addEventListener('change', () => {
                    checkInputs(inputs[k]);
                });
            } else {
                inputs[k].addEventListener('blur', () => {
                    checkInputs(inputs[k]);
                });
            }
        }
    
        // Textarea
        for (let l = 0; l < textareas.length; l++) {
            textareas[l].addEventListener('blur', () => {
                checkInputs(textareas[l]);
            });
        }
        
        // Submit listener
        form.addEventListener('submit', (e) => {
    
            for (let k = 0; k < inputs.length; k++) {
                checkInputs(inputs[k]);
            }
            
            for (let l = 0; l < textareas.length; l++) {
                checkInputs(textareas[l]);
            }
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if(callback) {
                    callback(e);
                }
            }
        });
    }
}
