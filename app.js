class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados(){

		for (let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null){

				return false
			}
		}

		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros(){

		//array de despesas

		let despesas = Array()

		//For o nosso loop de repetição, que esta afazer o controlo e incremento de cada id dos elementos que serão exibida na tela(viws)
		let id = localStorage.getItem('id')

		//Recuperar todas as despesas cadastradas em localStorage
		for (let i = 1; i <= id; i++) {
			
			//Recuperar a despesa 
			let despesa = JSON.parse(localStorage.getItem(i))

			//Existe a possibilidade de haver indices que foram pulados/removidos, neste caso nós vamos pular estes índices
			if (despesa === null)  {

				// O continue dentro de uma loop de repetição ele permite que pulamos de posição tanto para o campo null, id etc.
				continue
			}

			despesa.id = i

			despesas.push(despesa)
		}

		return despesas
	}

	pesquisar(despesa){

		//console.log('despesa')

		let despesasFiltradas = Array()

		 despesasFiltradas = this.recuperarTodosRegistros()

		 	 console.log(despesa)
		 	 console.log(despesasFiltradas)

		//ano 
		if (despesa.ano != "") {
				 console.log('Filtro de ano')

				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.ano == despesa.ano))
		}

		//mes
		if (despesa.mes != "") {
				console.log('Filtro do mes')
				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.mes == despesa.mes))
		}
		//dia
		if (despesa.dia != "") {
				console.log('Filtro do dia')
				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.dia == despesa.dia))
		}
		//tipo

		if (despesa.tipo != "") {
				console.log('Filtro do tipo')
				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.tipo == despesa.tipo))
		}
		//descrição
			if (despesa.descricao != "") {
				console.log('Filtro da descrição')
				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.descricao == despesa.descricao))
		}
		//Valor
			if (despesa.valor != "") {
				console.log('Filtro do valor')
				 despesasFiltradas = console.log(despesasFiltradas.filter(d => d.valor == despesa.valor))
		}

			return despesasFiltradas
		
	}
      remover(id){

      	localStorage.removeItem(id)
      }

}

	let bd = new Bd()

	function cadastrarDespesa(){

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value)

	if (despesa.validarDados()) {

	   bd.gravar(despesa)
        
        //dialog de sucesso
		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value =''
		valor.value =''



	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}

}



function carregaListaDespesas(despesas = Array(),filtro = false){

	//let despesas = Array()
	if (despesas.length == 0 && filtro == false) {

		despesas = bd.recuperarTodosRegistros()


	}

	//Seleção do elemento tbady da tabela  consulta
	let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

	/* <tr>
        <th>Data</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Valor</th>
        <th></th>
        </tr>

    */

    //Vamos percorrer o array despesas, listando cada despesa de forma dinámica

    despesas.forEach(function(d){

    //Criando a linha das tabelas (tr)

    	let linha = listaDespesas.insertRow()


    	// Criação de Colunas (td)
    	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes }/${d.ano}` //d.dia + '/' + d.mes + '/' + d.ano

    	//Ajustar o tipo
    	switch(d.tipo){
    		case '1': d.tipo = 'Alimentação'
    		break 

    		case '2': d.tipo = 'Educação'
    		break

    		case '3': d.tipo = 'Lazer'
    		break

    		case '4': d.tipo = 'Saúde'
    		break

    		case '5': d.tipo = 'transporte'
    		break
    	}

    	linha.insertCell(1).innerHTML = d.tipo

    	linha.insertCell(2).innerHTML =  d.descricao
    	linha.insertCell(3).innerHTML = d.valor

    	
    	//Criar O BOTÃO DE EXCLUSÃO

    	let btn = document.createElement("button")
    	btn.className = 'btn btn-danger'
    	btn.innerHTML = '<i class="fas fa-times"></i>'
    	btn.id = `id_despesa_${d.id}`
    	btn.onclick = function(){
    		
    		//Remover a despesa
    		
    		let id = this.id.replace('id_despesa_', "")

    		//alert(id)
    		
    		bd.remover(id)

    		window.location.reload()
    	}
    	
    	linha.insertCell(4).append(btn)

    	
    	} )
   	}

 	

 	function pesquisarDespesa(){

 		let ano = document.getElementById('ano').value
 		let mes = document.getElementById('mes').value
 		let dia = document.getElementById('dia').value
 		let tipo = document.getElementById('tipo').value
 		let descricao = document.getElementById('descricao').value
        let valor = document.getElementById('valor').value

        let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

        let despesas = bd.pesquisar(despesa)

       /* Seleção do elemento tbady da tabela  consulta
		let listaDespesas = document.getElementById('listaDespesas')
		listaDespesas.innerHTML = ''


	<tr>
        <th>Data</th>
        <th>Tipo</th>
        <th>Descrição</th>
        <th>Valor</th>
        <th></th>
        </tr>



    //Vamos percorrer o array despesas, listando cada despesa de forma dinámica

    despesas.forEach(function(d){

    //Criando a linha das tabelas (tr)

    	let linha = listaDespesas.insertRow()


    	// Criação de Colunas (td)
    	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes }/${d.ano}` //d.dia + '/' + d.mes + '/' + d.ano

    	//Ajustar o tipo
    	switch(d.tipo){
    		case '1': d.tipo = 'Alimentação'
    		break 

    		case '2': d.tipo = 'Educação'
    		break

    		case '3': d.tipo = 'Lazer'
    		break

    		case '4': d.tipo = 'Saúde'
    		break

    		case '5': d.tipo = 'transporte'
    		break
    	}

    	linha.insertCell(1).innerHTML = d.tipo
    	linha.insertCell(2).innerHTML =  d.descricao
    	linha.insertCell(3).innerHTML = d.valor
	       
    	
    	})
       */

       this.carregaListaDespesas(despesas, true)


    }
		