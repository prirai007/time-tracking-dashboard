// Theme toggler
const toggle = document.querySelector('.toggle');

toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggle.classList.toggle('active');
});

// Switch active class
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.btn.active').classList.remove('active');
        e.target.classList.add('active');
    });
});

// Fetch data
fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        const main = document.querySelector('main');

        // Function to update DOM with data
        function renderData(timeframe) {
            main.textContent = ""; // Clear the existing content
            data.forEach(item => {
                main.innerHTML += `
                    <div class="card">
                        <a href="#" class="details">
                            <section class="details__title">
                                <h2>${item.title}</h2>
                                <i class="fa-solid fa-ellipsis"></i>
                            </section>
                            <section class="details__time">
                                <h3 data-num="${item.timeframes[timeframe].current}">${item.timeframes[timeframe].current}hrs</h3>
                                <p>${getPreviousLabel(timeframe)} - ${item.timeframes[timeframe].previous}hrs</p>
                            </section>
                        </a>
                    </div>`;
            });

            // Start counting animation
            startCountingAnimation();
        }

        // Function to get label for "previous" timeframe
        function getPreviousLabel(timeframe) {
            switch (timeframe) {
                case 'daily':
                    return 'Yesterday';
                case 'weekly':
                    return 'Last Week';
                case 'monthly':
                    return 'Last Month';
                default:
                    return 'Previous';
            }
        }

        // Counting animation
        function startCountingAnimation() {
            const numbers = document.querySelectorAll('h3');
            const interval = 1000;

            numbers.forEach(num => {
                let startValue = 0;
                let endValue = parseInt(num.getAttribute('data-num'));
                let duration = Math.floor(interval / endValue);
                let counter = setInterval(() => {
                    startValue++;
                    num.textContent = `${startValue}hrs`;
                    if (startValue === endValue) {
                        clearInterval(counter);
                    }
                }, duration);
            });
        }

        // Show weekly details by default on page load
        window.addEventListener('load', () => renderData('weekly'));

        // Add event listeners for the buttons
        const dailyBtn = document.querySelector('.daily-btn');
        const weeklyBtn = document.querySelector('.weekly-btn');
        const monthlyBtn = document.querySelector('.monthly-btn');

        dailyBtn.addEventListener('click', () => renderData('daily'));
        weeklyBtn.addEventListener('click', () => renderData('weekly'));
        monthlyBtn.addEventListener('click', () => renderData('monthly'));
    });
