require('./style');

const dragArea = document.querySelector('.drag-area');
const dropAreas = document.querySelectorAll('.drop-area');

document.addEventListener('pointerdown', (e) => {
    if (e.target !== dragArea) {
        return;
    }
    const square = createSquare();
    document.body.appendChild(square);
    const {top, left} = dragArea.getBoundingClientRect();
    const shiftX = e.clientX - left;
    const shiftY = e.clientY - top;
    moveAt(square, e.pageX - shiftX, e.pageY - shiftY);

    const pointermove = (e) => {
        const [dropArea] = document.elementsFromPoint(e.clientX, e.clientY)
            .filter(elem => elem.classList.contains('drop-area'));
            
        dropAreas.forEach(elem => {
            if (dropArea === elem) {
                elem.classList.add('drop-area_focus');
            } else {
                elem.classList.remove('drop-area_focus');
            }
        });
        moveAt(square, e.pageX - shiftX, e.pageY - shiftY);
    };

    const pointerup = (e) => {
        document.removeEventListener('pointermove', pointermove);
        document.removeEventListener('pointerup', pointerup);

        dropAreas.forEach(elem => elem.classList.remove('drop-area_focus'));

        const [dropArea] = document.elementsFromPoint(e.clientX, e.clientY)
            .filter(elem => elem.classList.contains('drop-area'));
        if (!dropArea) {
            document.body.removeChild(square);
            return;
        }
        dropArea.appendChild(square);
        if (dropArea.classList.contains('drop-area_grid')) {
            square.style.position = 'static';
        }
        if (dropArea.classList.contains('drop-area_fluid')) {
            moveAt(square, e.pageX - shiftX - dropArea.offsetLeft, e.pageY - shiftY - dropArea.offsetTop);
        }
    };

    document.addEventListener('pointermove', pointermove);
    document.addEventListener('pointerup', pointerup);
});

function moveAt(elem, x, y) {
    elem.style.left = `${x}px`;
    elem.style.top = `${y}px`;
}

function createSquare() {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.position = 'absolute';
    square.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return square;
}
