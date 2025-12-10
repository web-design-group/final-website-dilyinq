document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - checking form functionality');
    
    const placeholders = document.querySelectorAll('.field-placeholder');
    console.log('Found placeholders:', placeholders.length);
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            console.log('Placeholder clicked:', this.getAttribute('data-target'));
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const fieldWrapper = this.parentElement;
            
            if (input && fieldWrapper) {
                fieldWrapper.classList.add('expanded');
                
                setTimeout(() => {
                    input.focus();
                }, 10);
            }
        });
    });
    
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                const fieldWrapper = this.parentElement;
                setTimeout(() => {
                    fieldWrapper.classList.remove('expanded');
                }, 150);
            }
        });
    });
    
    const form = document.getElementById('contactForm');
    const successSection = document.getElementById('successSection');
    const feedbackSection = document.querySelector('.feedback-section');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            const allFieldWrappers = document.querySelectorAll('.form-field-wrapper');
            allFieldWrappers.forEach(wrapper => {
                wrapper.classList.add('expanded');
            });
            
            form.classList.add('was-validated');
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const commentInput = document.getElementById('comment');
            
            const isNameValid = nameInput.value.trim() !== '';
            const isEmailValid = emailInput.value.trim() !== '' && emailInput.checkValidity();
            const isPhoneValid = phoneInput.value.trim() !== '';
            const isCommentValid = commentInput.value.trim() !== '';
            
            const isFormValid = isNameValid && isEmailValid && isPhoneValid && isCommentValid;
            
            console.log('Validation results:', {
                name: isNameValid,
                email: isEmailValid,
                phone: isPhoneValid,
                comment: isCommentValid,
                all: isFormValid
            });
            
            if (isFormValid) {
                console.log('Form is valid - showing success message');
                if (feedbackSection) {
                    feedbackSection.style.display = 'none';
                }
                if (successSection) {
                    successSection.classList.remove('d-none');
                }
                
            } else {
                console.log('Form is invalid - showing validation errors');
                if (!isNameValid) {
                    nameInput.setCustomValidity('Пожалуйста, введите ваше имя');
                }
                if (!isEmailValid) {
                    emailInput.setCustomValidity('Пожалуйста, введите корректный email');
                }
                if (!isPhoneValid) {
                    phoneInput.setCustomValidity('Пожалуйста, введите ваш телефон');
                }
                if (!isCommentValid) {
                    commentInput.setCustomValidity('Пожалуйста, введите ваш комментарий');
                }
            }
        });
    }
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    });
});