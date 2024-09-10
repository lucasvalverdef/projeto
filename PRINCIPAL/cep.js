function buscacep(){
    let cep = document.getElementById('txtcep').value;
    if(cep !== ""){
        let url= "https://brasilapi.com.br/api/cep/v1/" + cep;
        
        let req= new XMLHttpRequest();
        req.open("GET", url);
        req.send();

        //tratar a resposta da req

        req.onload = function (){
            if(req.status === 200){
                let endereco = JSON.parse(req.response);
                document.getElementById("txtrua").value = endereco.street;
                document.getElementById("txtbairro").value = endereco.neighborhood;
                document.getElementById("txtcidade").value = endereco.city;
                document.getElementById("txtestado").value = endereco.state;

            }
            else if(req.status === 404 ){
                alert(" O CEP está inválido.!");
            }
            else{
                alert("Erro ao fazer a requisição");
            }
        }
    }
}

window.onload = function(){
    let txtcep = document.getElementById("txtcep");
    txtcep.addEventListener("blur", buscacep);
}