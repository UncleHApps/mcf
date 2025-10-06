import '../css/input.css';
import Alpine from 'alpinejs';
import focus from '@alpinejs/focus';
window.Alpine = Alpine;
Alpine.plugin(focus);

// --- HELPER FUNCTION TO GENERATE A UNIQUE, TRACEABLE QUOTE ID ---
const generateQuoteId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `MCF-${year}${month}${day}-${hours}${minutes}${seconds}`;
};

// --- DATA SOURCE FOR PHONE INPUT ---
const countries = [
    { name: "South Africa", dial_code: "+27", code: "ZA", flag: "🇿🇦" }, { name: "Zimbabwe", dial_code: "+263", code: "ZW", flag: "🇿🇼" }, { name: "Zambia", dial_code: "+260", code: "ZM", flag: "🇿🇲" }, { name: "Malawi", dial_code: "+265", code: "MW", flag: "🇲🇼" },
    { name: "Afghanistan", dial_code: "+93", code: "AF", flag: "🇦🇫" }, { name: "Albania", dial_code: "+355", code: "AL", flag: "🇦🇱" }, { name: "Algeria", dial_code: "+213", code: "DZ", flag: "🇩🇿" }, { name: "Andorra", dial_code: "+376", code: "AD", flag: "🇦🇩" }, { name: "Angola", dial_code: "+244", code: "AO", flag: "🇦🇴" },
    { name: "Argentina", dial_code: "+54", code: "AR", flag: "🇦🇷" }, { name: "Australia", dial_code: "+61", code: "AU", flag: "🇦🇺" }, { name: "Austria", dial_code: "+43", code: "AT", flag: "🇦🇹" }, { name: "Belgium", dial_code: "+32", code: "BE", flag: "🇧🇪" },
    { name: "Botswana", dial_code: "+267", code: "BW", flag: "🇧🇼" }, { name: "Brazil", dial_code: "+55", code: "BR", flag: "🇧🇷" }, { name: "Canada", dial_code: "+1", code: "CA", flag: "🇨🇦" }, { name: "China", dial_code: "+86", code: "CN", flag: "🇨🇳" },
    { name: "Congo, The Democratic Republic of the", dial_code: "+243", code: "CD", flag: "🇨🇩" }, { name: "Denmark", dial_code: "+45", code: "DK", flag: "🇩🇰" }, { name: "Egypt", dial_code: "+20", code: "EG", flag: "🇪🇬" }, { name: "Ethiopia", dial_code: "+251", code: "ET", flag: "🇪🇹" },
    { name: "France", dial_code: "+33", code: "FR", flag: "🇫🇷" }, { name: "Germany", dial_code: "+49", code: "DE", flag: "🇩🇪" }, { name: "Ghana", dial_code: "+233", code: "GH", flag: "🇬🇭" }, { name: "Greece", dial_code: "+30", code: "GR", flag: "🇬🇷" },
    { name: "India", dial_code: "+91", code: "IN", flag: "🇮🇳" }, { name: "Ireland", dial_code: "+353", code: "IE", flag: "🇮🇪" }, { name: "Italy", dial_code: "+39", code: "IT", flag: "🇮🇹" }, { name: "Japan", dial_code: "+81", code: "JP", flag: "🇯🇵" },
    { name: "Kenya", dial_code: "+254", code: "KE", flag: "🇰🇪" }, { name: "Lesotho", dial_code: "+266", code: "LS", flag: "🇱🇸" }, { name: "Mozambique", dial_code: "+258", code: "MZ", flag: "🇲🇿" }, { name: "Namibia", dial_code: "+264", code: "NA", flag: "🇳🇦" },
    { name: "Netherlands", dial_code: "+31", code: "NL", flag: "🇳🇱" }, { name: "New Zealand", dial_code: "+64", code: "NZ", flag: "🇳🇿" }, { name: "Nigeria", dial_code: "+234", code: "NG", flag: "🇳🇬" }, { name: "Portugal", dial_code: "+351", code: "PT", flag: "🇵🇹" },
    { name: "Russia", dial_code: "+7", code: "RU", flag: "🇷🇺" }, { name: "Spain", dial_code: "+34", code: "ES", flag: "🇪🇸" }, { name: "Swaziland", dial_code: "+268", code: "SZ", flag: "🇸🇿" }, { name: "Sweden", dial_code: "+46", code: "SE", flag: "🇸🇪" },
    { name: "Switzerland", dial_code: "+41", code: "CH", flag: "🇨🇭" }, { name: "Tanzania", dial_code: "+255", code: "TZ", flag: "🇹🇿" }, { name: "Turkey", dial_code: "+90", code: "TR", flag: "🇹🇷" }, { name: "Uganda", dial_code: "+256", code: "UG", flag: "🇺🇬" },
    { name: "United Arab Emirates", dial_code: "+971", code: "AE", flag: "🇦🇪" }, { name: "United Kingdom", dial_code: "+44", code: "GB", flag: "🇬🇧" }, { name: "United States", dial_code: "+1", code: "US", flag: "🇺🇸" }
];

// --- GLOBAL CALLBACK FOR GOOGLE MAPS SCRIPT ---
window.initMap = function() {
    // This function must exist in the global scope for the script callback to work.
};

// --- HELPER FUNCTION FOR REFINEMENT PAGE ---
const getInitialQuoteData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('data');
    if (sharedData) {
        try {
            const decodedState = JSON.parse(atob(sharedData));
            if (decodedState.quoteData) { return { quoteData: decodedState.quoteData, isSharedLink: true }; }
        } catch (e) { console.error("Could not parse shared data.", e); }
    }
    const countryParam = urlParams.get('country');
    const initialQuoteData = {
        name: urlParams.get('name') || '', email: urlParams.get('email') || '',
        initial_country: countryParam ? countryParam.charAt(0).toUpperCase() + countryParam.slice(1) : '',
        delivery_deadline_date: urlParams.get('delivery_date') || '',
        is_hazardous: urlParams.get('is_hazchem')?.toLowerCase() === 'true' ? 'Yes' : 'No',
        quote_id: urlParams.get('quote_id') || '',
        quote_reference_name: '', is_multipoint: 'No',
    };
    return { quoteData: initialQuoteData, isSharedLink: false };
};

// --- ALPINE.JS INITIALIZATION ---
document.addEventListener('alpine:init', () => {
    
    Alpine.data('globalState', () => ({
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('action') === 'new_quote') { setTimeout(() => { this.$store.modal.open(); }, 100); }
        }
    }));

    Alpine.store('quoteForm', {
        dataLoaded: false,
        quoteData: {
            name: '', email: '', company_name: '', product_description: '', initial_country: '', delivery_deadline_date: '', is_hazardous: '',
            tonnage_kg: '', number_of_items: '', total_volume: '', is_multipoint: 'No', collection_address: '', delivery_address_1: '',
            delivery_address_1_other: '', delivery_address_2: '', delivery_address_3: '', landline_country_code: '+27', landline_local_number: '',
            cell_country_code: '+27', cell_local_number: '', notification_preference: 'Email Only', secondary_email: '',
            quote_id: '', quote_reference_name: ''
        }
    });
    
    Alpine.store('modal', {
        isOpen: false, isLoading: false, isSuccess: false, continueUrl: '', 
        open() { this.isOpen = true; this.isSuccess = false; this.isLoading = false; },
        close() { this.isOpen = false; },
        async submitForm() {
            this.isLoading = true;
            const quoteId = generateQuoteId();
            const form = document.getElementById('quote-form');
            const formData = new FormData(form);
            const formParams = new URLSearchParams(formData);
            formParams.append('quote_id', quoteId);
            this.continueUrl = `/quote-refinement.html?${formParams.toString()}`;
            const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
            if (!webhookUrl) { console.error("Webhook URL is not configured."); alert("Submission endpoint is not configured."); this.isLoading = false; return; }
            const welcomePayload = {
                action: 'send_welcome_email', submission_timestamp: new Date().toISOString(),
                recipient_email: formParams.get('email'), recipient_name: formParams.get('name'), quote_id: quoteId,
                resume_url: `${window.location.origin}${this.continueUrl}`, country: formParams.get('country'),
                is_hazchem: formData.has('is_hazchem') ? 'Yes' : 'No', delivery_date: formParams.get('delivery_date')
            };
            try {
                const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(welcomePayload) });
                if (!response.ok) { console.error('Webhook call failed, but proceeding with UI change.'); }
                this.isLoading = false; this.isSuccess = true;
            } catch (error) { console.error('Fetch error:', error); this.isLoading = false; this.isSuccess = true; }
        },
        continueToQuote() { if (this.continueUrl) { window.location.href = this.continueUrl; } }
    });
    
    Alpine.data('datepicker', (dispatch, initialDate = '') => ({
        isOpen: false, selectedDate: initialDate, month: '', year: '', daysInMonth: [], blankDays: [],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        dayLabels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],_dispatch: dispatch,
        init() { let dateToUse; if (this.selectedDate) { const parts = this.selectedDate.split('-'); if (parts.length === 3) { const baseDate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])); if (!isNaN(baseDate.getTime())) { dateToUse = baseDate; } } } if (dateToUse) { this.month = dateToUse.getUTCMonth(); this.year = dateToUse.getUTCFullYear(); } else { const today = new Date(); this.month = today.getMonth(); this.year = today.getFullYear(); this.selectedDate = ''; } this.getDaysInMonth(); },
        repositionCalendar() { this.$nextTick(() => { const container = this.$refs.calendarContainer; if (!container || !this.isOpen) return; const rect = container.getBoundingClientRect(); if (rect.bottom > window.innerHeight) { container.classList.add('datepicker-above'); } else { container.classList.remove('datepicker-above'); } }); },
        getDaysInMonth() { const days = new Date(this.year, this.month + 1, 0).getDate(); const firstDay = new Date(this.year, this.month, 1).getDay(); this.blankDays = Array.from({ length: firstDay }); this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1); },
        selectDate(day) { this.selectedDate = `${this.year}-${String(this.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; if(this._dispatch) { this._dispatch('date-selected', { date: this.selectedDate }); } this.isOpen = false; },
        formatDate(isoDate) { if (!isoDate) return ''; const parts = isoDate.split('-'); if (parts.length !== 3) return ''; const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])); return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); },
        prevMonth() { if (this.month === 0) { this.month = 11; this.year--; } else { this.month--; } this.getDaysInMonth(); },
        nextMonth() { if (this.month === 11) { this.month = 0; this.year++; } else { this.month++; } this.getDaysInMonth(); },
        isSelected(day) { if(!this.selectedDate) return false; const d = new Date(Date.UTC(this.year, this.month, day)); return this.selectedDate === `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`; },
        isToday(day) { const today = new Date(); const d = new Date(this.year, this.month, day); return today.toDateString() === d.toDateString(); }
    }));
    
    Alpine.data('googleAddressInput', (dispatch, fieldName) => ({
        mode: 'search',
        init() {
            this.$watch('$store.quoteForm.dataLoaded', (isLoaded) => { if(isLoaded && this.$store.quoteForm.quoteData[fieldName]) { this.mode = 'manual'; } });
            this.$nextTick(() => {
                const autocompleteElement = this.$refs.autocompleteInput;
                if (autocompleteElement) {
                    autocompleteElement.addEventListener('gmp-placechange', (event) => {
                        const place = event.target.place;
                        if (place && place.formattedAddress) { dispatch('address-updated', { field: fieldName, value: place.formattedAddress }); }
                    });
                }
            });
        }
    }));

    Alpine.data('phoneInput', (countryCodeField) => ({
        isOpen: false, searchTerm: '', allCountries: countries, priorityCountries: countries.slice(0, 4), selectedCountry: countries[0],
        init() { const initialCode = this.$store.quoteForm.quoteData[countryCodeField]; this.selectedCountry = this.allCountries.find(c => c.dial_code === initialCode) || this.allCountries.find(c => c.code === 'ZA'); },
        get filteredCountries() { if (this.searchTerm === '') { return this.allCountries.slice(4); } const search = this.searchTerm.toLowerCase(); return this.allCountries.filter(country => country.name.toLowerCase().includes(search) || country.dial_code.includes(search)); },
        selectCountry(country) { this.selectedCountry = country; this.$store.quoteForm.quoteData[countryCodeField] = country.dial_code; this.isOpen = false; }
    }));

    Alpine.data('quoteForm', () => ({
        formPhase: 'loading',
        step: 1, totalSteps: 7, 
        summaryHtml: '', isSaving: false, showMobileSummary: false,
        showEditNameModal: false, tempReferenceName: '',
        showCollaborationModal: false, showSaveSuccessModal: false, collaboratorEmail: '', isSendingInvite: false,
        quoteIdForPrompt: '', quoteRefForPrompt: '',
        originalSenderName: '',

        steps: [ { id: 1, title: 'Initial Details', icon: 'fa-file-alt' }, { id: 2, title: 'Essentials', icon: 'fa-sliders' }, { id: 3, title: 'Product', icon: 'fa-box-open' }, { id: 4, title: 'Cargo', icon: 'fa-weight-hanging' }, { id: 5, title: 'Journey', icon: 'fa-truck-fast' }, { id: 6, title: 'Contact', icon: 'fa-address-card' }, { id: 7, title: 'Save/Submit', icon: 'fa-check-double' } ],
        get previousStepData() { if (this.step <= 1) return null; return this.steps.find(s => s.id === this.step - 1); },
        get currentStepData() { return this.steps.find(s => s.id === this.step); },
        get nextStepData() { if (this.step >= this.totalSteps) return null; return this.steps.find(s => s.id === this.step + 1); },

        init() {
            this.summaryHtml = this.$refs.summaryTemplate.innerHTML;
            this.$nextTick(() => {
                const savedData = localStorage.getItem('maschemQuoteInProgress');
                const urlParams = new URLSearchParams(window.location.search);
                if (savedData && !urlParams.has('data') && !urlParams.has('name') && !urlParams.has('quote_id')) {
                    const parsed = JSON.parse(savedData);
                    this.quoteIdForPrompt = parsed.quoteData.quote_id; this.quoteRefForPrompt = parsed.quoteData.quote_reference_name;
                    this.formPhase = 'resume';
                } else { this.initializeForm(); }
            });
            this.$watch('$store.quoteForm.quoteData', () => this.saveProgress(), { deep: true });
            this.$watch('$store.quoteForm.quoteData.is_multipoint', (newValue) => { if (newValue === 'No') { this.$store.quoteForm.quoteData.delivery_address_2 = ''; this.$store.quoteForm.quoteData.delivery_address_3 = ''; } else { if (['Harare', 'Bulawayo', 'Lusaka', 'Kitwe', 'Lilongwe', 'Blantyre', 'Other'].includes(this.$store.quoteForm.quoteData.delivery_address_1)) { this.$store.quoteForm.quoteData.delivery_address_1 = ''; } this.$store.quoteForm.quoteData.delivery_address_1_other = ''; }});
            this.$watch('$store.quoteForm.quoteData.cell_local_number', (newValue) => { if (!newValue) { this.$store.quoteForm.quoteData.notification_preference = 'Email Only'; }});
            
            const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
            if (googleMapsKey && !window.google) { const script = document.createElement('script'); script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places,core&callback=initMap`; script.async = true; script.defer = true; document.head.appendChild(script); }
        },

        initializeForm(fromSaved = false) {
            const initialState = getInitialQuoteData();
            if (fromSaved) {
                const savedState = JSON.parse(localStorage.getItem('maschemQuoteInProgress'));
                this.$store.quoteForm.quoteData = savedState.quoteData;
                this.formPhase = 'form'; this.step = 2; 
            } else {
                this.$store.quoteForm.quoteData = { ...this.$store.quoteForm.quoteData, ...initialState.quoteData };
                if (initialState.isSharedLink) {
                    this.originalSenderName = initialState.quoteData.name;
                    this.formPhase = 'collaboration';
                } else if (initialState.quoteData.quote_id) {
                    this.formPhase = 'naming';
                } else { this.formPhase = 'welcome'; }
            }
            this.$store.quoteForm.dataLoaded = true;
        },

        startForm() { this.formPhase = 'form'; this.step = 2; },
        resumeSession(shouldResume) { this.formPhase = 'loading'; this.$nextTick(() => { if (shouldResume) { this.initializeForm(true); } else { localStorage.removeItem('maschemQuoteInProgress'); this.initializeForm(false); } }); },
        saveProgress() { if (['form', 'collaboration', 'naming'].includes(this.formPhase)) { const stateToSave = { quoteData: this.$store.quoteForm.quoteData }; localStorage.setItem('maschemQuoteInProgress', JSON.stringify(stateToSave)); }},
        
        openEditNameModal() { this.tempReferenceName = this.$store.quoteForm.quoteData.quote_reference_name; this.showEditNameModal = true; },
        saveReferenceName() { this.$store.quoteForm.quoteData.quote_reference_name = this.tempReferenceName; this.showEditNameModal = false; },
        openCollaborationModal() { this.collaboratorEmail = ''; this.isSendingInvite = false; this.showCollaborationModal = true; },

        jumpToStep(stepNumber) { this.step = stepNumber; },
        jumpToFirstIncompleteStep() { this.formPhase = 'form'; let firstIncomplete = this.steps.find(s => this.isStepIncomplete(s.id)); if (firstIncomplete) { this.step = firstIncomplete.id; } else { this.step = this.totalSteps; }},
        
        isStepComplete(stepId) {
            const data = this.$store.quoteForm.quoteData;
            switch(stepId) {
                case 1: return !!data.is_hazardous && !!data.delivery_deadline_date;
                case 2: return !!data.is_multipoint;
                case 3: return !!data.company_name && !!data.product_description;
                case 4: return true;
                case 5: if (!data.collection_address) return false; if (data.is_multipoint === 'No') { return (!!data.delivery_address_1 && data.delivery_address_1 !== 'Other') || (data.delivery_address_1 === 'Other' && !!data.delivery_address_1_other); } else { return !!data.delivery_address_1; }
                case 6: return !!data.email && (!!data.cell_local_number || !!data.landline_local_number);
                default: return true;
            }
        },
        isStepIncomplete(stepId) { return !this.isStepComplete(stepId); },
        isQuoteComplete() { for(let i = 1; i < this.totalSteps; i++) { if (this.isStepIncomplete(i)) return false; } return true; },
        
        nextStep() { if (this.step < this.totalSteps) this.step++; },
        prevStep() { if (this.step > 1) this.step--; },
        
        _createFullPayload() { const data = this.$store.quoteForm.quoteData; return { timestamp: new Date().toISOString(), initial_name: data.name, initial_email: data.email, initial_country: data.initial_country, quote_id: data.quote_id, quote_reference_name: data.quote_reference_name, is_hazardous: data.is_hazardous, delivery_deadline_date: data.delivery_deadline_date, is_multipoint: data.is_multipoint, tonnage_kg: data.tonnage_kg, number_of_items: data.number_of_items, total_volume: data.total_volume, company_name: data.company_name, product_description: data.product_description, collection_address: data.collection_address, delivery_address_1: data.delivery_address_1, delivery_address_1_other: data.delivery_address_1_other, delivery_address_2: data.delivery_address_2, delivery_address_3: data.delivery_address_3, contact_email: data.email, secondary_email: data.secondary_email, full_landline: data.landline_local_number ? `${data.landline_country_code}${data.landline_local_number.replace(/\s/g, '')}` : '', full_cell: data.cell_local_number ? `${data.cell_country_code}${data.cell_local_number.replace(/\s/g, '')}` : '', notification_preference: data.notification_preference }; },
        async _sendWebhook(payload) { const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL; if (!webhookUrl) { console.error("Webhook URL is not configured."); alert("Endpoint is not configured."); return false; } try { const response = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) { console.error("Webhook call failed:", response.statusText); alert("There was an error saving your progress. Please try again."); return false; } return true; } catch (error) { console.error("Fetch error:", error); alert("A network error occurred. Please check your connection and try again."); return false; }},
        async saveForLater() { this.isSaving = true; const stateToShare = { quoteData: this.$store.quoteForm.quoteData }; const resumeUrl = `${window.location.origin}/quote-refinement.html?data=${btoa(JSON.stringify(stateToShare))}`; const payload = { action: 'save_for_later', resume_url: resumeUrl, ...this._createFullPayload() }; if (await this._sendWebhook(payload)) { this.showSaveSuccessModal = true; } this.isSaving = false; },
        async sendInviteAndSave() { this.isSendingInvite = true; const stateToShare = { quoteData: this.$store.quoteForm.quoteData }; const resumeUrl = `${window.location.origin}/quote-refinement.html?data=${btoa(JSON.stringify(stateToShare))}`; const payload = { action: 'send_collaboration_invite', resume_url: resumeUrl, requester_name: this.$store.quoteForm.quoteData.name || 'A colleague', collaborator_email: this.collaboratorEmail, ...this._createFullPayload() }; if (await this._sendWebhook(payload)) { this.showCollaborationModal = false; this.showSaveSuccessModal = true; } this.isSendingInvite = false; },
        async submitQuote() { this.isSaving = true; const finalPayload = { action: 'submit_completed_quote', completion_timestamp: new Date().toISOString(), ...this._createFullPayload() }; if (await this._sendWebhook(finalPayload)) { this.formPhase = 'success'; localStorage.removeItem('maschemQuoteInProgress'); } this.isSaving = false; },
        formatSummaryDate(isoDate) { if (!isoDate) return ''; const parts = isoDate.split('-'); if (parts.length !== 3) return ''; const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])); return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); }
    }));
});

Alpine.start();