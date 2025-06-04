// Refugi Authentication App JavaScript with Theme Toggle and Firebase Integration

document.addEventListener('DOMContentLoaded', function() {
    // ===== DECLARE ALL VARIABLES FIRST =====
    // Get form elements
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    // ... all other form variables ...
    
    // Theme toggle elements - DECLARE BEFORE USE
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    // Initialize theme functionality first
    initializeTheme();
    
    // Get form elements
    
    const signinFormElement = document.getElementById('signin-form-element');
    const signupFormElement = document.getElementById('signup-form-element');
    const forgotPasswordFormElement = document.getElementById('forgot-password-form-element');
    
    // Get navigation buttons
    const showSignupBtn = document.getElementById('show-signup');
    const showSigninBtn = document.getElementById('show-signin');
    const showForgotPasswordBtn = document.getElementById('show-forgot-password');
    const backToSigninBtn = document.getElementById('back-to-signin');
    
    // Get contact input for phone formatting
    const contactInput = document.getElementById('signup-contato');
    
    // Theme toggle functionality
    
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    // Form switching functionality
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignup();
        });
    }
    
    if (showSigninBtn) {
        showSigninBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignin();
        });
    }
    
    if (showForgotPasswordBtn) {
        showForgotPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToForgotPassword();
        });
    }
    
    if (backToSigninBtn) {
        backToSigninBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignin();
        });
    }
    
    // Theme functions
    function initializeTheme() {
        try {
            // Check for saved theme preference or default to light mode
            const savedTheme = localStorage.getItem('refugi-theme') || 'light';
            setTheme(savedTheme);
            console.log('Tema inicializado:', savedTheme);
        } catch (error) {
            console.warn('Erro ao acessar localStorage, usando tema padrão');
            setTheme('light');
        }
    }
    
    function setTheme(theme) {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Save to localStorage
        try {
            localStorage.setItem('refugi-theme', theme);
        } catch (error) {
            console.warn('Não foi possível salvar a preferência de tema');
        }
        
        // Update theme icon
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-moon-fill';
            } else {
                themeIcon.className = 'bi bi-sun-fill';
            }
        }
        
        console.log(`Tema aplicado: ${theme}`);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add visual feedback to the toggle button
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
        
        console.log(`Tema alterado de ${currentTheme} para ${newTheme}`);
    }
    
    // Form switching functions
    function switchToSignup() {
        hideAllForms();
        if (signupForm) {
            signupForm.classList.remove('d-none');
        }
        
        // Reset signin form
        if (signinFormElement) {
            signinFormElement.reset();
            signinFormElement.classList.remove('was-validated');
            clearValidationMessages(signinFormElement);
        }
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = document.getElementById('signup-nome');
            if (firstInput) firstInput.focus();
        }, 300);
    }
    
    function switchToSignin() {
        hideAllForms();
        if (signinForm) {
            signinForm.classList.remove('d-none');
        }
        
        // Reset other forms
        if (signupFormElement) {
            signupFormElement.reset();
            signupFormElement.classList.remove('was-validated');
            clearValidationMessages(signupFormElement);
        }
        
        if (forgotPasswordFormElement) {
            forgotPasswordFormElement.reset();
            forgotPasswordFormElement.classList.remove('was-validated');
            clearValidationMessages(forgotPasswordFormElement);
        }
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = document.getElementById('signin-email');
            if (firstInput) firstInput.focus();
        }, 300);
    }
    
    function switchToForgotPassword() {
        hideAllForms();
        if (forgotPasswordForm) {
            forgotPasswordForm.classList.remove('d-none');
        }
        
        // Reset signin form
        if (signinFormElement) {
            signinFormElement.reset();
            signinFormElement.classList.remove('was-validated');
            clearValidationMessages(signinFormElement);
        }
        
        // Focus on email input
        setTimeout(() => {
            const emailInput = document.getElementById('forgot-email');
            if (emailInput) emailInput.focus();
        }, 300);
    }
    
    function hideAllForms() {
        if (signinForm) signinForm.classList.add('d-none');
        if (signupForm) signupForm.classList.add('d-none');
        if (forgotPasswordForm) forgotPasswordForm.classList.add('d-none');
    }
    
    // Phone number formatting for contact field
    if (contactInput) {
        contactInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
            
            if (value.length >= 11) {
                value = value.substring(0, 11); // Limit to 11 digits
            }
            
            if (value.length >= 2) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            
            if (value.length >= 10) {
                value = value.substring(0, 10) + '-' + value.substring(10);
            }
            
            e.target.value = value;
        });
        
        // Prevent non-numeric input except for formatting characters
        contactInput.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[\d\(\)\-\s]/.test(char) && e.which !== 8 && e.which !== 46) {
                e.preventDefault();
            }
        });
    }
    
    // Form validation and submission
    if (signinFormElement) {
        signinFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.checkValidity()) {
                handleSigninSubmit();
            } else {
                this.classList.add('was-validated');
            }
        });
    }
    
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.checkValidity() && validateCustomFields()) {
                handleSignupSubmit();
            } else {
                this.classList.add('was-validated');
            }
        });
    }
    
    if (forgotPasswordFormElement) {
        forgotPasswordFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (this.checkValidity()) {
                handleForgotPasswordSubmit();
            } else {
                this.classList.add('was-validated');
                showErrorMessage('Por favor, insira um email válido.', forgotPasswordFormElement);
            }
        });
    }
    
    // Custom validation for signup form
    function validateCustomFields() {
        let isValid = true;
        
        // Validate contact format
        if (contactInput) {
            const contactValue = contactInput.value;
            const contactRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
            
            if (!contactRegex.test(contactValue)) {
                contactInput.setCustomValidity('Por favor, insira um contato válido no formato (xx) xxxx-xxxx.');
                isValid = false;
            } else {
                contactInput.setCustomValidity('');
            }
        }
        
        // Validate capacity is a positive number
        const capacityInput = document.getElementById('signup-capacidade');
        if (capacityInput) {
            const capacityValue = parseInt(capacityInput.value);
            
            if (isNaN(capacityValue) || capacityValue < 1) {
                capacityInput.setCustomValidity('A capacidade deve ser um número maior que zero.');
                isValid = false;
            } else {
                capacityInput.setCustomValidity('');
            }
        }
        
        return isValid;
    }
    
    // Handle signin form submission
    function handleSigninSubmit() {
        const submitBtn = signinFormElement.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Entrando...';
        
        // Get form data
        const formData = {
            email: document.getElementById('signin-email').value,
            senha: document.getElementById('signin-password').value
        };
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Show success message
            showSuccessMessage('Login realizado com sucesso!', signinFormElement);
            
            // In a real app, you would redirect to dashboard
            console.log('Signin data:', formData);
            
            // Add success animation
            signinFormElement.classList.add('success-animation');
            setTimeout(() => {
                signinFormElement.classList.remove('success-animation');
            }, 600);
        }, 1500);
    }
    
    // Handle signup form submission
    function handleSignupSubmit() {
        const submitBtn = signupFormElement.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Cadastrando...';
        
        // Get form data
        const formData = {
            nome: document.getElementById('signup-nome').value,
            email: document.getElementById('signup-email').value,
            nomeAbrigo: document.getElementById('signup-abrigo').value,
            capacidadeMaxima: parseInt(document.getElementById('signup-capacidade').value),
            contato: document.getElementById('signup-contato').value,
            senha: document.getElementById('signup-password').value
        };
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Show success message
            showSuccessMessage('Cadastro realizado com sucesso! Redirecionando para login...', signupFormElement);
            
            // In a real app, you would make an API call
            console.log('Signup data:', formData);
            
            // Add success animation and switch to signin after delay
            signupFormElement.classList.add('success-animation');
            setTimeout(() => {
                signupFormElement.classList.remove('success-animation');
                switchToSignin();
            }, 2000);
        }, 1500);
    }
    
    // Handle forgot password form submission with Firebase
    function handleForgotPasswordSubmit() {
        const submitBtn = forgotPasswordFormElement.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const emailInput = document.getElementById('forgot-email');
        const email = emailInput.value;
        
        // Validate email format
        if (!validateEmail(email)) {
            showErrorMessage('Por favor, insira um email válido.', forgotPasswordFormElement);
            emailInput.focus();
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';
        
        // Firebase password reset implementation
        if (window.firebaseAuth) {
            // Import sendPasswordResetEmail dynamically
            import('https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js')
                .then(({ sendPasswordResetEmail }) => {
                    return sendPasswordResetEmail(window.firebaseAuth, email);
                })
                .then(() => {
                    // Success
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    showSuccessMessage(
                        `Email de redefinição enviado para ${email}. Verifique sua caixa de entrada e spam.`,
                        forgotPasswordFormElement
                    );
                    
                    console.log('Password reset email sent successfully');
                    
                    // Clear form and focus
                    forgotPasswordFormElement.reset();
                    forgotPasswordFormElement.classList.remove('was-validated');
                    
                    // Auto redirect to signin after delay
                    setTimeout(() => {
                        switchToSignin();
                    }, 3000);
                })
                .catch((error) => {
                    // Error handling
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    let errorMessage = 'Erro ao enviar email de redefinição. Tente novamente.';
                    
                    // Firebase error messages in Portuguese
                    switch (error.code) {
                        case 'auth/user-not-found':
                            errorMessage = 'Email não encontrado. Verifique o endereço e tente novamente.';
                            break;
                        case 'auth/invalid-email':
                            errorMessage = 'Email inválido. Verifique o formato do endereço.';
                            break;
                        case 'auth/too-many-requests':
                            errorMessage = 'Muitas tentativas. Tente novamente em alguns minutos.';
                            break;
                        case 'auth/network-request-failed':
                            errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
                            break;
                    }
                    
                    showErrorMessage(errorMessage, forgotPasswordFormElement);
                    console.error('Password reset error:', error);
                });
        } else {
            // Fallback simulation if Firebase is not configured
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                showSuccessMessage(
                    `Email de redefinição seria enviado para ${email}. (Firebase não configurado - modo simulação)`,
                    forgotPasswordFormElement
                );
                
                console.log('Firebase auth not available - simulation mode');
                console.log('Password reset requested for:', email);
                
                // Clear form
                forgotPasswordFormElement.reset();
                forgotPasswordFormElement.classList.remove('was-validated');
                
                setTimeout(() => {
                    switchToSignin();
                }, 3000);
            }, 1500);
        }
    }
    
    // Show success message
    function showSuccessMessage(message, form) {
        // Remove existing alerts
        const existingAlerts = form.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create success alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show mb-3';
        alert.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        `;
        
        // Insert at top of form
        form.insertBefore(alert, form.firstChild);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage(message, form) {
        // Remove existing alerts
        const existingAlerts = form.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        // Create error alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show mb-3';
        alert.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        `;
        
        // Insert at top of form
        form.insertBefore(alert, form.firstChild);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
    
    // Clear validation messages
    function clearValidationMessages(form) {
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.setCustomValidity('');
            input.classList.remove('is-valid', 'is-invalid');
        });
        
        const alerts = form.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
    }
    
    // Real-time validation feedback
    function setupRealTimeValidation() {
        const allInputs = document.querySelectorAll('.form-control');
        
        allInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.form.classList.contains('was-validated')) {
                    validateSingleField(this);
                }
            });
            
            input.addEventListener('input', function() {
                if (this.form.classList.contains('was-validated')) {
                    // Clear custom validity on input change
                    this.setCustomValidity('');
                    validateSingleField(this);
                }
            });
        });
    }
    
    // Validate single field
    function validateSingleField(field) {
        const isValid = field.checkValidity();
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }
    
    // Initialize real-time validation
    setupRealTimeValidation();
    
    // Email validation enhancement
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Password strength indicator (for signup)
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            showPasswordStrength(strength, this);
        });
    }
    
    // Calculate password strength
    function calculatePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        if (score < 2) return 'weak';
        if (score < 4) return 'medium';
        return 'strong';
    }
    
    // Show password strength indicator
    function showPasswordStrength(strength, input) {
        // Remove existing indicator
        const existingIndicator = input.parentNode.querySelector('.password-strength');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        if (input.value.length === 0) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'password-strength mt-1';
        
        const strengthText = {
            weak: 'Fraca',
            medium: 'Média', 
            strong: 'Forte'
        };
        
        const strengthClass = {
            weak: 'text-danger',
            medium: 'text-warning',
            strong: 'text-success'
        };
        
        indicator.innerHTML = `
            <small class="${strengthClass[strength]}">
                <i class="bi bi-shield-${strength === 'strong' ? 'check' : strength === 'medium' ? 'exclamation' : 'x'}"></i>
                Força da senha: ${strengthText[strength]}
            </small>
        `;
        
        input.parentNode.appendChild(indicator);
    }
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Enter key handling for form submission
        if (e.key === 'Enter' && e.target.classList.contains('form-control')) {
            const form = e.target.closest('form');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
        
        // Escape key to clear forms
        if (e.key === 'Escape') {
            const activeForm = document.querySelector('.auth-form:not(.d-none) form');
            if (activeForm) {
                activeForm.reset();
                activeForm.classList.remove('was-validated');
                clearValidationMessages(activeForm);
            }
        }
    });
    
    // Focus management for accessibility
    function manageFocus() {
        const firstInput = document.querySelector('.auth-form:not(.d-none) .form-control');
        if (firstInput) {
            firstInput.focus();
        }
    }
    
    // Initialize focus on page load
    setTimeout(manageFocus, 100);
    
    // Console welcome message
    console.log('%c🏠 Refugi Authentication System', 'color: #2180cd; font-size: 16px; font-weight: bold;');
    console.log('Sistema de autenticação com alternância de tema carregado com sucesso!');
    console.log('Tema atual:', document.documentElement.getAttribute('data-theme'));
    
    // Firebase configuration check
    if (window.firebaseAuth) {
        console.log('✅ Firebase Auth configurado e disponível');
    } else {
        console.log('⚠️ Firebase Auth não configurado - funcionando em modo simulação');
        console.log('Para ativar o Firebase, substitua a configuração no HTML com suas credenciais.');
    }
});