// Inicialização do EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init('aKhzBfnlOkv5_pl6u'); // Substitua pela sua chave pública real
}

// Menu Mobile
function toggleMenu() {
  const nav = document.querySelector('nav');
  const links = document.getElementById('nav-links');
  nav.classList.toggle('nav-mobile-open');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('nav-links').style.display = 'none';
    document.querySelector('nav').classList.remove('nav-mobile-open');
  });
});

// Efeito de Scroll na Navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Animação de Revelação ao fazer Scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Envio do Formulário
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    formStatus.classList.remove('success', 'error');
    formStatus.textContent = 'A enviar...';
    formStatus.style.display = 'block';

    try {
      await emailjs.send('service_8bjs998', 'template_wl6bh2c', {
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        servico: data.servico,
        mensagem: data.mensagem,
        to_email: 'jonaldopedro21@gmail.com',
        reply_to: data.email
      });
      formStatus.classList.add('success');
      formStatus.textContent = '✓ Pedido enviado com sucesso! Entraremos em contacto em breve.';
      contactForm.reset();
      setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
    } catch (error) {
      console.error('Erro:', error);
      formStatus.classList.add('error');
      formStatus.textContent = '✗ Erro ao enviar. Por favor, use o WhatsApp.';
    }
  });
}