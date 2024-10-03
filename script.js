document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi réel du formulaire

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !phone || !email || !subject || !message) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    alert(`Merci ${name}, votre message a été envoyé avec succès !`);

    document.getElementById('contactForm').reset();
});
