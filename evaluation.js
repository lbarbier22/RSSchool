document.addEventListener('DOMContentLoaded', function () {
    const formulaire = document.querySelector('.formulaire');
    const divComment = document.getElementById('div_commentaire');
    formulaire.style.display = 'none';
    divComment.style.display = 'none';

    const submitButton = document.querySelector('.div_submit button');
    const modal = document.getElementById('custom-modal');
    const modalClose = document.getElementById('close-modal');
    let formState = 0;

    function openModal(message) {
        document.getElementById('modal-message').textContent = message;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function checkRequiredFields() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const age = document.getElementById('age');

        let isValid = true;
        let errorMessage = '';

        if (!name.value.trim()) {
            errorMessage += 'Veuillez entrer votre nom.\n';
            isValid = false;
        }

        if (!email.value.trim()) {
            errorMessage += 'Veuillez entrer votre email.\n';
            isValid = false;
        }

        if (!age.value.trim()) {
            errorMessage += 'Veuillez entrer votre âge.\n';
            isValid = false;
        }

        if (!isValid) {
            openModal(errorMessage);
        }

        return isValid;
    }

    function areAllQuestionsAnswered() {
        const questions = document.querySelectorAll('.question');
        let allAnswered = true;

        questions.forEach(function (question) {
            const radios = question.querySelectorAll('input[type="radio"]');
            const isAnswered = Array.from(radios).some(radio => radio.checked);
            if (!isAnswered) {
                allAnswered = false;
            }
        });

        return allAnswered;
    }

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (formState === 0) {
            if (checkRequiredFields()) {
                document.getElementById('name').style.display = 'none';
                document.getElementById('email').style.display = 'none';
                document.getElementById('age').style.display = 'none';

                document.getElementById('label-name').style.display = 'none';
                document.getElementById('label-email').style.display = 'none';
                document.getElementById('label-age').style.display = 'none';

                formulaire.style.display = 'block';
                divComment.style.display = 'block';

                formState = 1;
            }
        } else if (formState === 1) {
            if (!areAllQuestionsAnswered()) {
                openModal("Veuillez répondre à toutes les questions avant de soumettre.");
                return;
            }

            let totalQuestions = 0;
            let totalOui = 0;

            const radios = document.querySelectorAll('input[type="radio"]:checked');
            radios.forEach(function (radio) {
                totalQuestions++;
                if (radio.value === 'oui') {
                    totalOui++;
                }
            });

            const globalPercentage = totalQuestions > 0 ? (totalOui / totalQuestions) * 100 : 0;

            let grade;
            if (globalPercentage >= 81) {
                grade = 'A';
            } else if (globalPercentage >= 61) {
                grade = 'B';
            } else if (globalPercentage >= 41) {
                grade = 'C';
            } else if (globalPercentage >= 21) {
                grade = 'D';
            } else {
                grade = 'E';
            }

            const logoSrc = `logo_${grade}`;

            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                    <h1 style="color: #04AA6D;">Votre note est :</h1>
                    <h2 style="font-size: 2em; color : #EDE7B0;">${grade}</h2>
                    <img src="img/${logoSrc}.png" alt="Logo ${grade}" style="width: 200px; height: auto;"/>
                    <p style="color: #EDE7B0;">Merci d'avoir complété l'évaluation.</p>
                    <button onclick="window.location.reload();" style="padding: 10px 20px; font-size: 16px; background-color: #04AA6D; color: white; border: none; border-radius: 5px; cursor: pointer;">Réessayer</button>
                </div>
            `;

            formState = 2;
        }
    });

    modalClose.addEventListener('click', closeModal);
});
