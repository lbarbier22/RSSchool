document.addEventListener('DOMContentLoaded', function () {
    const formulaire = document.querySelector('.formulaire');
    const commentField = document.getElementById('comment');
    formulaire.style.display = 'none';
    commentField.style.display = 'none';

    const submitButton = document.querySelector('.div_submit button');
    let formState = 0;

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        if (formState === 0) {
            document.getElementById('name').style.display = 'none';
            document.getElementById('email').style.display = 'none';
            document.getElementById('age').style.display = 'none';

            document.getElementById('label-name').style.display = 'none';
            document.getElementById('label-email').style.display = 'none';
            document.getElementById('label-age').style.display = 'none';

            formulaire.style.display = 'block';
            commentField.style.display = 'block';

            formState = 1;

        } else if (formState === 1) {
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

            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                    <h1 style="color: #04AA6D;">Votre note est :</h1>
                    <h2 style="font-size: 2em;">${grade}</h2>
                    <p>Merci d'avoir complété l'évaluation.</p>
                    <button onclick="window.location.reload();" style="padding: 10px 20px; font-size: 16px; background-color: #04AA6D; color: white; border: none; border-radius: 5px; cursor: pointer;">Réessayer</button>
                </div>
            `;

            formState = 2;
        }
    });
});
