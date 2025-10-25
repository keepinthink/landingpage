document.addEventListener('DOMContentLoaded', () => {

    // --- FUNGSI DARK MODE TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-toggle-sun');
    const moonIcon = document.getElementById('theme-toggle-moon');
    const htmlEl = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            if(sunIcon) sunIcon.classList.add('hidden');
            if(moonIcon) moonIcon.classList.remove('hidden');
            localStorage.theme = 'dark';
        } else {
            htmlEl.classList.remove('dark');
            if(sunIcon) sunIcon.classList.remove('hidden');
            if(moonIcon) moonIcon.classList.add('hidden');
            localStorage.theme = 'light';
        }
    }
    const currentTheme = localStorage.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(currentTheme);
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = htmlEl.classList.contains('dark') ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // --- FUNGSI ANIMASI SAAT SCROLL (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-5');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target); 
            }
        });
    };
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));
    

    // --- FUNGSI ROLE ROTATING TEXT (NAVBAR) ---
    const roles = [
        "Junior Developer",
        "Frontend Developer",
        "Backend Developer",
        "Student"
    ];
    let roleIndex = 0;
    const roleElement = document.getElementById('rotating-role');

    if (roleElement) {
        setInterval(() => {
            roleElement.classList.add('fade-out'); 
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length; 
                roleElement.textContent = roles[roleIndex]; 
                roleElement.classList.remove('fade-out'); 
            }, 300); // Durasi fade out
        }, 3000); // Interval ganti role
    }

    // --- FUNGSI ANIME QUOTE GENERATOR (LOKAL) ---
    const quoteTextEl = document.getElementById('quote-text');
    const quoteSourceEl = document.getElementById('quote-source');
    const refreshQuoteBtn = document.getElementById('refresh-quote-btn');
    
    // Daftar quote lokal
    var local_anime_quotes = [];
    local_anime_quotes[0] = {
      "quotenumber": 1,
      "quotesentence": "People die when they are killed.",
      "quotecharacter": "- Emiya Shirou,",
      "quoteanime": " Fate/stay night"
    };
    local_anime_quotes[1] = {
      "quotenumber": 2,
      "quotesentence": "The fake is of far greater value. In its deliberate attempt to be real, it's more real than the real thing.",
      "quotecharacter": "- Kaiki Deishū,",
      "quoteanime": " Nisemonogatari"
    };
    local_anime_quotes[2] = {
      "quotenumber": 3,
      "quotesentence": "Mankind’s greatest fear is Mankind itself.",
      "quotecharacter": "- Gendo Ikari,",
      "quoteanime": " Neon Genesis Evangelion"
    };
    // Menambahkan beberapa quote lagi untuk variasi
    local_anime_quotes[3] = {
      "quotenumber": 4,
      "quotesentence": "If you don't take risks, you can't create a future!",
      "quotecharacter": "- Monkey D. Luffy,",
      "quoteanime": " One Piece"
    };
     local_anime_quotes[4] = {
      "quotenumber": 5,
      "quotesentence": "Whatever you lose, you'll find it again. But what you throw away you'll never get back.",
      "quotecharacter": "- Kenshin Himura,",
      "quoteanime": " Rurouni Kenshin"
    };

    // Fungsi untuk menampilkan quote acak
    function generateLocalQuote() {
        if (!quoteTextEl || !quoteSourceEl || local_anime_quotes.length === 0) return; // Pastikan elemen dan data ada

        const index = Math.floor(Math.random() * local_anime_quotes.length);
        const data = local_anime_quotes[index];

        // Update elemen HTML
        quoteTextEl.textContent = `"${data.quotesentence}"`;
        quoteSourceEl.textContent = `${data.quotecharacter} ${data.quoteanime}`;
    }

    // Panggil fungsi untuk memuat quote pertama kali
    generateLocalQuote();

    // Tambahkan event listener ke tombol refresh
    if (refreshQuoteBtn) {
        refreshQuoteBtn.addEventListener('click', generateLocalQuote);
    }

    // --- MUSIK LATAR DIHAPUS ---

});
