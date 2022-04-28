let areas = {
    a: null,
    b: null,
    c: null
}


// Functions - Item
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})

function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Functions - Drop Area
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
})

function dragOver(e) {
    if (this.querySelector('.item') === null) {
        e.preventDefault(); // By default the drop is blocked, preventDefault is enabling it
        this.classList.add('hover');
    }
}

function dragLeave(e) {
    this.classList.remove('hover')
}

function drop(e) {
    this.classList.remove('hover')

    if (this.querySelector('.item') === null) {
        let item = document.querySelector('.dragging');
        this.appendChild(item);
        updateAreas();
    }
}

// Functions - Neutral Area
document.querySelector('.neutralArea').addEventListener('dragover',dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave',dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop',dropNeutral);

function dragOverNeutral(e) {
    e.preventDefault(); // By default the drop is blocked, preventDefault is enabling it
    this.classList.add('hover');
}

function dragLeaveNeutral(e) {
    this.classList.remove('hover');
}

function dropNeutral(e) {
    this.classList.remove('hover');
    let item = document.querySelector('.dragging');
    this.appendChild(item);
    updateAreas();
}

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null){
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }

        if (areas.a === '1' && areas.b === '2' && areas.c === '3'){
            document.querySelector('.areas').classList.add('correct');
            JSalert();
        } else if (areas.a !== null && areas.b !== null && areas.c !== null) {
            document.querySelector('.areas').classList.add('incorrect');
        }else {
            document.querySelector('.areas').classList.remove('correct');
            document.querySelector('.areas').classList.remove('incorrect');
        }
    });   
}

// Sweet Alert Function
function JSalert(){
    Swal.fire({
        title: 'Congratulations, you got it!',
        showCancelButton: true,
        confirmButtonText: "Start over",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
              // Reload the page
              document.location.reload(true),
          )
        }
      })
}