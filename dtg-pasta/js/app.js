document.addEventListener('DOMContentLoader', () => {
const btn_sala = document.getElementById('btn_sala');

// Monitora a mudança de estado do botão
btn_sala.bootstrapToggle();
// Quando tem mudança no botão executa a função 
btn_sala.onchange = () => {
console.log("oi");
btn_sala.checked ? alert('Check') : alert('Não Check') ;
}

})