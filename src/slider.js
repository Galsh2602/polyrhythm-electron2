class VerticalSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');

        this.slider = document.createElement('input');
        this.slider.setAttribute('type', 'range');
        this.slider.setAttribute('min', this.getAttribute('min') || '0');
        this.slider.setAttribute('max', this.getAttribute('max') || '100');
        this.slider.setAttribute('step', this.getAttribute('step') || '1');
        this.slider.setAttribute('value', this.getAttribute('value') || '50');
        this.slider.setAttribute('orient', 'vertical');

        wrapper.appendChild(this.slider);
        this.shadowRoot.append(wrapper);

        // Add styles to the shadow root
        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                width: 16px;
                height: 100%;
                position: relative;
            }

            input[type="range"] {
                -webkit-appearance: none; /* Disable the default appearance */
                appearance: none;
                width: 16px;              /* Width of the vertical slider */
                height: 100%;             /* Full height */
                background: linear-gradient(to bottom, var(--progress-color, #8b6b6b) var(--progress-percent, 50%), var(--track-color, #e0e0e0) var(--progress-percent, 50%));
                border-radius: 5px;       /* Rounded corners */
                outline: none;            /* No outline */
                cursor: pointer;          /* Cursor changes to pointer on hover */
            }

            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none; /* Remove default thumb appearance */
                width: 25px;              /* Thumb width */
                height: 25px;             /* Thumb height */
                background: #009688;      /* Thumb background color */
                border-radius: 50%;       /* Circular thumb */
                border: 2px solid #666;   /* Border around the thumb */
                cursor: pointer;          /* Cursor changes to pointer */
            }

            input[type="range"]::-webkit-slider-runnable-track {
                width: 16px;
                background: #e0e0e0;      /* Track background color */
                border-radius: 5px;       /* Rounded track corners */
            }
        `;
        this.shadowRoot.append(style);

        // Add event listener for input changes
        this.slider.addEventListener('input', (event) => this.handleInput(event));

        // Initialize progress bar
        this.updateProgress();
    }

    handleInput(event) {
        console.log('Slider Input Event Triggered'); // Debugging Log
        console.log('Slider Value:', event.target.value); // Log Slider Value

        this.value = event.target.value;
        this.updateProgress();
        this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    }

    updateProgress() {
        const percent = ((this.slider.value - this.slider.min) / (this.slider.max - this.slider.min)) * 100;
        this.slider.style.setProperty('--progress-percent', `${percent}%`);
    }
}

customElements.define('vertical-slider', VerticalSlider);
