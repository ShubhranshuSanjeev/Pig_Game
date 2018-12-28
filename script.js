document.querySelector('.next').addEventListener('click', moveLeft);

function moveLeft() {
  var elem = document.querySelector('.wrapper');   
  var pos = 0;
  var id = setInterval(frame, 7);
  function frame() {
    if (pos == 100) 
    {
      clearInterval(id);
      document.querySelector('.container_1').style.display = 'none'
    } 
    else 
    {
      pos++; 
      elem.style.left ='-' + pos + '%'; 
    }
  }
}