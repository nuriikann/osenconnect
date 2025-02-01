document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');

    // Seçilen dili kaydet
    languageSelect.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        localStorage.setItem('preferredLanguage', selectedLang);
        window.location.href = `index-${selectedLang}.html`;
    });

    // Önceden seçilen dili kontrol et
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && !window.location.href.includes(`dron-${savedLanguage}.html`)) {
        window.location.href = `dron-${savedLanguage}.html`;
    }
});
