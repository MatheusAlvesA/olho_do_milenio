import React, { Component } from 'react';

class App extends Component {

	state = {
		busca: '',
		dados: []
	}

	getCartas = async busca => {
		return [{
			titulo: 'Titulo',
			codigo: 'aaa',
			url_imagem_carta: 'imagem', 
			data_hora_inserido: 'hora',
			mais_recente: true,
			url_carta: 'url carta'
		}]
	}

	sincronizando = false;
	sincronizar = () => {
		if(this.sincronizando)
			return;
		this.sincronizando = true;
		return new Promise((res, rej) => {
			const { busca } = this.state;
			this.setState({dados: []}, async () => {
				const dados = await this.getCartas(busca);
				this.setState({dados}, () => {
					this.sincronizando = false;
					res();
				});
			})
		});
	}

	handleChange = busca => {
		this.setState({busca}, this.sincronizar)
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-8 offset-md-2">
						{(
							(this.state.busca.length > 0)
							? this.getResultsScreen()
							: this.getDefaultScreen()
						)}
					</div>
				</div>
			</div>
		);
	}

	getResultsScreen() {
		setTimeout(() => document.getElementById('busca').focus(), 1);
		return <div 
					className="d-flex flex-column justify-content-between align-items-center"
					style={{height: '100vh'}}
				>
				<div
					className="d-flex justify-content-center align-items-center w-100 mt-3 mb-5"
					style={{height: '10%'}}
				>
				<img
					src={require("./olho.png")}
					alt="logo"
					height="100%"
				/>
				<div
					className="w-100 h-100 ml-3"
				>
					<input
						style={{
							textAlign: 'center',
							padding: "10px",
							fontSize: "20px",
							borderRadius: '20px'
						}}
						id="busca"
						type="text"
						value={this.state.busca}
						onChange={e => this.handleChange(e.target.value)}
						className="form-control"
						placeholder="Buscar"
					/>
				</div>
		</div>
		<div
			className="d-flex flex-column justify-content-center align-items-center"
			style={{height: '90%', width: '100%'}}
		>
			{
				(this.state.dados.length > 0)
				? this.state.dados.map(this.getCard)
				: <img src={require('./loading.gif')} alt="Loading" />
			}
		</div>
		</div>;
	}

	getDefaultScreen() {
		setTimeout(() => document.getElementById('busca').focus(), 1);
		return (<div
					className="d-flex flex-column justify-content-center align-items-center"
					style={{height: '100vh'}}
				>
				<img
					src={require("./olho.png")}
					alt="logo"
					width="30%"
				/>
				<div
					className="form-group w-100 h-20 mt-3"
				>
					<input
						style={{
							textAlign: 'center',
							padding: "10px",
							fontSize: "20px",
							borderRadius: '20px'
						}}
						id="busca"
						type="text"
						value={this.state.busca}
						onChange={e => this.handleChange(e.target.value)}
						className="form-control"
						placeholder="Buscar"
					/>
					
				</div>
		</div>);
	}

	getCard(infos) {
		return <div key={infos.titulo+infos.codigo}>
			{
			infos.titulo
			+infos.codigo
			+infos.url_imagem_carta
			+infos.data_hora_inserido
			+infos.mais_recente
			+infos.url_carta
			}
		</div>;
	}
}

export default App;
