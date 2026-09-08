document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. EFECTO DEL CURSOR (ESCORPIONES)
    // ----------------------------------------------------
    let lastTime = 0;
    const scorpionSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
    <path d="M125,12.5C62.8,12.5,12.5,62.8,12.5,125s50.3,112.5,112.5,112.5S237.5,187.2,237.5,125S187.2,12.5,125,12.5zm0,200 C69.7,212.5,25,167.8,25,112.5S69.7,12.5,125,12.5s100,44.7,100,100S180.3,212.5,125,212.5z"></path>
    <path d="M125,37.5C80.3,37.5,43.8,74.1,43.8,118.8c0,44.7,36.5,81.3,81.2,81.3c44.7,0,81.3-36.5,81.3-81.3 C206.2,74.1,169.7,37.5,125,37.5z M125,168.8c-27.6,0-50-22.4-50-50c0-27.6,22.4-50,50-50c27.6,0,50,22.4,50,50 C175,146.4,152.6,168.8,125,168.8z"></path>
    <path d="M150,112.5c0-13.8-11.2-25-25-25s-25,11.2-25,25s11.2,25,25,25S150,126.3,150,112.5z"></path>
    <path d="M175,87.5c0-13.8-11.2-25-25-25s-25,11.2-25,25s11.2,25,25,25S175,101.3,175,87.5z"></path>
    <path d="M100,87.5c0-13.8-11.2-25-25-25s-25,11.2-25,25s11.2,25,25,25S100,101.3,100,87.5z"></path>
    </svg>`;

    document.addEventListener('mousemove', function(e) {
        // No mostrar escorpiones si el panel de admin está abierto
        if(document.getElementById('admin-dashboard').style.display === 'block') return;

        let currentTime = new Date().getTime();
        if (currentTime - lastTime > 60) {
            const scorpion = document.createElement('div');
            scorpion.classList.add('mini-scorpion');
            scorpion.innerHTML = scorpionSvgCode; 
            scorpion.style.left = (e.pageX - 20) + 'px';
            scorpion.style.top = (e.pageY - 20) + 'px';
            document.body.appendChild(scorpion);
            setTimeout(() => { scorpion.remove(); }, 1000);
            lastTime = currentTime;
        }
    });

    // ----------------------------------------------------
    // 2. RENDERIZAR SERVICIOS (Para que el Admin pueda modificarlos después)
    // ----------------------------------------------------
    const servicios = [
        { titulo: "Demolition & Flooring", desc: "Remoción de escombros e instalación de todo tipo de pisos." },
        { titulo: "Plumbing & Installation", desc: "Plomería general, instalación de lavabos, faucets y tuberías." },
        { titulo: "Paint & Finishes", desc: "Pintura interior/exterior y acabados de alta calidad." }
    ];

    const contenedorServicios = document.getElementById('contenedor-servicios');
    servicios.forEach(s => {
        contenedorServicios.innerHTML += `
            <div class="card">
                <h3>${s.titulo}</h3>
                <p>${s.desc}</p>
            </div>
        `;
    });

    // ----------------------------------------------------
    // 3. LÓGICA DEL LOGIN DE ADMINISTRADOR
    // ----------------------------------------------------
    const btnOpenLogin = document.getElementById('btn-open-login');
    const loginModal = document.getElementById('login-modal');
    const closeLogin = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const btnLogout = document.getElementById('btn-logout');

    // Abrir ventana de Login
    btnOpenLogin.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
    });

    // Cerrar ventana de Login
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Validar Usuario y Contraseña
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('admin-user').value;
        const pass = document.getElementById('admin-pass').value;

        if (user === 'Ricardo' && pass === 'Fernanda') {
            loginModal.style.display = 'none';
            adminDashboard.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Evita que el fondo haga scroll
            loginForm.reset();
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    });

    // Cerrar Sesión
    btnLogout.addEventListener('click', () => {
        adminDashboard.style.display = 'none';
        document.body.style.overflow = 'auto'; // Devuelve el scroll al fondo
    });
});

// ----------------------------------------------------
// 4. CAMBIAR PESTAÑAS DENTRO DEL PANEL DE CONTROL
// ----------------------------------------------------
window.openTab = function(tabName) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(s => s.style.display = 'none');
    
    // Quitar la clase 'active' de los botones
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));

    // Mostrar la sección seleccionada y activar botón
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}