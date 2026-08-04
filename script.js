document.addEventListener("DOMContentLoaded", () => {
  const testimonios = [
    { cita: "Me gustó muchísimo. Realmente, da para leerlo todo de un tirón.", autor: "Diario X" },
    { cita: "Impactante novela policial con giros que no verás llegar.", autor: "Editor"},
    { cita: "Un éxito internacional merecido.", autor: "Crítico Y" },
    { cita: "La mejor obra que he leído este año.", autor: "Lector Z" }
];

const track = document.getElementById('testimonial-track');
if (track) {
    // Duplicamos el array para que el scroll infinito no se note al terminar
    const items = [...testimonios, ...testimonios]; 
    
    items.forEach(t => {
        track.innerHTML += `
            <div class="testimonial-card">
                <p>"${t.cita}"</p>
                <span>— ${t.autor}</span>
            </div>
        `;
    });
}

    const btnFisico = document.querySelector('a[href="#fisico"]');
    const btnDigital = document.querySelector('a[href="#digital"]');
    const btnLibrerias = document.querySelector('a[href="#librerias"]');

document.querySelector('a[href="#fisico"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-fisico').showModal();
    });

    document.querySelector('a[href="#digital"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-digital').showModal();
    });

    document.querySelector('a[href="#librerias"]').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-librerias').showModal();
    });
});


const cover = document.querySelector('.cover-art');

cover.addEventListener('click', function() {
    // Agregamos la clase de rotación
    this.classList.toggle('flipped');
    
    // Cambiamos la imagen justo cuando está "de canto" (a los 0.3s)
    setTimeout(() => {
        if (this.src.includes('fractured.png')) {
            this.src = 'contra.jpg';
        } else {
            this.src = 'fractured.png';
        }
    }, 300); // 300ms es la mitad de la transición de 0.6s
});



function cambiarCapitulo(numCap) {
    // Ocultar todos los contenidos de capítulos
    const paneles = document.querySelectorAll('.chapter-pane');
    paneles.forEach(panel => panel.classList.remove('active'));

    // Quitar la clase activa de todas las pestañas
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar el capítulo seleccionado y activar su pestaña
    document.getElementById(`cap-${numCap}`).classList.add('active');
    event.currentTarget.classList.add('active');
}


// Función genérica para manejar cualquier formulario con Web3Forms
function configurarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return; // Si el formulario no existe en la página, se detiene

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "2c34e170-968c-4687-8be2-903683960213");

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Enviando...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Éxito! Tu pedido ha sido enviado correctamente.");
                form.reset();
                
                // Cierra automáticamente el modal al que pertenece este formulario
                const modal = form.closest('dialog');
                if (modal) modal.close();
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Algo salió mal. Por favor, inténtalo de nuevo.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Inicializamos ambos formularios de manera independiente
configurarFormulario('form-fisico');
configurarFormulario('form-digital');